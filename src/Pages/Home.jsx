import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Box, Card, CardContent, Grid, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getUserInfo } from '../helper';
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Add bar chart options with responsive settings
const getBarOptions = (isMobile) => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          size: isMobile ? 10 : 12
        }
      }
    },
    x: {
      ticks: {
        font: {
          size: isMobile ? 10 : 12
        }
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          size: isMobile ? 10 : 12
        },
        boxWidth: isMobile ? 10 : 12
      }
    },
  },
});

// Updated Styled components with responsive styles
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'linear-gradient(135deg, #f5f7ff 0%, #e4ecfb 100%)',
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.15)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 24px 0 rgba(31, 38, 135, 0.25)',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: theme.spacing(0.5),
  }
}));

const StatItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
  }
}));

// Define consistent gradient colors
const gradientColors = {
  blue: 'linear-gradient(135deg, #dbeafe 0%, #60a5fa 100%)',     // light blue → medium blue
  purple: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 100%)',  // light purple → violet
  slate: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)',   // light gray → slate
  gray: 'linear-gradient(135deg, #f9fafb 0%, #d1d5db 100%)',    // very light gray → medium gray
};

// Update chart colors
const chartColors = {
  primary: '#6C63FF',     // soft indigo
  secondary: '#A393EB',   // lavender
  tertiary: '#C1C8E4',    // light blue-gray
  quaternary: '#E6E9F5',  // very light pastel
  success: '#4CAF7D',     // soft green
  warning: '#FFB74D',     // warm amber
  error: '#E57373',       // soft red
};


