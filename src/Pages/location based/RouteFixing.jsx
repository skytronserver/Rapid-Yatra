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
import { DirectionsCar, Search, Add, Delete, Route } from "@mui/icons-material";

const RouteFixing = () => {
  const [load, setLoad] = useState(false);
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

  // Replace service calls with RTK Query hooks
  const [tagOwnerList] = useTagOwnerListMutation();
  const [getRouteFixing] = useGetRouteFixingMutation();
  const [addRouteMutation] = useAddRouteMutation();
  const [deleteRouteMutation] = useDeleteRouteMutation();
  const [getRouteMutation] = useGetRouteMutation();

  useEffect(() => {
    const fetchDeviceList = async () => {
      try {
        const response = await tagOwnerList();
        setDeviceList(response.data);
      } catch (error) {
        console.error("Error fetching device list:", error);
      }
    };
    fetchDeviceList();
  }, [tagOwnerList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    retriveRouteData(deviceId);
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

    try {
      // First, get the route datawww
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
        hash: routeData.hash || '' // Ensure hash is always defined
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
    }
  };
  return (
    <MainCard>
      <AutoHideAlert 
        open={alert.open}
        onClose={() => setAlert({...alert, open: false})}
        message={alert.message}
        type={alert.type}
      />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ 
          fontSize: '1.75rem', 
          fontWeight: 600,
          color: 'primary.main' 
        }}>
          Route Management
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Select a vehicle and manage its routes
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
              <Autocomplete
                value={deviceList.find((item) => item.device.id === deviceId) || null}
                onChange={handleAutocompleteChange}
                options={inputValue ? deviceList : []}
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
                          <DirectionsCar />
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
            <Grid item md={2} sm={12} xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<Search />}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {load && (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Route</InputLabel>
                <Select
                  value={selectedRoute ? `${selectedRoute.routeId}|${selectedRoute.routeRout}` : ""}
                  onChange={handleRouteSelect}
                  label="Select Route"
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
              <Stack direction="row" spacing={2}>
                <Button 
                  onClick={addRoute} 
                  variant="contained" 
                  color="primary"
                  startIcon={<Add />}
                  sx={{ flex: 1 }}
                >
                  Add New Route
                </Button>
                <Button
                  onClick={delRoute}
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  sx={{ flex: 1 }}
                  disabled={!selectedRoute}
                >
                  Delete Route
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Paper sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        position: 'relative' 
      }}>
        <Box ref={mapRef} sx={{ 
          width: "100%", 
          height: "600px",
          position: 'relative' 
        }}>
          <img 
            src={`${process.env.REACT_APP_API_URL}/static/logo/inspace.png`} 
            style={{ 
              position: 'absolute', 
              bottom: 16, 
              left: 16, 
              width: '120px', 
              zIndex: 1000,
              filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.2))'
            }} 
          />
          <img 
            src={`${process.env.REACT_APP_API_URL}/static/logo/isro.png`}
            style={{ 
              position: 'absolute', 
              top: 16, 
              right: 16, 
              width: '70px', 
              zIndex: 1000,
              filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.2))'
            }} 
          />
          <img 
            src={`${process.env.REACT_APP_API_URL}/static/logo/skytron.png`}
            style={{ 
              position: 'absolute', 
              bottom: 36, 
              right: 16, 
              width: '200px', 
              zIndex: 1000,
              filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.2))'
            }} 
          />
        </Box>
      </Paper>

      <div
        ref={overlayRef}
        className="popup-container"
        style={{ display: "none", position: "absolute", zIndex: 1000 }}
      >
        <div
          className="popup-menu"
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            padding: "5px",
          }}
        >
          <div id="delete">Delete</div>
          <div id="cancel">Cancel</div>
        </div>
      </div>
    </MainCard>
  );
};

export default RouteFixing;