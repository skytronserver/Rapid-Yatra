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
import { Box, Card, CardContent, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getUserInfo } from '../helper';
import { useState, useEffect } from 'react';
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

// Add bar chart options
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

// Updated Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'linear-gradient(135deg, #f5f7ff 0%, #e4ecfb 100%)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
  },
}));

const StatItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: theme.spacing(1),
}));

const Home = () => {
  const user = getUserInfo();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setIsLoading(false);
  }, []);

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
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      );
    }

    switch(user.role) {
      case "manufacturer":
        return (
          <Grid container spacing={3}>
            {/* eSIM Status */}
            <Grid item xs={12} md={8}>
              <StyledCard sx={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>eSIM Status</Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar data={{
                      labels: ['Total Activations', '1 Year Renewals', '2 Year Renewals'],
                      datasets: [{
                        label: 'eSIM Stats',
                        data: [manufacturerData.esimInfo.totalActivation, 
                              manufacturerData.esimInfo.oneYearRenewal, 
                              manufacturerData.esimInfo.twoYearRenewal],
                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                      }]
                    }} options={barOptions} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Device Status */}
            <Grid item xs={12} md={4}>
              <StyledCard sx={{ background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Device Status</Typography>
                  <Box sx={{ height: 300 }}>
                    <Pie data={{
                      labels: ['Online', 'Offline'],
                      datasets: [{
                        data: [manufacturerData.deviceStatusInfo.online,
                              manufacturerData.deviceStatusInfo.todayOffline +
                              manufacturerData.deviceStatusInfo.sevenDaysOffline +
                              manufacturerData.deviceStatusInfo.thirtyDaysOffline],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                      }]
                    }} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Stats Sections */}
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3 }}>General Info</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <StatItem>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Total Dealers</Typography>
                        <Typography fontWeight="medium">{manufacturerData.miscInfo.dealer}</Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StatItem>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Stock Allocated</Typography>
                        <Typography fontWeight="medium">{manufacturerData.miscInfo.allocated}</Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StatItem>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Total Activations</Typography>
                        <Typography fontWeight="medium">{manufacturerData.miscInfo.activation}</Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StatItem>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Expired Devices</Typography>
                        <Typography color="error">{manufacturerData.miscInfo.expired}</Typography>
                      </StatItem>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledCard sx={{ background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3 }}>Device Status Details</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StatItem>
                        <Typography>Online Devices</Typography>
                        <Typography color="success.main" fontWeight="medium">
                          {manufacturerData.deviceStatusInfo.online}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12}>
                      <StatItem>
                        <Typography>Offline Today</Typography>
                        <Typography color="error">{manufacturerData.deviceStatusInfo.todayOffline}</Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12}>
                      <StatItem>
                        <Typography>Offline (7 days)</Typography>
                        <Typography color="warning.main">{manufacturerData.deviceStatusInfo.sevenDaysOffline}</Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12}>
                      <StatItem>
                        <Typography>Offline (30 days)</Typography>
                        <Typography color="warning.main">{manufacturerData.deviceStatusInfo.thirtyDaysOffline}</Typography>
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
          <Grid container spacing={3}>
            {/* Fitment Statistics */}
            <Grid item xs={12} md={8}>
              <StyledCard sx={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Fitment Statistics</Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar data={{
                      labels: ['Total Fitments', 'Monthly Fitments', 'Daily Fitments'],
                      datasets: [{
                        label: 'Fitment Stats',
                        data: [dealerData.dealerFitmentInfo.total, 
                              dealerData.dealerFitmentInfo.monthly, 
                              dealerData.dealerFitmentInfo.daily],
                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                      }]
                    }} options={barOptions} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Device Status */}
            <Grid item xs={12} md={4}>
              <StyledCard sx={{ background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Device Inventory</Typography>
                  <Box sx={{ height: 300 }}>
                    <Pie data={{
                      labels: ['Assigned', 'Stocked', 'Returned', 'Faulty'],
                      datasets: [{
                        data: [dealerData.dealerDeviceInfo.assigned,
                              dealerData.dealerDeviceInfo.stocked,
                              dealerData.dealerDeviceInfo.returned,
                              dealerData.dealerDeviceInfo.faulty],
                        backgroundColor: ['#36A2EB', '#4CAF50', '#FF6384', '#FF9800'],
                      }]
                    }} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Device Status Details */}
            <Grid item xs={12}>
              <StyledCard sx={{ background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3 }}>Device Status Details</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography>Online Devices</Typography>
                        <Typography color="success.main" fontWeight="medium">
                          {dealerData.deviceStatusInfo.online}
                        </Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography>Offline Today</Typography>
                        <Typography color="error">{dealerData.deviceStatusInfo.todayOffline}</Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography>7 Days Offline</Typography>
                        <Typography color="warning.main">{dealerData.deviceStatusInfo.sevenDaysOffline}</Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography>30 Days Offline</Typography>
                        <Typography color="warning.main">{dealerData.deviceStatusInfo.thirtyDaysOffline}</Typography>
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
          <Grid container spacing={3}>
            {/* Vehicle Statistics */}
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Vehicle Status</Typography>
                  <Box sx={{ height: 300 }}>
                    <Pie data={{
                      labels: ['Active Vehicles', 'Inactive Vehicles'],
                      datasets: [{
                        data: [ownerData.vehicleInfo.active, ownerData.vehicleInfo.inactive],
                        backgroundColor: ['#4CAF50', '#FF6384'],
                      }]
                    }} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Alert Statistics */}
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Alert Statistics</Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar data={{
                      labels: ['Total Alerts', 'Monthly Alerts', 'Daily Alerts'],
                      datasets: [{
                        label: 'Alert Stats',
                        data: [ownerData.alertInfo.total, 
                              ownerData.alertInfo.monthly, 
                              ownerData.alertInfo.daily],
                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                      }]
                    }} options={barOptions} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Device Health */}
            <Grid item xs={12}>
              <StyledCard sx={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3 }}>Device Health</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography>Activated Devices</Typography>
                        <Typography color="success.main">{ownerData.deviceHealth.activated}</Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography>Offline Devices</Typography>
                        <Typography color="error">{ownerData.deviceHealth.offline}</Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography>7 Days Offline</Typography>
                        <Typography color="warning.main">{ownerData.deviceHealth.sevenDaysOffline}</Typography>
                      </StatItem>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StatItem>
                        <Typography>30 Days Offline</Typography>
                        <Typography color="warning.main">{ownerData.deviceHealth.thirtyDaysOffline}</Typography>
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
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <Typography variant="h6" color="error">
              Invalid user role or unauthorized access
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      {renderDashboard()}
    </Box>
  );
};

export default Home;