const Home = () => {
  const user = getUserInfo();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Demo data for different user roles
  const manufacturerData = {
    esimInfo: {
      totalActivation: 150,
      oneYearRenewal: 45,
      twoYearRenewal: 30,
    },
    deviceStatusInfo: {
      online: 280,
      todayOffline: 20,
      sevenDaysOffline: 35,
      thirtyDaysOffline: 50,
    },
    miscInfo: {
      dealer: 25,
      allocated: 500,
      activation: 350,
      expired: 15,
    },
    modelInfo: {
      model: 12,
      m2mLinked: 180,
    }
  };

  const dealerData = {
    dealerFitmentInfo: {
      total: 200,
      monthly: 45,
      daily: 5
    },
    dealerDeviceInfo: {
      assigned: 500,
      returned: 20,
      stocked: 300,
      faulty: 10
    },
    deviceStatusInfo: {
      online: 280,
      todayOffline: 20,
      sevenDaysOffline: 35,
      thirtyDaysOffline: 50,
    }
  };

  const ownerData = {
    vehicleInfo: {
      total: 100,
      active: 85,
      inactive: 15
    },
    alertInfo: {
      total: 250,
      monthly: 50,
      daily: 5
    },
    deviceHealth: {
      activated: 85,
      offline: 15,
      sevenDaysOffline: 8,
      thirtyDaysOffline: 5
    }
  };

  const renderDashboard = () => {
    switch(user.role) {
      case "devicemanufacture":
        return (
          <Grid container spacing={isMobile ? 1 : 2} sx={{ height: 'calc(100vh - 80px)' }}>
              {/* Device Status */}
            <Grid item xs={12} md={4} sx={{ height: { xs: '30vh', sm: '35vh', md: '45vh' } }}>
              <StyledCard sx={{ background: gradientColors.purple, height: '100%' }}>
                <CardContent sx={{ p: isMobile ? 1 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Device Status
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Pie data={{
                      labels: ['Online', 'Offline'],
                      datasets: [{
                        data: [manufacturerData.deviceStatusInfo.online,
                              manufacturerData.deviceStatusInfo.todayOffline +
                              manufacturerData.deviceStatusInfo.sevenDaysOffline +
                              manufacturerData.deviceStatusInfo.thirtyDaysOffline],
                        backgroundColor: [chartColors.primary, chartColors.secondary],
                      }]
                    }} options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            font: {
                              size: isMobile ? 10 : 12
                            },
                            boxWidth: isMobile ? 10 : 12
                          }
                        }
                      }
                    }} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* eSIM Status */}
            <Grid item xs={12} md={8} sx={{ height: { xs: '30vh', sm: '35vh', md: '45vh' } }}>
              <StyledCard sx={{ background: gradientColors.blue, height: '100%' }}>
                <CardContent sx={{ p: isMobile ? 1 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    eSIM Status
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Bar data={{
                      labels: ['Total Activations', '1 Year Renewals', '2 Year Renewals'],
                      datasets: [{
                        label: 'eSIM Stats',
                        data: [manufacturerData.esimInfo.totalActivation, 
                              manufacturerData.esimInfo.oneYearRenewal, 
                              manufacturerData.esimInfo.twoYearRenewal],
                        backgroundColor: [chartColors.primary, chartColors.secondary, chartColors.tertiary],
                      }]
                    }} options={getBarOptions(isMobile)} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

          
            {/* Stats Sections */}
            <Grid item xs={12} md={6} sx={{ height: { xs: '30vh', sm: '35vh', md: '45vh' } }}>
              <StyledCard sx={{ background: gradientColors.slate, height: '100%' }}>
                <CardContent sx={{ p: isMobile ? 1 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    General Info
                  </Typography>
                  <Grid container spacing={isMobile ? 0.5 : 1} sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <StatItem>
                        <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Total Dealers
                        </Typography>
                        <Typography fontWeight="medium" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {manufacturerData.miscInfo.dealer}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StatItem>
                        <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Stock Allocated
                        </Typography>
                        <Typography fontWeight="medium" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {manufacturerData.miscInfo.allocated}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StatItem>
                        <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Total Activations
                        </Typography>
                        <Typography fontWeight="medium" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {manufacturerData.miscInfo.activation}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StatItem>
                        <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Expired Devices
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {manufacturerData.miscInfo.expired}
                        </Typography>
                      </StatItem>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={6} sx={{ height: { xs: '30vh', sm: '35vh', md: '45vh' } }}>
              <StyledCard sx={{ background: gradientColors.gray, height: '100%' }}>
                <CardContent sx={{ p: isMobile ? 1 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Device Status Details
                  </Typography>
                  <Grid container spacing={isMobile ? 0.5 : 1} sx={{ flexGrow: 1 }}>
                    <Grid item xs={12}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Online Devices
                        </Typography>
                        <Typography color="primary" fontWeight="medium" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {manufacturerData.deviceStatusInfo.online}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Offline Today
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {manufacturerData.deviceStatusInfo.todayOffline}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Offline (7 days)
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {manufacturerData.deviceStatusInfo.sevenDaysOffline}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Offline (30 days)
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {manufacturerData.deviceStatusInfo.thirtyDaysOffline}
                        </Typography>
                      </StatItem>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        );

      case "dealer":
        return (
          <Grid container spacing={isMobile ? 1 : 2} sx={{ height: 'calc(100vh - 80px)' }}>
               {/* Device Status */}
            <Grid item xs={12} md={4} sx={{ height: { xs: '30vh', sm: '35vh', md: '45vh' } }}>
              <StyledCard sx={{ background: gradientColors.purple, height: '100%' }}>
                <CardContent sx={{ p: isMobile ? 1 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Device Inventory
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Pie data={{
                      labels: ['Assigned', 'Stocked', 'Returned', 'Faulty'],
                      datasets: [{
                        data: [dealerData.dealerDeviceInfo.assigned,
                              dealerData.dealerDeviceInfo.stocked,
                              dealerData.dealerDeviceInfo.returned,
                              dealerData.dealerDeviceInfo.faulty],
                        backgroundColor: [chartColors.primary, chartColors.secondary, chartColors.tertiary, chartColors.quaternary],
                      }]
                    }} options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            font: {
                              size: isMobile ? 10 : 12
                            },
                            boxWidth: isMobile ? 10 : 12
                          }
                        }
                      }
                    }} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Fitment Statistics */}
            <Grid item xs={12} md={8} sx={{ height: { xs: '30vh', sm: '35vh', md: '45vh' } }}>
              <StyledCard sx={{ background: gradientColors.blue, height: '100%' }}>
                <CardContent sx={{ p: isMobile ? 1 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Fitment Statistics
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Bar data={{
                      labels: ['Total Fitments', 'Monthly Fitments', 'Daily Fitments'],
                      datasets: [{
                        label: 'Fitment Stats',
                        data: [dealerData.dealerFitmentInfo.total, 
                              dealerData.dealerFitmentInfo.monthly, 
                              dealerData.dealerFitmentInfo.daily],
                        backgroundColor: [chartColors.primary, chartColors.secondary, chartColors.tertiary],
                      }]
                    }} options={getBarOptions(isMobile)} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Device Status Details */}
            <Grid item xs={12} sx={{ height: { xs: '30vh', sm: '35vh', md: '45vh' } }}>
              <StyledCard sx={{ background: gradientColors.gray, height: '100%' }}>
                <CardContent sx={{ p: isMobile ? 1 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Device Status Details
                  </Typography>
                  <Grid container spacing={isMobile ? 0.5 : 1} sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Online Devices
                        </Typography>
                        <Typography color="primary" fontWeight="medium" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {dealerData.deviceStatusInfo.online}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Offline Today
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {dealerData.deviceStatusInfo.todayOffline}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          7 Days Offline
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {dealerData.deviceStatusInfo.sevenDaysOffline}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          30 Days Offline
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {dealerData.deviceStatusInfo.thirtyDaysOffline}
                        </Typography>
                      </StatItem>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        );

      case "owner":
        return (
          <Grid container spacing={isMobile ? 1 : 2} sx={{ height: 'calc(100vh - 80px)' }}>

             {/* Alert Statistics */}
            <Grid item xs={12} md={6} sx={{ height: { xs: '30vh', sm: '35vh', md: '45vh' } }}>
              <StyledCard sx={{ background: gradientColors.gray, height: '100%' }}>
                <CardContent sx={{ p: isMobile ? 1 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Alert Statistics
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Bar data={{
                      labels: ['Total Alerts', 'Monthly Alerts', 'Daily Alerts'],
                      datasets: [{
                        label: 'Alert Stats',
                        data: [ownerData.alertInfo.total, 
                              ownerData.alertInfo.monthly, 
                              ownerData.alertInfo.daily],
                        backgroundColor: [chartColors.primary, chartColors.secondary, chartColors.tertiary],
                      }]
                    }} options={getBarOptions(isMobile)} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Vehicle Statistics */}
            <Grid item xs={12} md={6} sx={{ height: { xs: '30vh', sm: '35vh', md: '45vh' } }}>
              <StyledCard sx={{ background: gradientColors.blue, height: '100%' }}>
                <CardContent sx={{ p: isMobile ? 1 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Vehicle Status
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Pie data={{
                      labels: ['Active Vehicles', 'Inactive Vehicles'],
                      datasets: [{
                        data: [ownerData.vehicleInfo.active, ownerData.vehicleInfo.inactive],
                        backgroundColor: [chartColors.primary, chartColors.secondary],
                      }]
                    }} options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            font: {
                              size: isMobile ? 10 : 12
                            },
                            boxWidth: isMobile ? 10 : 12
                          }
                        }
                      }
                    }} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Device Health */}
            <Grid item xs={12} sx={{ height: { xs: '30vh', sm: '35vh', md: '45vh' } }}>
              <StyledCard sx={{ background: gradientColors.purple, height: '100%' }}>
                <CardContent sx={{ p: isMobile ? 1 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Device Health
                  </Typography>
                  <Grid container spacing={isMobile ? 0.5 : 1} sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Activated Devices
                        </Typography>
                        <Typography color="primary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {ownerData.deviceHealth.activated}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          Offline Devices
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {ownerData.deviceHealth.offline}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          7 Days Offline
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {ownerData.deviceHealth.sevenDaysOffline}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                          30 Days Offline
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                          {ownerData.deviceHealth.thirtyDaysOffline}
                        </Typography>
                      </StatItem>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        );

      default:
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 80px)">
            <Typography variant={isMobile ? "subtitle1" : "h6"} color="error">
              Invalid user role or unauthorized access
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2 }, 
      bgcolor: '#f5f5f5', 
      height: '100vh', 
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '3px',
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.3)',
        },
      },
    }}>
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        sx={{ 
          mb: { xs: 1, sm: 2 }, 
          fontWeight: 'bold',
          fontSize: { xs: '1.25rem', sm: '1.5rem' }
        }}
      >
        Dashboard
      </Typography>
      {renderDashboard()}
    </Box>
  );
};

export default Home;