import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { deviceModelFormField, deviceModelInitials } from '../../Components/formfeilds/createDeviceModel';
import { useGetEsimListQuery } from '../../store/services/dropDownService';
import { useCreateDeviceMutation, useDeviceModelOTPVerifyMutation } from '../../store/services/formsService';
import toast from 'react-hot-toast';
import OTPComponent from '../../Components/OTPComponent';
import ElegantLoader from '../../Components/Loader';

const CreateDeviceModel = () => {
  const [formValues, setFormValues] = useState(deviceModelInitials);
  const { data: esimList, isLoading } = useGetEsimListQuery();
  const [createDeviceModel, { isLoading: isCreating }] = useCreateDeviceMutation();
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [DeviceModelOTPVerify] = useDeviceModelOTPVerifyMutation();

  const formFields = Object.values(deviceModelFormField).map(field => {
    if (field.name === 'eSimProviders') {
      return {
        ...field,
        options: esimList || [{ label: 'Loading...', value: '' }],
        required: true
      };
    }
    return {
      ...field,
      required: true
    };
  });

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleOtpSubmit = async () => {
    try {
        const response = await DeviceModelOTPVerify({
        otp: otp,
        device_model_id: deviceId
      });
      
      if (response.data) {
        toast.success('OTP verified successfully');
        setShowOTP(false);
        setFormValues(deviceModelInitials);
      } else if (response.error) {
        // Handle API error response
        console.log(response.error,"response.error");
        const errorMessage = response.error.data?.error || 'Invalid OTP. Please try again.';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('OTP verification failed. Please try again.');
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    
    Object.keys(values).forEach(key => {
      if (key === 'eSimProviders') {
        const providers = values[key] || [];
        const providerValues = Array.isArray(providers) 
          ? providers.map(provider => Number(provider.value)).filter(Boolean)
          : [];
        providerValues.forEach(value => {
          formData.append('eSimProviders', value);
        });
      } else if (key === 'tac_doc_path') {
        if (values[key]) {
          formData.append('tac_doc_path', values[key]);
        }
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      const response = await createDeviceModel(formData);
      if (response.error) {
        toast.error(response.error.data.detail);
        console.error('Error creating device model:', response.error);
      } else {
        setDeviceId(response.data.id);
        setShowOTP(true);
        toast.success('Form submitted successfully. Please verify OTP.');
        setFormValues(deviceModelInitials);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the device model');
    }
  };
  if(isCreating){
    return <ElegantLoader
     variant="circular"
     text="Loading..."
     fullScreen
     transparent
     />
  }
  return (
    <div className="p-4">
      <Card sx={{ padding: 3, borderRadius: 3 }}>
        <CardContent>
          {!showOTP ? (
            <DynamicForm
              fields={formFields}
              values={formValues}
              onChange={setFormValues}
              onSubmit={handleSubmit}
              submitText="Create Device Model"
              title="Create Device Model"
            />
          ) : (
            <OTPComponent
              otp={otp}
              handleChange={handleOtpChange}
              handleOTPSubmit={handleOtpSubmit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDeviceModel;