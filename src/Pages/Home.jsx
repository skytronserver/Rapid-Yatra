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
import { Box, Card, CardContent, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  // Demo data (replace with actual data source as needed)
  const esimInfo = {
    totalActivation: 150,
    oneYearRenewal: 45,
    twoYearRenewal: 30,
  };

  const deviceStatusInfo = {
    online: 280,
    todayOffline: 20,
    sevenDaysOffline: 35,
    thirtyDaysOffline: 50,
  };

  const miscInfo = {
    dealer: 25,
    allocated: 500,
    activation: 350,
    expired: 15,
  };

  const modelInfo = {
    model: 12,
    m2mLinked: 180,
  };

  // Data for eSIM bar chart
  const esimData = {
    labels: ['Total Activations', '1 Year Renewals', '2 Year Renewals'],
    datasets: [
      {
        label: 'eSIM Stats',
        data: [esimInfo.totalActivation, esimInfo.oneYearRenewal, esimInfo.twoYearRenewal],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  // Data for Device Status pie chart
  const deviceData = {
    labels: ['Online', 'Offline'],
    datasets: [
      {
        data: [
          deviceStatusInfo.online,
          deviceStatusInfo.todayOffline + deviceStatusInfo.sevenDaysOffline + deviceStatusInfo.thirtyDaysOffline,
        ],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // Options for bar chart to ensure y-axis starts at zero
  const barOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Large Charts Section - Top Row */}
        <Grid item xs={12} md={8}>
          <StyledCard sx={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>eSIM Status</Typography>
              <Box sx={{ height: 300 }}>
                <Bar data={esimData} options={barOptions} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard sx={{ background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Device Status</Typography>
              <Box sx={{ height: 300 }}>
                <Pie data={deviceData} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Stats Section - Bottom Row */}
        <Grid item xs={12} md={6}>
          <StyledCard sx={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>General Info</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StatItem>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Total Dealers</Typography>
                    <Typography fontWeight="medium">{miscInfo.dealer}</Typography>
                  </StatItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StatItem>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Stock Allocated</Typography>
                    <Typography fontWeight="medium">{miscInfo.allocated}</Typography>
                  </StatItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StatItem>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Total Activations</Typography>
                    <Typography fontWeight="medium">{miscInfo.activation}</Typography>
                  </StatItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StatItem>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Expired Devices</Typography>
                    <Typography color="error">{miscInfo.expired}</Typography>
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
                      {deviceStatusInfo.online}
                    </Typography>
                  </StatItem>
                </Grid>
                <Grid item xs={12}>
                  <StatItem>
                    <Typography>Offline Today</Typography>
                    <Typography color="error">{deviceStatusInfo.todayOffline}</Typography>
                  </StatItem>
                </Grid>
                <Grid item xs={12}>
                  <StatItem>
                    <Typography>Offline (7 days)</Typography>
                    <Typography color="warning.main">{deviceStatusInfo.sevenDaysOffline}</Typography>
                  </StatItem>
                </Grid>
                <Grid item xs={12}>
                  <StatItem>
                    <Typography>Offline (30 days)</Typography>
                    <Typography color="warning.main">{deviceStatusInfo.thirtyDaysOffline}</Typography>
                  </StatItem>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;