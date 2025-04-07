import React, { useEffect, useState, useRef } from "react";
import MainCard from "../../ui-component/cards/MainCard";
import {
  MenuItem,
  Button,
  Grid,
  TextField,
  Select,
  Box,
  Autocomplete,
  Paper,
  Typography,
  Stack,
  InputAdornment,
  FormControl,
  InputLabel,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Avatar,
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse,
} from "@mui/material";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM, TileWMS } from "ol/source";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import Overlay from "ol/Overlay";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import AutoHideAlert from "../../ui-component/AutoHideAlert";
import { 
  useTagOwnerListMutation, 
  useGetRouteFixingMutation, 
  useAddRouteMutation, 
  useDeleteRouteMutation,
  useGetRouteMutation
} from "../../store/services/locationservices";
import { 
  DirectionsCar, 
  Search, 
  Add, 
  Delete, 
  Route, 
  Map as MapIcon,
  Clear,
  MyLocation,
  Menu as MenuIcon,
  Close,
  Visibility,
  VisibilityOff,
  ExpandLess,
  ExpandMore
} from "@mui/icons-material";

const RouteFixing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [routeContent, setRouteContent] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [deviceList, setDeviceList] = useState([]);
  const [deviceId, setDeviceId] = useState("");
  const [routeData, setRouteData] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [newPoints, setNewPoints] = useState([]); // Store coordinates of points
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());
  const map = useRef(null);
  const overlayRef = useRef(null);
  const selectedId = useRef("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success"
  });
  const [activeTab, setActiveTab] = useState(0);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [showControls, setShowControls] = useState(true);

  // Replace service calls with RTK Query hooks
  const [tagOwnerList] = useTagOwnerListMutation();
  const [getRouteFixing] = useGetRouteFixingMutation();
  const [addRouteMutation] = useAddRouteMutation();
  const [deleteRouteMutation] = useDeleteRouteMutation();
  const [getRouteMutation] = useGetRouteMutation();

  useEffect(() => {
    const fetchDeviceList = async () => {
      // Check if user is authenticated
      const token = sessionStorage.getItem('oAuthToken');
      if (!token) {
        setAlert({
          open: true,
          message: "You are not logged in. Please log in to access this feature.",
          type: "error"
        });
        return;
      }

      try {
        const response = await tagOwnerList();
        if (response && response.data) {
          setDeviceList(response.data);
        } else {
          console.error("Invalid response format from tagOwnerList API");
          setDeviceList([]);
        }
      } catch (error) {
        console.error("Error fetching device list:", error);
        setDeviceList([]);
        
        // Handle specific error cases
        if (error.status === 403) {
          setAlert({
            open: true,
            message: "You don't have permission to access this feature. Please contact your administrator.",
            type: "error"
          });
        } else if (error.status === 401) {
          setAlert({
            open: true,
            message: "Your session has expired. Please log in again.",
            type: "error"
          });
        } else {
          setAlert({
            open: true,
            message: "Failed to load vehicle list. Please try again later.",
            type: "error"
          });
        }
      }
    };
    fetchDeviceList();
  }, [tagOwnerList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await retriveRouteData(deviceId);
    } finally {
      setIsLoading(false);
    }
  };

  const retriveRouteData = async (id) => {
    try {
      const response = await getRouteFixing({device_id: id});
      setRouteContent(response.data);
      setRouteData(response.data.route || []);
      setLoad(true);
    } catch (error) {
      console.error("Error retrieving route data:", error);
    }
  };

  const handleDeviceChange = (e) => {
    setDeviceId(e.target.value);
    setSelectedRoute(null); // Clear selected route on device change
  };

  const handleRouteSelect = (event) => {
    try {
      const [routeId, routeRout] = event.target.value.split("|");
      
      const coordinates = routeRout
        .split("],")
        .map(coord => {
          try {
            return coord
              .replace(/[\[\]']/g, '')
              .split(',')
              .map(num => {
                const parsed = parseFloat(num.trim());
                if (isNaN(parsed)) throw new Error('Invalid coordinate value');
                return parsed;
              });
          } catch (e) {
            console.error('Error parsing coordinate:', coord);
            return null;
          }
        })
        .filter(coord => coord && coord.length >= 2)
        .map(coord => [coord[0], coord[1]]);

      if (coordinates.length < 2) {
        throw new Error('Not enough valid coordinates to create a route');
      }

      setSelectedRoute({ 
        routeId, 
        coordinates, // Store the parsed coordinates
        routeRout 
      });
      loadRoute(coordinates, routeId);
    } catch (error) {
      console.error('Error selecting route:', error);
      alert('There was an error selecting the route. Please try again.');
    }
  };

  // Initialize map on first render
  useEffect(() => {
    if (!map.current) {
      const initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new TileLayer({
            source: new TileWMS({
              url: process.env.REACT_APP_BHUVAN_URL,
              params: {
                'LAYERS': 'basemap%3Aadmin_group',
                'TILED': true,
                'VERSION': '1.1.1',
                'FORMAT': 'image/png',
                'TRANSPARENT': 'true',
                'SRS': 'EPSG:4326',
                'WIDTH': 256,   // Set the tile width to 256 pixels
                'HEIGHT': 256,   // Set the tile height to 256 pixels
                'pixelRatio': 1,

              },
              serverType: 'geoserver',
              projection: 'EPSG:4326', // Ensure the projection is set:' 



            })
          }),
        ],


        view: new View({
          center: fromLonLat([91.829437, 26.131644]), // Initial center of the map
          zoom: 7,
        }),

        pixelRatio: 1,
      });


      const vectorLayer = new VectorLayer({
        source: vectorSourceRef.current,
      });

      initialMap.addLayer(vectorLayer);
      map.current = initialMap;

      // Initialize overlay for popup
      const overlay = new Overlay({
        element: overlayRef.current,
        positioning: "bottom-center",
        stopEvent: false,
        offset: [0, -15],
      });
      initialMap.addOverlay(overlay);
    }
    // Add click event for adding new route points only if vehicle is selected else not allow to select point
    if (deviceId != "") {
      map.current.on("click", (e) => {
        const coord = e.coordinate;
        addPoint(coord);
      });
    }
  }, [deviceId]);

  // Function to load route on the map
  const loadRoute = (route, routeId) => {
    try {
      if (!route || route.length < 2) {
        console.warn('Invalid route data: Need at least 2 points to display a route');
        return;
      }

      selectedId.current = routeId;
      vectorSourceRef.current.clear();

      // Create point features only for start and end points
      const startPoint = new Feature({
        geometry: new Point(fromLonLat(route[0])),
      });
      const endPoint = new Feature({
        geometry: new Point(fromLonLat(route[route.length - 1])),
      });

      // Set style for start and end points
      [startPoint, endPoint].forEach(point => {
        point.setStyle(
          new Style({
            image: new Icon({
              src: `${process.env.REACT_APP_API_URL}/static/track.png`,
              scale: 0.051,
              anchor: [0.5, 1],
              anchorXUnits: "fraction",
              anchorYUnits: "fraction",
            }),
          })
        );
      });

      vectorSourceRef.current.addFeatures([startPoint, endPoint]);

      // Create and add the route line
      const coordinates = route.map(coords => fromLonLat(coords));
      
      if (coordinates.some(coord => !coord || coord.length < 2)) {
        throw new Error('Invalid coordinates in route');
      }

      const line = new Feature({
        geometry: new LineString(coordinates),
      });
      
      line.setStyle(new Style({
        stroke: new Stroke({
          color: '#0066ff',
          width: 3
        })
      }));
      
      vectorSourceRef.current.addFeature(line);

      // Get the extent and verify it's valid before fitting
      const extent = line.getGeometry().getExtent();
      if (extent && extent.every(coord => typeof coord === 'number' && !isNaN(coord))) {
        map.current.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          duration: 1000,
          maxZoom: 18
        });
      } else {
        console.warn('Invalid extent calculated for route');
      }
    } catch (error) {
      console.error('Error loading route:', error);
      alert('There was an error loading the route. Please try again.');
    }
  };

  // Add a point on the map and update state
  const addPoint = (coord) => {
    const pointCoordinates = toLonLat(coord); // Convert to lon/lat before storing
    setNewPoints((prevPoints) => {
      const updatedPoints = [...prevPoints, pointCoordinates];
      updateRouteLine(updatedPoints); // Update the map with the new points
      return updatedPoints;
    });
  };

  // Update route line based on new points
  const updateRouteLine = (points) => {
    vectorSourceRef.current.clear();

    // Create features from the stored coordinates
    const pointFeatures = points.map((coords) => {
      const pointFeature = new Feature({
        geometry: new Point(fromLonLat(coords)), // Convert back to map projection
      });

      pointFeature.setStyle(
        new Style({
          image: new Icon({
            src: `${process.env.REACT_APP_API_URL}/static/track.png` , 
            scale: 0.051,
            anchor: [0.5, 1], 
            anchorXUnits: "fraction", 
            anchorYUnits: "fraction",
          }),
        })
      );
      return pointFeature;
    });

    // Add the new point features to the map
    vectorSourceRef.current.addFeatures(pointFeatures);

    // Create and add the route line if we have more than one point
    if (points.length > 1) {
      const lineCoordinates = points.map((coords) => fromLonLat(coords));
      const lineFeature = new Feature({
        geometry: new LineString(lineCoordinates),
      });
      vectorSourceRef.current.addFeature(lineFeature);
    }
  };

  const addRoute = async () => {
    if (newPoints.length < 2) {
      setAlert({
        open: true,
        message: "Please add at least two points to create a route.",
        type: "error"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // First, get the route data
      const routeData = await getRouteMutation({ 
        points: newPoints,
        device_id: deviceId
      }).unwrap();
      
      // Log the response to debug
      console.log("Route Data Response:", routeData);

      // Check if routeData exists
      if (!routeData) {
        throw new Error('No route data received from server');
      }

      // Check if paths exists directly on routeData
      if (!routeData.paths?.[0]) {
        throw new Error('No valid path found in route data');
      }

      const firstPath = routeData.paths[0];
      if (!Array.isArray(firstPath?.points?.coordinates)) {
        throw new Error('Invalid coordinates format in route data');
      }

      const coordinates = firstPath.points.coordinates;
      
      // Add route with the validated data
      const response = await addRouteMutation({
        device_id: deviceId,
        route: coordinates,
        routepoints: newPoints,
        hash: routeData.hash || ''
      }).unwrap();
      
      // Update UI only after successful addition
      setRouteData(response.route);
      setNewPoints([]); 
      vectorSourceRef.current.clear();
      setAlert({
        open: true,
        message: "Route added successfully!",
        type: "success"
      });
    } catch (error) {
      console.error("Error adding new route:", error);
      setAlert({
        open: true,
        message: error.message || "Failed to add route. Please try again.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutocompleteChange = (event, newValue) => {
    // If a valid option is selected, pass the device ID to the change handler
    if (newValue) {
      handleDeviceChange({ target: { value: newValue.device.id } });
    }
  };

  const delRoute = async () => {
    if (!selectedRoute) {
      setAlert({
        open: true,
        message: "Please select a route to delete.",
        type: "error"
      });
      return;
    }

    setIsDeleting(true);
    const data = {
      id: selectedRoute.routeId,
      device_id: deviceId,
    };
    
    try {
      await deleteRouteMutation(data);
      setRouteData(
        routeData.filter((route) => route.id != selectedRoute.routeId)
      );
      setSelectedRoute(null);
      vectorSourceRef.current.clear();
      setAlert({
        open: true,
        message: "Route deleted successfully!",
        type: "success"
      });
    } catch (error) {
      console.error("Error deleting route:", error);
      setAlert({
        open: true,
        message: "Failed to delete route. Please try again.",
        type: "error"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleMapVisibility = () => {
    setShowMap(!showMap);
  };

  const toggleControlsVisibility = () => {
    setShowControls(!showControls);
  };

  // Mobile drawer content
  const mobileDrawerContent = (
    <Box sx={{ width: isMobile ? '100%' : 320, p: 2, height: '100%', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Route Controls</Typography>
        <IconButton onClick={toggleMobileDrawer}>
          <Close />
        </IconButton>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <List>
        <ListItemButton onClick={toggleMapVisibility}>
          <ListItemIcon>
            {showMap ? <Visibility /> : <VisibilityOff />}
          </ListItemIcon>
          <ListItemText primary="Toggle Map" secondary={showMap ? "Map is visible" : "Map is hidden"} />
        </ListItemButton>
        
        <ListItemButton onClick={toggleControlsVisibility}>
          <ListItemIcon>
            {showControls ? <Visibility /> : <VisibilityOff />}
          </ListItemIcon>
          <ListItemText primary="Toggle Controls" secondary={showControls ? "Controls are visible" : "Controls are hidden"} />
        </ListItemButton>
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Vehicle Selection
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Autocomplete
          value={deviceList && deviceList.length > 0 ? deviceList.find((item) => item.device && item.device.id === deviceId) || null : null}
          onChange={handleAutocompleteChange}
          options={inputValue && deviceList && deviceList.length > 0 ? deviceList : []}
          getOptionLabel={(option) => option.vehicle_reg_no || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Vehicle Registration Number"
              variant="outlined"
              fullWidth
              onChange={(e) => setInputValue(e.target.value)}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <DirectionsCar color="primary" />
                  </InputAdornment>
                )
              }}
            />
          )}
          noOptionsText="Enter Vehicle Registration Number"
          isOptionEqualToValue={(option, value) => option.device.id === value.device.id}
          disableClearable
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Search />}
          disabled={isLoading}
          sx={{ height: '56px' }}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </Box>
  );

  return (
    <MainCard>
      <AutoHideAlert 
        open={alert.open}
        onClose={() => setAlert({...alert, open: false})}
        message={alert.message}
        type={alert.type}
      />
      
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: 1
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          mb: isMobile ? 1 : 0
        }}>
          <Avatar 
            sx={{ 
              bgcolor: theme.palette.primary.main,
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 }
            }}
          >
            <MapIcon fontSize={isMobile ? "medium" : "large"} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, 
              fontWeight: 600,
              color: 'text.primary',
              lineHeight: 1.2
            }}>
              Route Management
            </Typography>
            <Typography variant="body2" sx={{ 
              color: 'text.secondary',
              mt: 0.5,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}>
              Select a vehicle and manage its routes
            </Typography>
          </Box>
        </Box>
        
        {isMobile && (
          <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<MenuIcon />}
              onClick={toggleMobileDrawer}
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '0.75rem'
              }}
            >
              Controls
            </Button>
          </Box>
        )}
      </Box>

      {/* Main content container - consistent structure for both mobile and desktop */}
      <Box sx={{ width: '100%' }}>
        {/* Mobile layout - registration box at top */}
        {isMobile && (
          <Box sx={{ mb: 3 }}>
            <Card elevation={0} sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={isTablet ? 12 : 8}>
                      <Autocomplete
                        value={deviceList && deviceList.length > 0 ? deviceList.find((item) => item.device && item.device.id === deviceId) || null : null}
                        onChange={handleAutocompleteChange}
                        options={inputValue && deviceList && deviceList.length > 0 ? deviceList : []}
                        getOptionLabel={(option) => option.vehicle_reg_no || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Vehicle Registration Number"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setInputValue(e.target.value)}
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <DirectionsCar color="primary" />
                                </InputAdornment>
                              )
                            }}
                          />
                        )}
                        noOptionsText="Enter Vehicle Registration Number"
                        isOptionEqualToValue={(option, value) => option.device.id === value.device.id}
                        disableClearable
                      />
                    </Grid>
                    <Grid item xs={12} md={isTablet ? 12 : 4}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Search />}
                        disabled={isLoading}
                        sx={{ height: '56px' }}
                      >
                        {isLoading ? 'Searching...' : 'Search'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>

            {load && (
              <Card elevation={0} sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Select Route</InputLabel>
                        <Select
                          value={selectedRoute ? `${selectedRoute.routeId}|${selectedRoute.routeRout}` : ""}
                          onChange={handleRouteSelect}
                          label="Select Route"
                          sx={{ mb: 2 }}
                        >
                          <MenuItem value="" disabled>
                            Select a route
                          </MenuItem>
                          {routeData.map((route) => (
                            <MenuItem value={`${route.id}|${route.route}`} key={route.id}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Route color="primary" />
                                <Typography>Route #{route.id}</Typography>
                              </Stack>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack 
                        direction={{ xs: 'column', sm: 'row' }} 
                        spacing={2}
                        divider={isMobile ? <Divider flexItem /> : null}
                      >
                        <Button 
                          onClick={addRoute} 
                          variant="contained" 
                          color="primary"
                          startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Add />}
                          disabled={isSubmitting}
                          sx={{ flex: 1, py: 1.5 }}
                        >
                          {isSubmitting ? 'Adding Route...' : 'Add New Route'}
                        </Button>
                        <Button
                          onClick={delRoute}
                          variant="outlined"
                          color="error"
                          startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : <Delete />}
                          disabled={!selectedRoute || isDeleting}
                          sx={{ flex: 1, py: 1.5 }}
                        >
                          {isDeleting ? 'Deleting...' : 'Delete Route'}
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Box>
        )}

        <Grid container spacing={3}>
          {/* Controls section - visible in desktop */}
          {!isMobile && showControls && (
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ p: 3 }}>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                          <Autocomplete
                            value={deviceList && deviceList.length > 0 ? deviceList.find((item) => item.device && item.device.id === deviceId) || null : null}
                            onChange={handleAutocompleteChange}
                            options={inputValue && deviceList && deviceList.length > 0 ? deviceList : []}
                            getOptionLabel={(option) => option.vehicle_reg_no || ""}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Vehicle Registration Number"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setInputValue(e.target.value)}
                                InputProps={{
                                  ...params.InputProps,
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <DirectionsCar color="primary" />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            )}
                            noOptionsText="Enter Vehicle Registration Number"
                            isOptionEqualToValue={(option, value) => option.device.id === value.device.id}
                            disableClearable
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Search />}
                            disabled={isLoading}
                            sx={{ height: '56px' }}
                          >
                            {isLoading ? 'Searching...' : 'Search'}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>

                {load && (
                  <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel>Select Route</InputLabel>
                            <Select
                              value={selectedRoute ? `${selectedRoute.routeId}|${selectedRoute.routeRout}` : ""}
                              onChange={handleRouteSelect}
                              label="Select Route"
                              sx={{ mb: 2 }}
                            >
                              <MenuItem value="" disabled>
                                Select a route
                              </MenuItem>
                              {routeData.map((route) => (
                                <MenuItem value={`${route.id}|${route.route}`} key={route.id}>
                                  <Stack direction="row" alignItems="center" spacing={1}>
                                    <Route color="primary" />
                                    <Typography>Route #{route.id}</Typography>
                                  </Stack>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack 
                            direction="row" 
                            spacing={2}
                          >
                            <Button 
                              onClick={addRoute} 
                              variant="contained" 
                              color="primary"
                              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Add />}
                              disabled={isSubmitting}
                              sx={{ flex: 1, py: 1.5 }}
                            >
                              {isSubmitting ? 'Adding Route...' : 'Add New Route'}
                            </Button>
                            <Button
                              onClick={delRoute}
                              variant="outlined"
                              color="error"
                              startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : <Delete />}
                              disabled={!selectedRoute || isDeleting}
                              sx={{ flex: 1, py: 1.5 }}
                            >
                              {isDeleting ? 'Deleting...' : 'Delete Route'}
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </Grid>
          )}

          {/* Map section - always visible */}
          <Grid item xs={12} md={!isMobile && showControls ? 8 : 12}>
            <Card elevation={0} sx={{ 
              borderRadius: 2, 
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid', 
              borderColor: 'divider',
              height: isMobile ? { xs: '400px', sm: '500px', md: '600px' } : 'calc(100vh - 250px)',
              minHeight: isMobile ? '400px' : '600px'
            }}>
              <Box sx={{ 
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 1000,
                display: 'flex',
                gap: 1
              }}>
                <Tooltip title="Clear Map">
                  <IconButton 
                    onClick={() => {
                      vectorSourceRef.current.clear();
                      setNewPoints([]);
                    }}
                    sx={{ 
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': { bgcolor: 'background.paper' }
                    }}
                  >
                    <Clear />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Center Map">
                  <IconButton 
                    onClick={() => {
                      if (map.current) {
                        map.current.getView().animate({
                          center: fromLonLat([91.829437, 26.131644]),
                          zoom: 7,
                          duration: 1000
                        });
                      }
                    }}
                    sx={{ 
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': { bgcolor: 'background.paper' }
                    }}
                  >
                    <MyLocation />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box ref={mapRef} sx={{ 
                width: "100%", 
                height: "100%",
                position: 'relative' 
              }} />
            </Card>
          </Grid>
        </Grid>
      </Box>

      <div
        ref={overlayRef}
        className="popup-container"
        style={{ display: "none", position: "absolute", zIndex: 1000 }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <Box sx={{ p: 1 }}>
            <Button 
              id="delete" 
              size="small" 
              color="error" 
              fullWidth
              sx={{ justifyContent: 'flex-start', mb: 0.5 }}
            >
              <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
            </Button>
            <Button 
              id="cancel" 
              size="small" 
              fullWidth
              sx={{ justifyContent: 'flex-start' }}
            >
              <Clear fontSize="small" sx={{ mr: 1 }} /> Cancel
            </Button>
          </Box>
        </Paper>
      </div>

      {/* Mobile drawer for controls */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 320,
            maxWidth: '100%'
          }
        }}
      >
        {mobileDrawerContent}
      </Drawer>
    </MainCard>
  );
};

export default RouteFixing;