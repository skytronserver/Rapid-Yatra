import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { bulkInitials, bulkFormField } from '../../Components/formfeilds/bulkDevicestock';
import { useGetEsimListQuery, useGetModelListQuery } from '../../store/services/dropDownService';
import { useBulkDeviceStockMutation } from '../../store/services/formsService';
import toast from 'react-hot-toast';
import ElegantLoader from '../../Components/Loader';

const BulkDeviceStock = () => {
  const [formValues, setFormValues] = useState(bulkInitials);

  const { data: modelList } = useGetModelListQuery({ status: 'StateAdminApproved' });
  const { data: esimList } = useGetEsimListQuery();
  const [bulkDeviceStock, { isLoading: isCreating }] = useBulkDeviceStockMutation();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
    
      console.log('Form submitted:', values);
      await bulkDeviceStock(formData)
      .unwrap()
      .then((response) => {
        console.log('Success:', response);
        toast.success('Bulk Device Stock Uploaded Successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Bulk Device Stock Upload Failed');
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const formFields = Object.values(bulkFormField).map(field => {
    if (field.name === 'model_id') {
      return {
        ...field,
        options: modelList ? modelList.map(model => ({
          value: model.id,
          label: model.model_name
        })) : [{ label: 'Loading...', value: '' }],
        required: field.validation?.spec?.presence === 'required'
      };
    }
    if (field.name === 'esim_provider') {
      return {
        ...field,
        options: esimList || [{ label: 'Loading...', value: '' }],
        required: field.validation?.spec?.presence === 'required'
      };
    }
    return {
      ...field,
      required: field.validation?.spec?.presence === 'required'
    };
  });
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
          <DynamicForm
            fields={formFields}
            values={formValues}
            onChange={setFormValues}
            onSubmit={handleSubmit}
            submitText="Upload Bulk Stock"
            title="Bulk Device Stock Upload"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkDeviceStock;