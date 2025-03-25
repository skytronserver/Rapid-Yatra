import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { deviceModelFormField, deviceModelInitials } from '../../Components/formfeilds/createDeviceModel';

const CreateDeviceModel = () => {
  const [formValues, setFormValues] = useState(deviceModelInitials);

  const handleSubmit = (values) => {
    // TODO: Implement your submit logic here
    console.log('Form submitted:', values);
  };

  // Convert the form field object to an array format expected by DynamicForm
  const formFields = Object.values(deviceModelFormField).map(field => ({
    ...field,
    required: true // Since all fields have Yup validation with required()
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
            submitText="Create Device Model"
            title="Create Device Model"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDeviceModel;