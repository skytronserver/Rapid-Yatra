import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TextField, Button, Box, Typography, Paper, CircularProgress, Autocomplete, Grid, Chip, IconButton, Divider, Tooltip, Modal, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Style, Icon, Stroke, Fill, Circle } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import 'ol/ol.css';
import debounce from 'lodash/debounce';
import NavigationIcon from '@mui/icons-material/Navigation';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsIcon from '@mui/icons-material/Directions';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import StraightIcon from '@mui/icons-material/Straight';
import MergeIcon from '@mui/icons-material/Merge';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UTurnLeftIcon from '@mui/icons-material/UTurnLeft';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import RoundaboutLeftIcon from '@mui/icons-material/RoundaboutLeft';
import RoundaboutRightIcon from '@mui/icons-material/RoundaboutRight';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useGetLiveTrackingQuery, useGetVehiclesQuery } from '../store/services/locationservices';

// Helper function to format duration
const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
};

// Helper function to get maneuver icon
const getManeuverIcon = (type) => {
  switch (type) {
    case 'turn-left':
      return <TurnLeftIcon />;
    case 'turn-right':
      return <TurnRightIcon />;
    case 'straight':
      return <StraightIcon />;
    case 'merge':
      return <MergeIcon />;
    case 'exit':
      return <ExitToAppIcon />;
    case 'uturn-left':
      return <UTurnLeftIcon />;
    case 'uturn-right':
      return <UTurnRightIcon />;
    case 'roundabout-left':
      return <RoundaboutLeftIcon />;
    case 'roundabout-right':
      return <RoundaboutRightIcon />;
    default:
      return <DirectionsIcon />;
  }
};

