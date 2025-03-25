import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { 
  modelExtensionInitials, 
  modelExtensionFormField 
} from '../../Components/formfeilds/tacExtension';
import { useGetModelListQuery } from '../../store/services/dropDownService';
import { useTACExtensionMutation, useCopVerifyMutation } from '../../store/services/formsService';
import toast from 'react-hot-toast';
import OTPComponent from '../../Components/OTPComponent';

const TacExtensionPage = () => {
  
  const [formValues, setFormValues] = useState(modelExtensionInitials);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [deviceId, setDeviceId] = useState('');
  
  const [tacExtension] = useTACExtensionMutation();
  const [copVerify] = useCopVerifyMutation();
  const { data: modelList, isLoading } = useGetModelListQuery()

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await copVerify({
        otp: otp,
        device_model_id: deviceId
      });
      
      if (response.data) {
        toast.success('OTP verified successfully');
        // Navigate or handle success
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('OTP verification failed');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('device_model', values.device_model);
      formData.append('cop_file', values.cop_file);
      formData.append('tac_validity', values.tacValidity);
      formData.append('cop_no', values.cop_no);
      formData.append('testAgency', values.testAgency);
      formData.append('tacNo', values.tacNo);
      formData.append('cop_validity', values.cop_validity);
      
      const response = await tacExtension(formData);
      if (response.data) {
        setDeviceId(response.data.id);
        setShowOTP(true);
        toast.success('Form submitted successfully. Please verify OTP.');
      }
    } catch (error) {
      console.error('TAC Extension error:', error);
      toast.error('TAC Extension submission failed');
    }
  };

  const formFields = Object.values(modelExtensionFormField).map(field => {
    if (field.name === 'device_model') {
      return {
        ...field,
        options: modelList ? modelList.map(model => ({
          value: model.id,
          label: model.model_name
        })) : [{ label: 'Loading...', value: '' }],
        required: true,
      };
    }
    
    return {
      ...field,
      required: true
    };
  });

  React.useEffect(() => {
    if (modelList && formValues.device_model) {
      const model = modelList.find(model => model.id === formValues.device_model);
      if (model) {
        setFormValues(prev => ({
          ...prev,
          testAgency: model.test_agency || '',
          tacNo: model.tac_no || '',
          tacValidity: model.tac_validity || ''
        }));
      }
    }
  }, [modelList, formValues.device_model]);

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
              submitText="Submit for Approval"
              title="TAC Extension Form"
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

export default TacExtensionPage; 