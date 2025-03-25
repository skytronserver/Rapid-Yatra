import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { bulkInitials, bulkFormField } from '../../Components/formfeilds/bulkDevicestock';

const BulkDeviceStock = () => {
  const [formValues, setFormValues] = useState(bulkInitials);

  const handleSubmit = async (values) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      // TODO: Add your API call here
      console.log('Form submitted:', values);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Convert the form field object to an array format expected by DynamicForm
  const formFields = Object.values(bulkFormField).map(field => ({
    ...field,
    required: field.validation?.spec?.presence === 'required'
  }));

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