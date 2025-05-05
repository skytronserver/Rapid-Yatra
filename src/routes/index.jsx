import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from '../Pages/Login';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Services from '../Pages/Services';
import TermsCondition from '../Pages/TermsCondition';
import Home from '../Pages/Home';
import MainLayout from '../layout/MainLayout';
import Example from '../Pages/Example';
import CreateDeviceModel from '../Pages/forms/CreateDeviceModel';
import TacExtensionPage from '../Pages/forms/TacExtensionPage';
import DeviceStock from '../Pages/forms/DeviceStock';
import AssignDevice from '../Pages/forms/AssignDevice';
import BulkDeviceStock from '../Pages/forms/BulkDeviceStock';
import DeviceReport from '../Pages/reports/DeviceReport';
import DealerReport from '../Pages/reports/DealerReport';
import AllDeviceList from '../Pages/reports/AllDeviceList';
import VehicleOwnerForm from '../Pages/forms/VehicleOwnerForm';
import VehicleOwnerReport from '../Pages/reports/VehicleOwnerReport';
import StockReport from '../Pages/reports/StockReport';
import TagDevice from '../Pages/tagging/TagDevice';
import OtpVerification from '../Pages/OtpVerification';
import HistoryPlayback from '../Pages/location based/HistoryPlayback';
import LiveTracking from '../Pages/location based/LiveTracking';
import RouteFixing from '../Pages/location based/RouteFixing';
import RequestEsimActivition from '../Pages/dealer/RequestEsimActivition';
import UntagDevice from '../Pages/tagging/UntagDevice';
import ProtectedRoute from '../Hooks/ProtectedRoute';
import StateDistrictManagement from '../Pages/StateDistrictManagement';
import DealerForm from '../Pages/forms/DealerForm';
import Trip from '../Pages/Trip';

const AppRoutes = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            maxWidth: '400px',
          },
          success: {
            iconTheme: {
              primary: '#4CAF50',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f44336',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/termscondition" element={<TermsCondition />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['devicemanufacture', 'dealer', 'owner']}>
              <Home />
            </ProtectedRoute>
          } />           
          <Route path="/example" element={<Example />} />
          <Route path="/create-device-model" element={
            <ProtectedRoute allowedRoles={['devicemanufacture']}>
              <CreateDeviceModel />
            </ProtectedRoute>
          } />
          <Route path="/tac-extension" element={
            <ProtectedRoute allowedRoles={['devicemanufacture']}>
              <TacExtensionPage />
            </ProtectedRoute>
          } />
          <Route path="/device-stock" element={
            <ProtectedRoute allowedRoles={['devicemanufacture']}>
              <DeviceStock />
            </ProtectedRoute>
          } />
          <Route path="/assign-device" element={
            <ProtectedRoute allowedRoles={['devicemanufacture']}>
              <AssignDevice />
            </ProtectedRoute>
          } />
          <Route path="/bulk-device-stock" element={
            <ProtectedRoute allowedRoles={['devicemanufacture']}>
              <BulkDeviceStock />
            </ProtectedRoute>
          } />
          <Route path="/reports/device" element={
            <ProtectedRoute allowedRoles={['devicemanufacture']}>
              <DeviceReport />
            </ProtectedRoute>
          } />
          <Route path="/reports/dealer" element={
            <ProtectedRoute allowedRoles={['dealer']}>
              <DealerReport />
            </ProtectedRoute>
          } />
          <Route path="/reports/all-devices" element={
            <ProtectedRoute allowedRoles={['devicemanufacture']}>
              <AllDeviceList />
            </ProtectedRoute>
          } />
          <Route path="/vehicle-owner" element={
            <ProtectedRoute allowedRoles={['dealer']}>
              <VehicleOwnerForm />
            </ProtectedRoute>
          } />
          <Route path="/vehicle-owner-report" element={
            <ProtectedRoute allowedRoles={['dealer']}>
              <VehicleOwnerReport />
            </ProtectedRoute>
          } />
          <Route path="/stock-report" element={
            <ProtectedRoute allowedRoles={['devicemanufacture']}>
              <StockReport />
            </ProtectedRoute>
          } />
          <Route path="/tag-device" element={
            <ProtectedRoute allowedRoles={['dealer']}>
              <TagDevice />
            </ProtectedRoute>
          } />
          <Route path="/history-playback" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <HistoryPlayback />
            </ProtectedRoute>
          } />
          <Route path="/live-tracking" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <LiveTracking />
            </ProtectedRoute>
          } />
          <Route path="/route-fixing" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <RouteFixing />
            </ProtectedRoute>
          } />
          <Route path="/request-esim-activation" element={
            <ProtectedRoute allowedRoles={['dealer']}>
              <RequestEsimActivition />
            </ProtectedRoute>
          } />
          <Route path="/untag-device" element={
            <ProtectedRoute allowedRoles={['dealer']}>
              <UntagDevice />
            </ProtectedRoute>
          } />
          <Route path="/state-district-management" element={
            <ProtectedRoute allowedRoles={['devicemanufacture']}>
              <StateDistrictManagement />
            </ProtectedRoute>
          } />
          <Route path="/create-dealer" element={
            <ProtectedRoute allowedRoles={['devicemanufacture']}>
              <DealerForm />
            </ProtectedRoute>
          } />
          <Route path="/trip" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <Trip />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes; 