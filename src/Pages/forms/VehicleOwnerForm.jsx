import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { ownerInitialValues, vehicleOwnerField } from '../../Components/formfeilds/CreateVehicleowner';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCreateVehicleownerMutation } from '../../store/services/formsService';

const VehicleOwnerForm = () => {
  const [formValues, setFormValues] = useState(ownerInitialValues);
  const navigate = useNavigate();
  const [createVehicleowner, { isLoading }] = useCreateVehicleownerMutation();

  const handleSubmit = async (values) => {
    try {
      console.log('File value:', values.file_idProof);  
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
      await createVehicleowner(formData).unwrap();
      toast.success('Vehicle Owner Created Successfully');
      setFormValues(ownerInitialValues);
    }
    catch(error){
      console.log(error);
    } 
  }
  

  const formFields = Object.entries(vehicleOwnerField).map(([name, field]) => {
    const fieldConfig = {
      ...field,
      name,
      required: field.validation?.spec?.presence === 'required'
    };
    
    // Add file validation parameters for file_idProof
    if (name === 'file_idProof') {
      fieldConfig.maxSize = 512 * 1024; // 512KB
      fieldConfig.formats = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
      fieldConfig.accept = ".jpg,.jpeg,.png,.pdf";
    }
    
    return fieldConfig;
  });

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