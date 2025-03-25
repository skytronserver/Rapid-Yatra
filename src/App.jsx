import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Services from './Pages/Services';
import TermsCondition from './Pages/TermsCondition';
import Home from './Pages/Home';
import MainLayout from './layout/MainLayout';
import Example from './Pages/Example';
import CreateDeviceModel from './Pages/forms/CreateDeviceModel';
import TacExtensionPage from './Pages/forms/TacExtensionPage';
import DeviceStock from './Pages/forms/DeviceStock';
import AssignDevice from './Pages/forms/AssignDevice';
import BulkDeviceStock from './Pages/forms/BulkDeviceStock';
import DeviceReport from './Pages/reports/DeviceReport';
import DealerReport from './Pages/reports/DealerReport';
import AllDeviceList from './Pages/reports/AllDeviceList';
import VehicleOwnerForm from './Pages/forms/VehicleOwnerForm';
import VehicleOwnerReport from './Pages/reports/VehicleOwnerReport';
import StockReport from './Pages/reports/StockReport';
import { Toaster } from 'react-hot-toast';
const theme = createTheme({

  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#21CBF3',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Home />} />           
            <Route path="/termscondition" element={<TermsCondition />} />
            <Route path="/example" element={<Example />} />
            <Route path="/create-device-model" element={<CreateDeviceModel />} />
            <Route path="/tac-extension" element={<TacExtensionPage />} />
            <Route path="/device-stock" element={<DeviceStock />} />
            <Route path="/assign-device" element={<AssignDevice />} />
            <Route path="/bulk-device-stock" element={<BulkDeviceStock />} />
            <Route path="/reports/device" element={<DeviceReport />} />
            <Route path="/reports/dealer" element={<DealerReport />} />
            <Route path="/reports/all-devices" element={<AllDeviceList />} />
            <Route path="/vehicle-owner" element={<VehicleOwnerForm />} />
            <Route path="/vehicle-owner-report" element={<VehicleOwnerReport />} />
            <Route path="/stock-report" element={<StockReport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;   