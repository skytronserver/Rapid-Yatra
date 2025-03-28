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
  Stack 
} from '@mui/material';
import { 
  DirectionsCar, 
  CalendarToday, 
  Search,
  History 
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
    <MainCard>
      {/* Modern header section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ 
          fontSize: '1.75rem', 
          fontWeight: 600,
          color: 'primary.main' 
        }}>
          Vehicle History Playback
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          View detailed movement history of your vehicles
        </Typography>
      </Box>

      {/* Search form */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
                  '& input': {
                    padding: '12px'
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
                  '& input': {
                    padding: '12px'
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
                  height: '56px',
                  borderRadius: '8px'
                }}
              >
                Search History
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Map section */}
      {showMap && (
        <Paper 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            height: 'calc(100vh - 380px)',
            minHeight: '500px'
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
      )}
    </MainCard>
  );
};

export default HistoryPlayback;