// Helper function to format maneuver type
const formatManeuverType = (type) => {
  return type.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const Trip = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [eta, setEta] = useState(null);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [map, setMap] = useState(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());
  const suggestionsCache = useRef({});
  const [routeDetails, setRouteDetails] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [nextManeuver, setNextManeuver] = useState(null);
  const currentPositionFeature = useRef(null);
  const navigationInterval = useRef(null);
  const [upcomingTurns, setUpcomingTurns] = useState([]);
  const [vehiclePosition, setVehiclePosition] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [trackingInterval, setTrackingInterval] = useState(null);
  const [vehicleSuggestions, setVehicleSuggestions] = useState([]);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [savedTrips, setSavedTrips] = useState([]);
  const [showSavedTrips, setShowSavedTrips] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  // Get live tracking data - remove parameters to match LiveTracking.jsx
  const { data: liveTrackingData, refetch: refetchLiveTracking } = useGetLiveTrackingQuery();

  // Get vehicles data - remove the skip condition to always fetch
  const { data: vehiclesData, refetch: refetchVehicles } = useGetVehiclesQuery(
    selectedVehicle || '',
    { skip: !selectedVehicle }
  );

  // Initialize map
  useEffect(() => {
    if (!map) {
      const initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([91.829437, 26.131644]),
          zoom: 7,
        }),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSourceRef.current,
      });

      initialMap.addLayer(vectorLayer);
      setMap(initialMap);
    }
  }, [map]);

  // Update vehicle suggestions when data changes
  useEffect(() => {
    if (vehiclesData) {
      console.log('Vehicles data:', vehiclesData); // Debug log
      // Convert array of strings to array of objects
      const suggestions = vehiclesData.map(vehicle => ({
        label: vehicle,
        value: vehicle
      }));
      setVehicleSuggestions(suggestions);
    }
  }, [vehiclesData]);

  // Debounced function to fetch address suggestions
  const fetchSuggestions = useCallback(
    debounce(async (value, isFrom) => {
      if (!value || value.length < 3) {
        isFrom ? setFromSuggestions([]) : setToSuggestions([]);
        setSuggestionsLoading(false);
        return;
      }

      // Check cache first
      const cacheKey = value.toLowerCase();
      if (suggestionsCache.current[cacheKey]) {
        const cachedSuggestions = suggestionsCache.current[cacheKey];
        isFrom ? setFromSuggestions(cachedSuggestions) : setToSuggestions(cachedSuggestions);
        setSuggestionsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5&addressdetails=1&countrycodes=in`
        );

        const suggestions = response.data.map(item => ({
          label: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          type: item.type,
          importance: item.importance
        }));

        // Sort suggestions by importance
        suggestions.sort((a, b) => b.importance - a.importance);

        // Cache the results
        suggestionsCache.current[cacheKey] = suggestions;

        isFrom ? setFromSuggestions(suggestions) : setToSuggestions(suggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        toast.error('Error fetching address suggestions');
      } finally {
        setSuggestionsLoading(false);
      }
    }, 300),
    []
  );

  // Handle address input with loading state
  const handleAddressInput = (value, isFrom) => {
    setSuggestionsLoading(true);
    fetchSuggestions(value, isFrom);
  };

  // Debounced function to fetch vehicle suggestions
  const fetchVehicleSuggestions = useCallback(
    debounce(async (value) => {
      if (!value || value.length < 2) {
        setVehicleSuggestions([]);
        setVehicleLoading(false);
        return;
      }

      setVehicleLoading(true);
      try {
        await refetchVehicles();
      } catch (error) {
        console.error('Error fetching vehicle suggestions:', error);
        toast.error('Error fetching vehicle suggestions');
      } finally {
        setVehicleLoading(false);
      }
    }, 300),
    [refetchVehicles]
  );

  // Handle vehicle input
  const handleVehicleInput = (value) => {
    setSelectedVehicle(value);
    setVehicleLoading(true);
    fetchVehicleSuggestions(value);
  };

  const animateRoute = useCallback((coordinates) => {
    if (!map || !coordinates.length) return;

    setIsAnimating(true);
    let currentIndex = 0;
    const totalPoints = coordinates.length;
    const duration = 5000; // 5 seconds for the entire animation
    const interval = duration / totalPoints;

    const animate = () => {
      if (currentIndex >= totalPoints) {
        setIsAnimating(false);
        return;
      }

      const currentCoord = coordinates[currentIndex];
      map.getView().animate({
        center: currentCoord,
        duration: interval,
        zoom: 15
      });

      currentIndex++;
      setTimeout(animate, interval);
    };

    animate();
  }, [map]);

  const handleGetRoute = async () => {
    if (!fromAddress || !toAddress) {
      toast.error('Please enter both addresses');
      return;
    }

    setLoading(true);
    try {
      // First, geocode the addresses using OpenStreetMap Nominatim API
      const fromResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fromAddress)}`
      );
      const toResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(toAddress)}`
      );

      if (fromResponse.data.length === 0 || toResponse.data.length === 0) {
        toast.error('Could not find one or both addresses');
        return;
      }

      const fromCoords = {
        lat: parseFloat(fromResponse.data[0].lat),
        lon: parseFloat(fromResponse.data[0].lon)
      };
      const toCoords = {
        lat: parseFloat(toResponse.data[0].lat),
        lon: parseFloat(toResponse.data[0].lon)
      };

      // Get detailed route using OSRM
      const routeResponse = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${fromCoords.lon},${fromCoords.lat};${toCoords.lon},${toCoords.lat}?overview=full&geometries=geojson&steps=true&annotations=true`
      );

      if (routeResponse.data.routes && routeResponse.data.routes.length > 0) {
        const route = routeResponse.data.routes[0];
        setRouteData(route);
        setRouteDetails(route);
        setEta(Math.round(route.duration / 60));
        toast.success('Route found successfully!');

        // Clear previous features
        vectorSourceRef.current.clear();

        // Add start and end markers with different styles
        const startPoint = new Feature({
          geometry: new Point(fromLonLat([fromCoords.lon, fromCoords.lat])),
        });
        const endPoint = new Feature({
          geometry: new Point(fromLonLat([toCoords.lon, toCoords.lat])),
        });

        // Style for start marker (green)
        const startStyle = new Style({
          image: new Circle({
            radius: 8,
            fill: new Fill({ color: '#4CAF50' }),
            stroke: new Stroke({ color: '#fff', width: 2 })
          })
        });

        // Style for end marker (red)
        const endStyle = new Style({
          image: new Circle({
            radius: 8,
            fill: new Fill({ color: '#f44336' }),
            stroke: new Stroke({ color: '#fff', width: 2 })
          })
        });

        startPoint.setStyle(startStyle);
        endPoint.setStyle(endStyle);

        // Add route line with gradient color based on speed
        const coordinates = route.geometry.coordinates.map(coord => fromLonLat(coord));
        const routeLine = new Feature({
          geometry: new LineString(coordinates),
        });

        routeLine.setStyle(new Style({
          stroke: new Stroke({
            color: '#0066ff',
            width: 4,
          }),
        }));

        vectorSourceRef.current.addFeatures([startPoint, endPoint, routeLine]);

        // Fit map to show the entire route with padding
        const extent = routeLine.getGeometry().getExtent();
        map.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          duration: 1000,
          maxZoom: 18,
        });

        // Start route animation
        animateRoute(coordinates);
      } else {
        toast.error('Could not find a route between these locations');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error getting route information');
    } finally {
      setLoading(false);
    }
  };

  // Update vehicle position when live tracking data changes
  useEffect(() => {
    if (liveTrackingData && isNavigating && currentPositionFeature.current) {
      const { latitude, longitude } = liveTrackingData;
      const newPosition = fromLonLat([longitude, latitude]);
      
      // Update vehicle position on map
      currentPositionFeature.current.getGeometry().setCoordinates(newPosition);
      setVehiclePosition(newPosition);

      // Update map view to follow vehicle
      map.getView().animate({
        center: newPosition,
        duration: 1000,
        zoom: 18
      });

      // Check if we need to update the next maneuver based on current position
      if (routeDetails?.legs?.[0]?.steps) {
        const currentStepIndex = findCurrentStepIndex(newPosition);
        if (currentStepIndex !== -1 && currentStepIndex !== currentStep) {
          setCurrentStep(currentStepIndex);
          updateUpcomingTurns(currentStepIndex);
        }
      }
    }
  }, [liveTrackingData, isNavigating]);

  // Helper function to find current step based on position
  const findCurrentStepIndex = (position) => {
    if (!routeDetails?.legs?.[0]?.steps) return -1;

    const steps = routeDetails.legs[0].steps;
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const stepCoords = step.geometry.coordinates.map(coord => fromLonLat(coord));
      
      // Check if position is near any coordinate in this step
      const isNearStep = stepCoords.some(coord => {
        const distance = Math.sqrt(
          Math.pow(coord[0] - position[0], 2) + 
          Math.pow(coord[1] - position[1], 2)
        );
        return distance < 0.0001; // Adjust this threshold as needed
      });

      if (isNearStep) return i;
    }
    return -1;
  };

  const startNavigation = () => {
    if (!routeDetails || !selectedVehicle) {
      toast.error('Please select a vehicle and calculate route first');
      return;
    }
    
    setIsNavigating(true);
    setCurrentStep(0);
    updateUpcomingTurns(0);
    
    // Create current position marker if it doesn't exist
    if (!currentPositionFeature.current) {
      currentPositionFeature.current = new Feature({
        geometry: new Point(fromLonLat([0, 0])) // Initial position will be updated by live tracking
      });
      
      // Style for current position marker
      const positionStyle = new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({ color: '#2196F3' }),
          stroke: new Stroke({ color: '#fff', width: 2 })
        })
      });
      
      currentPositionFeature.current.setStyle(positionStyle);
      vectorSourceRef.current.addFeature(currentPositionFeature.current);
    }

    // Start live tracking
    const interval = setInterval(() => {
      refetchLiveTracking();
    }, 5000); // Poll every 5 seconds

    setTrackingInterval(interval);
  };

  const updateUpcomingTurns = (currentStepIndex) => {
    if (!routeDetails?.legs?.[0]?.steps) return;
    
    const steps = routeDetails.legs[0].steps;
    const upcoming = [];
    
    // Get next two turns
    for (let i = 0; i < 2; i++) {
      const nextIndex = currentStepIndex + i + 1;
      if (nextIndex < steps.length) {
        upcoming.push(steps[nextIndex]);
      }
    }
    
    setUpcomingTurns(upcoming);
  };

  const stopNavigation = () => {
    if (trackingInterval) {
      clearInterval(trackingInterval);
      setTrackingInterval(null);
    }
    setIsNavigating(false);
    setCurrentStep(0);
    setUpcomingTurns([]);
    setVehiclePosition(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
    };
  }, [trackingInterval]);

  // Load saved trips from localStorage on component mount
  useEffect(() => {
    const savedTripsData = localStorage.getItem('savedTrips');
    if (savedTripsData) {
      setSavedTrips(JSON.parse(savedTripsData));
    }
  }, []);

  // Save current trip
  const saveTrip = () => {
    if (!routeDetails || !selectedVehicle) {
      toast.error('Please calculate a route first');
      return;
    }

    const newTrip = {
      id: Date.now(),
      fromAddress,
      toAddress,
      vehicleNumber: selectedVehicle,
      routeDetails,
      savedAt: new Date().toISOString()
    };

    const updatedTrips = [...savedTrips, newTrip];
    setSavedTrips(updatedTrips);
    localStorage.setItem('savedTrips', JSON.stringify(updatedTrips));
    toast.success('Trip saved successfully!');
  };

  // Load saved trip
  const loadSavedTrip = (trip) => {
    setFromAddress(trip.fromAddress);
    setToAddress(trip.toAddress);
    setSelectedVehicle(trip.vehicleNumber);
    setRouteDetails(trip.routeDetails);
    setRouteData(trip.routeDetails);
    setEta(Math.round(trip.routeDetails.duration / 60));
    setShowSavedTrips(false);
    
    // Recreate the route visualization
    const coordinates = trip.routeDetails.geometry.coordinates.map(coord => fromLonLat(coord));
    vectorSourceRef.current.clear();
    
    // Add start and end markers
    const startPoint = new Feature({
      geometry: new Point(fromLonLat([trip.routeDetails.geometry.coordinates[0][0], trip.routeDetails.geometry.coordinates[0][1]])),
    });
    const endPoint = new Feature({
      geometry: new Point(fromLonLat([trip.routeDetails.geometry.coordinates[trip.routeDetails.geometry.coordinates.length - 1][0], trip.routeDetails.geometry.coordinates[trip.routeDetails.geometry.coordinates.length - 1][1]])),
    });

    const startStyle = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({ color: '#4CAF50' }),
        stroke: new Stroke({ color: '#fff', width: 2 })
      })
    });

    const endStyle = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({ color: '#f44336' }),
        stroke: new Stroke({ color: '#fff', width: 2 })
      })
    });

    startPoint.setStyle(startStyle);
    endPoint.setStyle(endStyle);

    const routeLine = new Feature({
      geometry: new LineString(coordinates),
    });

    routeLine.setStyle(new Style({
      stroke: new Stroke({
        color: '#0066ff',
        width: 4,
      }),
    }));

    vectorSourceRef.current.addFeatures([startPoint, endPoint, routeLine]);

    const extent = routeLine.getGeometry().getExtent();
    map.getView().fit(extent, {
      padding: [50, 50, 50, 50],
      duration: 1000,
      maxZoom: 18,
    });
  };

  // Delete saved trip
  const deleteSavedTrip = (tripId) => {
    const updatedTrips = savedTrips.filter(trip => trip.id !== tripId);
    setSavedTrips(updatedTrips);
    localStorage.setItem('savedTrips', JSON.stringify(updatedTrips));
    toast.success('Trip deleted successfully!');
  };

  // Function to get current location using live tracking
  const getCurrentLocation = async () => {
    if (!selectedVehicle) {
      toast.error('Please select a vehicle first');
      return;
    }

    setIsGettingLocation(true);
    try {
      // Get live tracking data
      const response = await refetchLiveTracking();
      console.log('Live tracking response:', response); // Debug log

      // Find the vehicle data for the selected vehicle
      const vehicleData = response.data?.data?.find(
        vehicle => vehicle.vehicle_registration_number === selectedVehicle
      );

      if (vehicleData && vehicleData.latitude && vehicleData.longitude) {
        try {
          // Try to reverse geocode to get address
          const geocodeResponse = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${vehicleData.latitude}&lon=${vehicleData.longitude}&addressdetails=1`
          );

          if (geocodeResponse.data) {
            const address = geocodeResponse.data.display_name;
            setFromAddress(address);
            // Add current location to suggestions
            const currentLocationSuggestion = {
              label: address,
              lat: vehicleData.latitude,
              lon: vehicleData.longitude,
              type: 'Current Vehicle Location',
              importance: 1
            };
            setFromSuggestions([currentLocationSuggestion, ...fromSuggestions]);
          }
        } catch (geocodeError) {
          // If geocoding fails, use lat/long coordinates
          const latLongAddress = `${vehicleData.latitude.toFixed(6)}, ${vehicleData.longitude.toFixed(6)}`;
          setFromAddress(latLongAddress);
          // Add current location to suggestions with lat/long
          const currentLocationSuggestion = {
            label: latLongAddress,
            lat: vehicleData.latitude,
            lon: vehicleData.longitude,
            type: 'Current Vehicle Location (Coordinates)',
            importance: 1
          };
          setFromSuggestions([currentLocationSuggestion, ...fromSuggestions]);
        }
      } else {
        toast.error('Could not get vehicle location');
      }
    } catch (error) {
      console.error('Error getting location:', error);
      toast.error('Error getting vehicle location');
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Plan Your Trip
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View Saved Trips">
            <IconButton onClick={() => setShowSavedTrips(true)} color="primary">
              <HistoryIcon />
            </IconButton>
          </Tooltip>
          {routeDetails && (
            <Tooltip title="Save Trip">
              <IconButton onClick={saveTrip} color="primary">
                <SaveIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Saved Trips Modal */}
      <Modal
        open={showSavedTrips}
        onClose={() => setShowSavedTrips(false)}
        aria-labelledby="saved-trips-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
          <Typography variant="h6" gutterBottom>
            Saved Trips
          </Typography>
          {savedTrips.length === 0 ? (
            <Typography color="text.secondary">
              No saved trips found
            </Typography>
          ) : (
            <List>
              {savedTrips.map((trip) => (
                <ListItem
                  key={trip.id}
                  button
                  onClick={() => loadSavedTrip(trip)}
                  sx={{
                    mb: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <ListItemText
                    primary={`${trip.fromAddress} → ${trip.toAddress}`}
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          Vehicle: {trip.vehicleNumber}
                        </Typography>
                        <br />
                        <Typography variant="caption" component="span">
                          Saved: {new Date(trip.savedAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSavedTrip(trip.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowSavedTrips(false)}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3, maxHeight: '600px', overflow: 'auto' }}>
            <Box sx={{ mb: 2 }}>
              <Autocomplete
                freeSolo
                options={fromSuggestions}
                getOptionLabel={(option) => 
                  typeof option === 'string' ? option : option.label
                }
                onInputChange={(_, value) => {
                  setFromAddress(value);
                  handleAddressInput(value, true);
                }}
                loading={suggestionsLoading || isGettingLocation}
                value={fromAddress}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="From Address"
                    margin="normal"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {(suggestionsLoading || isGettingLocation) ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : (
                            <Tooltip title="Use Current Vehicle Location">
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  getCurrentLocation();
                                }}
                                size="small"
                                sx={{ mr: 1 }}
                                disabled={!selectedVehicle}
                              >
                                <MyLocationIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {option.type === 'Current Vehicle Location' && (
                        <MyLocationIcon color="primary" fontSize="small" />
                      )}
                      <Box>
                        <Typography variant="body1">{option.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.type}
                        </Typography>
                      </Box>
                    </Box>
                  </li>
                )}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Autocomplete
                freeSolo
                options={toSuggestions}
                getOptionLabel={(option) => 
                  typeof option === 'string' ? option : option.label
                }
                onInputChange={(_, value) => {
                  setToAddress(value);
                  handleAddressInput(value, false);
                }}
                loading={suggestionsLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="To Address"
                    margin="normal"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {suggestionsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box>
                      <Typography variant="body1">{option.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.type}
                      </Typography>
                    </Box>
                  </li>
                )}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Autocomplete
                freeSolo
                options={vehicleSuggestions}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') return option;
                  return option?.label || '';
                }}
                onChange={(_, newValue) => {
                  if (newValue) {
                    setSelectedVehicle(typeof newValue === 'string' ? newValue : newValue.label);
                  }
                }}
                onInputChange={(_, value) => {
                  handleVehicleInput(value);
                }}
                loading={vehicleLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Vehicle Number"
                    margin="normal"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {vehicleLoading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box>
                      <Typography variant="body1">{option.label}</Typography>
                    </Box>
                  </li>
                )}
                value={selectedVehicle ? { label: selectedVehicle, value: selectedVehicle } : null}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleGetRoute}
              disabled={loading || isAnimating || !selectedVehicle}
              fullWidth
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Get Route'}
            </Button>

            {routeDetails && !isNavigating && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<NavigationIcon />}
                onClick={startNavigation}
                fullWidth
                sx={{ mb: 2 }}
                disabled={!selectedVehicle}
              >
                Start Navigation
              </Button>
            )}

            {routeDetails && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Trip Information
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip 
                    label={formatDuration(routeDetails.duration)} 
                    color="primary" 
                  />
                  <Chip 
                    label={`${(routeDetails.distance / 1000).toFixed(1)} km`} 
                    color="secondary" 
                  />
                  <Chip 
                    label={`${Math.round(routeDetails.duration / 60)} min`} 
                    color="info" 
                  />
                </Box>
              </Box>
            )}

            {isNavigating && upcomingTurns.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DirectionsIcon color="primary" />
                  Upcoming Turns
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: 1,
                  mt: 1
                }}>
                  {upcomingTurns.map((step, index) => (
                    <Paper
                      key={index}
                      elevation={1}
                      sx={{
                        p: 1.5,
                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                        borderLeft: '4px solid #2196F3',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white'
                        }}>
                          {getManeuverIcon(step.maneuver.type)}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {formatManeuverType(step.maneuver.type)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {step.name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Chip 
                              size="small"
                              label={formatDuration(step.duration)}
                              color="primary"
                              variant="outlined"
                            />
                            <Chip 
                              size="small"
                              label={`${(step.distance / 1000).toFixed(1)} km`}
                              color="secondary"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 0, height: '600px', overflow: 'hidden', position: 'relative' }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
            {isNavigating && upcomingTurns[0] && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  right: 10,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  p: 2,
                  borderRadius: 2,
                  zIndex: 1000,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: 3
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white'
                  }}>
                    {getManeuverIcon(upcomingTurns[0].maneuver.type)}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {formatManeuverType(upcomingTurns[0].maneuver.type)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      {upcomingTurns[0].name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        size="small"
                        label={formatDuration(upcomingTurns[0].duration)}
                        color="primary"
                      />
                      <Chip 
                        size="small"
                        label={`${(upcomingTurns[0].distance / 1000).toFixed(1)} km`}
                        color="secondary"
                      />
                    </Box>
                  </Box>
                </Box>
                <IconButton 
                  onClick={stopNavigation} 
                  color="primary"
                  sx={{ 
                    bgcolor: 'rgba(33, 150, 243, 0.1)',
                    '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.2)' }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Trip; 