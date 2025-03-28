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
} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import MapComponent from "./LiveMap";
import SearchIcon from "@mui/icons-material/Search"; // Import the search icon
import { keyMapping, iconData, iconStyles,fullText,isoDatePattern } from "../../helper";
import {formatDateTime} from "../../helper"
import CircularProgress from '@mui/material/CircularProgress';
import "./tabstyle.css";
import { useGetLiveTrackingMutation, useGetLiveTrackingQuery } from "../../store/services/locationservices";
import { DirectionsCar } from "@mui/icons-material";

const LiveTracking = () => {
  const [load, setLoad] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [imeiNo, setImeiNo] = useState("");
  const [typeFilter, setTypeFilter] = useState("default");
  const [tableDataTop, setTableDataTop] = useState([]); // Data for the scrollable table
  const [selectedId, setSelectedId] = useState(null); // Track the selected button ID
  const [filteredData, setFilteredData] = useState([]); // Data for the bottom table

  // Handle input changes
  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "vehicleNo") {
      setVehicleNo(value);
    } else if (name === "imeiNo") {
      setImeiNo(value);
    }
  };

  const { data: liveTrackingData, isLoading } = useGetLiveTrackingQuery();

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

  console.log("liveTrackingData",tableDataTop,filteredData)

  // Triggered on form submit to fetch new data
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = {
      imei: imeiNo,
      regno: vehicleNo,
    };
    retriveMapData(params);
    setSelectedId(null);
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
    console.log("timediff", timeDifference);
    console.log("data.packet_type ", data.packet_type);
    console.log("data.ignition_status ", data.ignition_status);
    console.log("data.speed  ", data.speed);

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
  return (
    <MainCard>
      {/* Modern header section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ 
          fontSize: '1.75rem', 
          fontWeight: 600,
          color: 'primary.main' 
        }}>
          Live Vehicle Tracking
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Monitor your vehicles in real-time
        </Typography>
      </Box>

      <div className="container" style={{ gap: '24px' }}>
        <div className={selectedId ? "first-div first-div-small" : "first-div first-div-large"}>
          {/* Search section */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Vehicle Registration No"
                    type="text"
                    value={vehicleNo}
                    name="vehicleNo"
                    onChange={handleInput}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DirectionsCar color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ borderRadius: '8px' }}
                        >
                          <SearchIcon />
                        </Button>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>

          {/* Vehicle status icons */}
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Grid container spacing={2}>
              {iconData && iconData.map((item, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    onClick={() => filterByType(item.key)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      p: 1,
                      borderRadius: 1,
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                      ...(typeFilter === item.key && {
                        bgcolor: 'primary.lighter',
                      })
                    }}
                  >
                    <img 
                      src={item.iconUrl} 
                      alt={item.text} 
                      style={{ width: '24px', height: '24px' }}
                    />
                    <Typography 
                      variant="caption" 
                      sx={{ mt: 1, textAlign: 'center' }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Vehicle list */}
          <Paper 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              flex: 1
            }}
          >
            <TableContainer sx={{ maxHeight: selectedId ? '300px' : '500px' }}>
              <Table stickyHeader>
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
                            })
                          }}
                        >
                          <TableCell sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            border: 'none',
                            py: 2
                          }}>
                            <img 
                              src={getIconStyle(row)} 
                              style={{ width: '24px', height: '24px' }}
                            />
                            <Typography>{row.vehicle_registration_number}</Typography>
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell sx={{ textAlign: 'center', py: 4 }}>
                        <CircularProgress size={30} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>

        {/* Map section */}
        <Paper 
          sx={{ 
            width: "80%", 
            height: "100%",
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <MapComponent
            gpsData={filteredData}
            width="100%"
            height={selectedId ? "400px" : "600px"}
          />
        </Paper>
      </div>

      {/* Details table */}
      {selectedId && (
        <Paper sx={{ mt: 3, borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {filteredData.length > 0 &&
                    Object.keys(keyMapping).map((key) => (
                      <TableCell 
                        key={key}
                        sx={{
                          bgcolor: 'primary.lighter',
                          fontWeight: 600
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
                    <TableRow key={rowIndex}>
                      {Object.keys(keyMapping).map((key, cellIndex) => (
                        <TableCell key={cellIndex}>
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
    </MainCard>
  );
};

export default LiveTracking;
