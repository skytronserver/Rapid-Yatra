import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { ownerInitialValues, vehicleOwnerField } from '../../Components/formfeilds/CreateVehicleowner';
import { useNavigate } from 'react-router-dom';

const VehicleOwnerForm = () => {
  const [formValues, setFormValues] = useState(ownerInitialValues);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      console.log('Form submitted:', values);
      navigate('/vehicle-owners');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const formFields = Object.entries(vehicleOwnerField).map(([name, field]) => ({
    ...field,
    name,
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
            submitText="Register Vehicle Owner"
            title="Vehicle Owner Registration"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleOwnerForm; 