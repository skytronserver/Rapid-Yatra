import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { 
  modelExtensionInitials, 
  modelExtensionFormField 
} from '../../Components/formfeilds/tacExtension';

const TacExtensionPage = () => {
  const [formValues, setFormValues] = useState(modelExtensionInitials);

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    // Handle form submission logic here
  };

  // Convert the form field object to an array format expected by DynamicForm
  const formFields = Object.entries(modelExtensionFormField).map(([key, field]) => ({
    ...field,
    name: key,
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
            submitText="Submit TAC Extension"
            title="TAC Extension Form"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TacExtensionPage; 