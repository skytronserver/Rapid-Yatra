import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Fade,
  Container,
  Stack,
  Badge,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse,
} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import MapComponent from "./LiveMap";
import SearchIcon from "@mui/icons-material/Search";
import { keyMapping, iconData, iconStyles, fullText, isoDatePattern } from "../../helper";
import { formatDateTime } from "../../helper";
import CircularProgress from '@mui/material/CircularProgress';
import "./tabstyle.css";
import { useGetLiveTrackingMutation, useGetLiveTrackingQuery } from "../../store/services/locationservices";
import { 
  DirectionsCar, 
  Close, 
  FilterAlt, 
  Refresh, 
  LocationOn, 
  Speed, 
  AccessTime, 
  BatteryChargingFull,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import ElegantLoader from "../../Components/Loader";
import { Map as MapIcon } from '@mui/icons-material';

const LiveTracking = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [load, setLoad] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [imeiNo, setImeiNo] = useState("");
  const [typeFilter, setTypeFilter] = useState("default");
  const [tableDataTop, setTableDataTop] = useState([]); // Data for the scrollable table
  const [selectedId, setSelectedId] = useState(null); // Track the selected button ID
  const [filteredData, setFilteredData] = useState([]); // Data for the bottom table
  const [showDetails, setShowDetails] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [showVehicleList, setShowVehicleList] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  // Handle input changes
  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "vehicleNo") {
      setVehicleNo(value);
    } else if (name === "imeiNo") {
      setImeiNo(value);
    }
  };

  const { data: liveTrackingData, isLoading, refetch } = useGetLiveTrackingQuery();

  const retriveMapData = async (data) => {
    try {
      if (liveTrackingData?.data && Array.isArray(liveTrackingData.data)) {
        setTableDataTop(liveTrackingData.data);
        setFilteredData(liveTrackingData.data);
      }
      setLoad(true);
    } catch (error) {
      console.error('Error retrieving map data:', error);
      setLoad(false);
    }
  };

  // Triggered on form submit to fetch new data
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = {
      imei: imeiNo,
      regno: vehicleNo,
    };
    retriveMapData(params);
    setSelectedId(null);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  // Update useEffect to use RTK Query data
  useEffect(() => {
    if (liveTrackingData) {
      retriveMapData({});
    }
  }, [liveTrackingData]);

  // Handle button click, update selectedId and filtered data
  const handleButtonClick = (id) => {
    setSelectedId(id); // Update selected ID
    const selectedRow = tableDataTop.find((row) => row.id === id);
    setFilteredData(selectedRow ? [selectedRow] : tableDataTop); // Show only selected row's data or all if none selected
    setShowDetails(true);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  // Helper to calculate time difference in minutes
  const calculateTimeDifference = (startTime, endTime) => {
    const timeDifferenceMillis = endTime - startTime;
    return timeDifferenceMillis / (1000 * 60); // Convert milliseconds to minutes
  };
  
  const getIconStyle = (data) => {
    const entryTime = new Date(data.entry_time);
    const currentTime = new Date();
    const timeDifference = calculateTimeDifference(entryTime, currentTime);

    if (data.packet_type === "EA") {
      return iconStyles.red; // EA Packet - Red Icon
    } else if (data.packet_type !== "NR") {
      return iconStyles.orange; // Any Alert Packet except EA - Orange Icon
    } else if (String(data.ignition_status) === "1" && data.speed <= 1) {
      return iconStyles.blue; // Ignition ON but stationary - Blue Icon
    } else if (String(data.ignition_status) === "1" && data.speed > 1) {
      return iconStyles.green; // Ignition ON and moving - Green Icon
    } else if (timeDifference > 5) {
      return iconStyles.grey; // Offline device (no packets from device for 5+ minutes) - Grey Icon
    } else {
      return iconStyles.default; // Default icon for all other conditions
    }
  };

  const getAlartType = (data) => {
    const entryTime = new Date(data.entry_time);
    const currentTime = new Date();
    const timeDifference = calculateTimeDifference(entryTime, currentTime);

    if (data.packet_type === "EA") {
      return "red"; // EA Packet - Red Icon
    } else if (data.packet_type !== "NR") {
      return "orange"; // Any Alert Packet except EA - Orange Icon
    } else if (String(data.ignition_status) === "1" && data.speed <= 1) {
      return "blue"; // Ignition ON but stationary - Blue Icon
    } else if (String(data.ignition_status) === "1" && data.speed > 1) {
      return "green"; // Ignition ON and moving - Green Icon
    } else if (timeDifference > 5) {
      return "grey"; // Offline device (no packets from device for 5+ minutes) - Grey Icon
    } else {
      return "default"; // Default icon for all other conditions
    }
  };

  const filterByType = (data) => {
    setTypeFilter(data);
    if (data === "default") {
      setFilteredData(tableDataTop);
    } else {
      const selectedRow = tableDataTop.find(
        (row) => getAlartType(row) === data
      );
      setFilteredData(selectedRow ? [selectedRow] : tableDataTop);
    }

    setSelectedId(null);
  };

  const checkType = (type, data) => {
    if (type === "default" || getAlartType(data) === type) {
      return true;
    } else {
      return false;
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleMapVisibility = () => {
    setShowMap(!showMap);
  };

  const toggleVehicleListVisibility = () => {
    setShowVehicleList(!showVehicleList);
  };

  const toggleFiltersVisibility = () => {
    setShowFilters(!showFilters);
  };

  if(isLoading){
    return <ElegantLoader
     variant="circular"
     text="Loading..."
     fullScreen
     transparent
     />
  }

  // Mobile drawer content
  const mobileDrawerContent = (
    <Box sx={{ width: isSmallMobile ? '100%' : 320, p: 2, height: '100%', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Vehicle Controls</Typography>
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
        
        <ListItemButton onClick={toggleVehicleListVisibility}>
          <ListItemIcon>
            {showVehicleList ? <Visibility /> : <VisibilityOff />}
          </ListItemIcon>
          <ListItemText primary="Toggle Vehicle List" secondary={showVehicleList ? "List is visible" : "List is hidden"} />
        </ListItemButton>
        
        <ListItemButton onClick={toggleFiltersVisibility}>
          <ListItemIcon>
            {showFilters ? <Visibility /> : <VisibilityOff />}
          </ListItemIcon>
          <ListItemText primary="Toggle Filters" secondary={showFilters ? "Filters are visible" : "Filters are hidden"} />
        </ListItemButton>
        
        <ListItemButton onClick={handleRefresh}>
          <ListItemIcon>
            <Refresh />
          </ListItemIcon>
          <ListItemText primary="Refresh Data" />
        </ListItemButton>
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Vehicle Status
      </Typography>
      
      <Grid container spacing={1.5}>
        {iconData && iconData.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Box
              onClick={() => filterByType(item.key)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1.5,
                borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateY(-2px)'
                },
                ...(typeFilter === item.key && {
                  bgcolor: 'primary.lighter',
                  boxShadow: theme.shadows[2]
                })
              }}
            >
              <img 
                src={item.iconUrl} 
                alt={item.text} 
                style={{ width: '28px', height: '28px' }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  mt: 1, 
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  fontWeight: typeFilter === item.key ? 600 : 400
                }}
              >
                {item.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Search Vehicle
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder="Vehicle registration number"
          type="text"
          value={vehicleNo}
          name="vehicleNo"
          onChange={handleInput}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              paddingRight: '0 !important'
            },
            '& .MuiOutlinedInput-input': {
              paddingRight: '0 !important'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DirectionsCar color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ 
                    borderRadius: '8px',
                    minWidth: 'auto',
                    p: 1,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none'
                    }
                  }}
                >
                  <SearchIcon />
                </Button>
              </InputAdornment>
            )
          }}
        />
      </form>
    </Box>
  );

  return (
    <MainCard sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header section */}
      <Box sx={{ 
        mb: 2, 
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
            <Typography variant="h3" sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, 
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1.2
            }}
            >
              Live Vehicle Tracking
            </Typography>
            <Typography variant="body2" sx={{ 
              color: 'text.secondary',
              mt: 0.5,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
            >
              Monitor your vehicles in real-time
            </Typography>
          </Box>
        </Box>
        
        {isMobile && (
          <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '0.75rem'
              }}
            >
              Refresh
            </Button>
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

      {/* Main content */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        minHeight: 0,
        gap: 2,
        overflow: 'hidden'
      }}>
        <Grid container spacing={isMobile ? 1 : 3} sx={{ 
          flex: showDetails ? '0.65' : '1', 
          minHeight: 0,
          overflow: 'hidden'
        }}>
          {/* Left column - Controls and vehicle list */}
          <Grid item xs={12} md={4} sx={{ 
            display: { xs: showVehicleList ? 'flex' : 'none', md: 'flex' }, 
            flexDirection: 'column', 
            minHeight: 0 
          }}>
            <Stack spacing={2} sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              {/* Search box */}
              <Paper sx={{ 
                p: { xs: 1.5, sm: 2 }, 
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: theme.shadows[4]
                }
              }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    placeholder="Vehicle registration number"
                    type="text"
                    value={vehicleNo}
                    name="vehicleNo"
                    onChange={handleInput}
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingRight: '0 !important'
                      },
                      '& .MuiOutlinedInput-input': {
                        paddingRight: '0 !important'
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DirectionsCar color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ 
                              borderRadius: '8px',
                              minWidth: 'auto',
                              p: 1,
                              boxShadow: 'none',
                              '&:hover': {
                                boxShadow: 'none'
                              }
                            }}
                          >
                            <SearchIcon />
                          </Button>
                        </InputAdornment>
                      )
                    }}
                  />
                </form>
              </Paper>

              {/* Status filters */}
              <Paper sx={{ 
                p: { xs: 1.5, sm: 2 }, 
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: theme.shadows[4]
                },
                display: { xs: showFilters ? 'block' : 'none', md: 'block' }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 2
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    Vehicle Status
                  </Typography>
                  <Chip 
                    label={typeFilter === "default" ? "All Vehicles" : typeFilter} 
                    size="small"
                    color="primary"
                    variant="outlined"
                    onDelete={typeFilter !== "default" ? () => filterByType("default") : undefined}
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                  />
                </Box>
                <Grid container spacing={1.5}>
                  {iconData && iconData.map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <Box
                        onClick={() => filterByType(item.key)}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          cursor: 'pointer',
                          p: { xs: 1, sm: 1.5 },
                          borderRadius: 2,
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: 'action.hover',
                            transform: 'translateY(-2px)'
                          },
                          ...(typeFilter === item.key && {
                            bgcolor: 'primary.lighter',
                            boxShadow: theme.shadows[2]
                          })
                        }}
                      >
                        <img 
                          src={item.iconUrl} 
                          alt={item.text} 
                          style={{ width: isMobile ? '24px' : '28px', height: isMobile ? '24px' : '28px' }}
                        />
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            mt: 1, 
                            textAlign: 'center',
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            fontWeight: typeFilter === item.key ? 600 : 400
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {/* Vehicle list */}
              <Paper sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: theme.shadows[2],
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: theme.shadows[4]
                }
              }}>
                <Box sx={{ 
                  p: { xs: 1.5, sm: 2 }, 
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: 'background.paper'
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    Vehicle List
                  </Typography>
                  <Badge 
                    badgeContent={tableDataTop.length} 
                    color="primary"
                    sx={{ '& .MuiBadge-badge': { fontSize: { xs: '0.7rem', sm: '0.8rem' } } }}
                  >
                    <DirectionsCar color="action" />
                  </Badge>
                </Box>
                <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
                  <Table size="small" stickyHeader>
                    <TableBody>
                      {tableDataTop.length > 0 ? (
                        tableDataTop.map((row) =>
                          checkType(typeFilter, row) && (
                            <TableRow 
                              key={row.id}
                              onClick={() => handleButtonClick(row.id)}
                              sx={{
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                  bgcolor: 'action.hover',
                                },
                                ...(selectedId === row.id && {
                                  bgcolor: 'primary.lighter',
                                  boxShadow: theme.shadows[1]
                                })
                              }}
                            >
                              <TableCell sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                border: 'none',
                                py: { xs: 1, sm: 1.5 }
                              }}>
                                <Avatar 
                                  sx={{ 
                                    width: { xs: 28, sm: 32 }, 
                                    height: { xs: 28, sm: 32 },
                                    bgcolor: 'background.paper',
                                    boxShadow: theme.shadows[1]
                                  }}
                                >
                                  <img 
                                    src={getIconStyle(row)} 
                                    style={{ width: isMobile ? '16px' : '20px', height: isMobile ? '16px' : '20px' }}
                                  />
                                </Avatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <Typography variant="body2" sx={{ 
                                    fontWeight: selectedId === row.id ? 600 : 500,
                                    color: selectedId === row.id ? 'primary.main' : 'text.primary',
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                  }}>
                                    {row.vehicle_registration_number}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                    {formatDateTime(row.entry_time)}
                                  </Typography>
                                </Box>
                              </TableCell>
                            </TableRow>
                          )
                        )
                      ) : (
                        <TableRow>
                          <TableCell sx={{ textAlign: 'center', py: 4 }}>
                            <CircularProgress size={24} />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Stack>
          </Grid>

          {/* Right column - Map */}
          <Grid item xs={12} md={8} sx={{ 
            display: { xs: showMap ? 'flex' : 'none', md: 'flex' }, 
            flexDirection: 'column', 
            minHeight: 0 
          }}>
            <Paper sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: theme.shadows[2],
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: theme.shadows[4]
              }
            }}>
              <Box sx={{ 
                p: { xs: 1.5, sm: 2 }, 
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'background.paper'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    Live Map
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {selectedId && (
                    <Chip 
                      label="Single Vehicle View" 
                      size="small"
                      color="primary"
                      variant="outlined"
                      icon={<DirectionsCar />}
                      sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                    />
                  )}
                  {!isMobile && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Refresh />}
                      onClick={handleRefresh}
                      sx={{ 
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' }
                      }}
                    >
                      Refresh
                    </Button>
                  )}
                </Box>
              </Box>
              <Box sx={{ 
                flex: 1, 
                position: 'relative',
                minHeight: { xs: '50vh', sm: '60vh', md: '70vh' }
              }}>
                <MapComponent
                  gpsData={filteredData}
                  width="100%"
                  height="100%"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Details panel */}
        {showDetails && selectedId && (
          <Paper sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            position: 'relative',
            boxShadow: theme.shadows[3],
            transition: 'all 0.3s ease',
            flex: '0.35',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
              boxShadow: theme.shadows[5]
            }
          }}>
            <Box sx={{ 
              p: { xs: 1.5, sm: 2 }, 
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'background.paper'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DirectionsCar color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Vehicle Details
                </Typography>
              </Box>
              <IconButton 
                size="small" 
                onClick={handleCloseDetails}
                sx={{ 
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
            <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    {filteredData.length > 0 &&
                      Object.keys(keyMapping).map((key) => (
                        <TableCell 
                          key={key}
                          sx={{
                            bgcolor: 'primary.lighter',
                            fontWeight: 600,
                            py: { xs: 1, sm: 1.5 },
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                          }}
                        >
                          {keyMapping[key]}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, rowIndex) => (
                      <TableRow key={rowIndex} hover>
                        {Object.keys(keyMapping).map((key, cellIndex) => (
                          <TableCell key={cellIndex} sx={{ py: { xs: 1, sm: 1.5 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            {fullText?.[row[key]] || 
                             (isoDatePattern.test(row[key]) && formatDateTime(row[key])) || 
                             row[key] || ""}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={Object.keys(keyMapping).length}
                        sx={{ textAlign: 'center', py: 3 }}
                      >
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>

      {/* Mobile drawer for controls */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer}
        PaperProps={{
          sx: {
            width: isSmallMobile ? '100%' : 320,
            maxWidth: '100%'
          }
        }}
      >
        {mobileDrawerContent}
      </Drawer>
    </MainCard>
  );
};

export default LiveTracking;
