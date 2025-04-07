import React, { useEffect, useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import GPSHistoryMap from "./HistoryPlaybackMap";
import {dateTimeUpdate} from "../../helper"
import { 
  FormControl, 
  Autocomplete, 
  TextField, 
  Button, 
  Grid, 
  Box, 
  Typography, 
  Paper,
  InputAdornment,
  Stack, 
  Avatar,
  Container
} from '@mui/material';
import { 
  DirectionsCar, 
  CalendarToday, 
  Search,
  History,
  Map as MapIcon,
  Timeline
} from '@mui/icons-material';
import { useGetVehiclesQuery } from '../../store/services/locationservices';

const HistoryPlayback = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const [load, setLoad] = useState(false);
  const [vehicleNo, setVehicleNo] = useState('');
  const [fromDate, setFromDate] = useState(dateTimeUpdate(new Date(Date.now() - 86400000)));
  const [toDate, setToDate] = useState(dateTimeUpdate(new Date()));
  const [vehicleList, setVehicleList] = useState([]);
  const [downloadStatus, setDownloadStatus] = useState("");
  const [showMap, setShowMap] = useState(false); // To control visibility of the map

  const { data, isLoading, isError } = useGetVehiclesQuery();

  console.log(data,'oooo')
  useEffect(() => {
    const fetchVehicleList = async () => {
      if (data) {
        setVehicleList(data);
        setLoad(true);
      }
    };
    fetchVehicleList();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMap(true);
    console.log("Submitted data:", { vehicleNo, fromDate, toDate });
    console.log({load})
  };

  const handleVehicleNoChange = (event, newValue) => {
    setVehicleNo(newValue);
  };

  const handleFromDateChange = (e) => {
    const selected = new Date(e.target.value);
    const today = new Date();
    selected<=today && setFromDate(e.target.value);    
  };

  const handleToDateChange = (e) => {
    const selected = new Date(e.target.value);
    const today = new Date();
    selected<=today && setToDate(e.target.value); 
  };

  return (
    <MainCard sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Modern header section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ 
          fontSize: '1.75rem', 
          fontWeight: 600,
          color: 'text.primary', 
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
           <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 40,
              height: 40
            }}
          >
            <MapIcon fontSize="medium" />
          </Avatar>
          Vehicle History Playback
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          View detailed movement history of your vehicles
        </Typography>
      </Box>

      {/* Search form */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={4} sm={12} xs={12}>
              <FormControl fullWidth>
                <Autocomplete
                  value={vehicleNo}
                  onChange={handleVehicleNoChange}
                  options={vehicleList.length > 0 ? vehicleList : []}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="Select Vehicle" 
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <DirectionsCar color="action" />
                          </InputAdornment>
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '50px'
                        }
                      }}
                    />
                  )}
                  noOptionsText={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <History fontSize="small" />
                      <Typography variant="body2">Fetching vehicle list...</Typography>
                    </Stack>
                  }
                  disableClearable
                />
              </FormControl>
            </Grid>

            <Grid item md={3} sm={12} xs={12}>
              <TextField
                fullWidth
                label="From Date"
                type="datetime-local"
                value={fromDate}
                onChange={handleFromDateChange}
                inputProps={{ max: yesterday }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday color="action" />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '50px'
                  }
                }}
              />
            </Grid>

            <Grid item md={3} sm={12} xs={12}>
              <TextField
                fullWidth
                label="To Date"
                type="datetime-local"
                value={toDate}
                onChange={handleToDateChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: currentDate }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday color="action" />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '50px'
                  }
                }}
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
                sx={{ 
                  height: '50px',
                  borderRadius: '8px'
                }}
              >
                Search History
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Map section or fallback UI */}
      {showMap ? (
        <Paper 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            flex: 1,
            minHeight: '400px'
          }}
        >
          <GPSHistoryMap
            startDateTime={fromDate}
            endDateTime={toDate}
            vehicleRegistrationNumber={vehicleNo}
            downloadStatus={downloadStatus}
            setDownloadStatus={setDownloadStatus}
          />
        </Paper>
      ) : (
        <Paper 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            bgcolor: 'background.default'
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: 'primary.light',
              width: 80,
              height: 80,
              mb: 2
            }}
          >
            <Timeline fontSize="large" />
          </Avatar>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            Vehicle History Playback
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', maxWidth: 600, color: 'text.secondary' }}>
            Select a vehicle and date range to view its movement history on the map.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<MapIcon />}
            onClick={() => setShowMap(true)}
            sx={{ mt: 2 }}
          >
            View Map
          </Button>
        </Paper>
      )}
    </MainCard>
  );
};

export default HistoryPlayback;
