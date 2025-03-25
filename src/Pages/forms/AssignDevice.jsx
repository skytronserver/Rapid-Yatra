import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { assignDeviceFormFields, assignDeviceInitials } from '../../Components/formfeilds/assignDevice';

const AssignDevice = () => {
  const [formValues, setFormValues] = useState(assignDeviceInitials);

  const handleSubmit = (values) => {
    // TODO: Implement your submit logic here
    console.log('Form submitted:', values);
  };

  // Convert the form field object to an array format expected by DynamicForm
  const formFields = Object.values(assignDeviceFormFields).map(field => ({
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
            submitText="Assign Device"
            title="Assign Device"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignDevice;