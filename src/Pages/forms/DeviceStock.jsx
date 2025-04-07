import { deviceInitials, deviceFormField } from '../../Components/formfeilds/deviceStock';
import * as Yup from 'yup';
import DynamicForm from '../../Components/Form/DynamicForm';
import { Card, CardContent } from '@mui/material';
import { useState, useEffect } from 'react';
import { useGetEsimListQuery, useGetModelListQuery } from '../../store/services/dropDownService';
import React from 'react';
import { useCreateDeviceStockMutation } from '../../store/services/formsService';
import toast from 'react-hot-toast';
import ElegantLoader from '../../Components/Loader';

const DeviceStock = () => {

  const [formValues, setFormValues] = useState(deviceInitials);


  const { data: modelList, isLoading } = useGetModelListQuery({ status: 'StateAdminApproved' })

  const { data: esimList, isLoading: esimLoading } = useGetEsimListQuery()
  const [createDevicestock, { isLoading: isCreating }] = useCreateDeviceStockMutation()

  useEffect(() => {
    if (modelList && formValues.model) {
      const selectedModel = modelList.find(model => model.id === formValues.model);
      if (selectedModel) {
        setFormValues(prev => ({
          ...prev,
          test_agency: selectedModel.test_agency || '',
          tac_no: selectedModel.tac_no || '',
          tac_validity: selectedModel.tac_validity || '',
          cop_no: selectedModel.cop_no || '',
          cop_validity: selectedModel.cop_validity || ''
        }));
      }
    }
  }, [modelList, formValues.model]);

  const validationSchema = Yup.object().shape(
    Object.keys(deviceFormField).reduce((acc, key) => {
      if (deviceFormField[key].validation) {
        acc[key] = deviceFormField[key].validation;
      }
      return acc;
    }, {})
  );

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Append all form values to FormData
    Object.keys(values).forEach(key => {
      if (values[key] !== null && values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    });

    await createDevicestock(formData)
      .unwrap()
      .then((response) => {
        console.log('Success:', response);
        toast.success('Device Stock Uploaded Successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Device Stock Upload Failed');
      });
  };

  const formFields = Object.values(deviceFormField).map(field => {
    const disabledFields = ['test_agency', 'tac_no', 'tac_validity', 'cop_no', 'cop_validity'];

    if (field.name === 'model') {
      return {
        ...field,
        options: modelList ? modelList.map(model => ({
          value: model.id,
          label: model.model_name
        })) : [{ label: 'Loading...', value: '' }],
        required: true,
      };
    }
    if (field.name === 'esim_provider') {
      return {
        ...field,
        options: esimList || [{ label: 'Loading...', value: '' }],
        required: true,
      };
    }
    if (disabledFields.includes(field.name)) {
      return {
        ...field,
        // required: true,
        disabled: true
      };
    }

    return {
      ...field,
      required: true
    };
  });

  if(isLoading || esimLoading || isCreating){
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
          <DynamicForm
            initialValues={deviceInitials}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={formFields}
            values={formValues}
            onChange={setFormValues}
            submitText="Upload Stock"
            title="Device Stock Upload"
            columns={{
              default: 1,
              md: 2,
              lg: 3
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceStock;