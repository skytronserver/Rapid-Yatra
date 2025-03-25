import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { deviceModelFormField, deviceModelInitials } from '../../Components/formfeilds/createDeviceModel';
import { useGetEsimListQuery } from '../../store/services/dropDownService';
import { useCreateDeviceMutation } from '../../store/services/formsService';
import toast from 'react-hot-toast';
const CreateDeviceModel = () => {
  const [formValues, setFormValues] = useState(deviceModelInitials);
  const { data: esimList, isLoading } = useGetEsimListQuery();
  const [createDeviceModel, { isLoading: isCreating }] = useCreateDeviceMutation();

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
        toast.success('Device model created successfully');
        setFormValues(deviceModelInitials);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the device model');
    }
  };

  return (
    <div className="p-4">
      <Card sx={{ padding: 3, borderRadius: 3 }}>
        <CardContent>
          <DynamicForm
            fields={formFields}
            values={formValues}
            onChange={setFormValues}
            onSubmit={handleSubmit}
            submitText="Create Device Model"
            title="Create Device Model"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDeviceModel;