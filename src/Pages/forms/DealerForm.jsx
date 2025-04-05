import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { dealerInitialValues, dealerFormField } from '../../Components/formfeilds/createDealer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ElegantLoader from '../../Components/Loader';
// import { useCreateDealerMutation } from '../../store/services/formsService';

const DealerForm = () => {
  const [formValues, setFormValues] = useState(dealerInitialValues);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
//   const [createDealer, { isLoading }] = useCreateDealerMutation();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
      
    //   await createDealer(formData).unwrap();
      toast.success('Dealer Created Successfully');
      navigate('/dealers');
    }
    catch(error){
      console.log(error);
      toast.error('Failed to create dealer');
    } 
  }
  
  const formFields = Object.entries(dealerFormField).map(([name, field]) => {
    const fieldConfig = {
      ...field,
      name,
      required: true
    };
    
    // Add file validation parameters for file fields
    if (field.type === 'file') {
      fieldConfig.maxSize = 512 * 1024; // 512KB
      fieldConfig.formats = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
      fieldConfig.accept = ".jpg,.jpeg,.png,.pdf";
    }
    
    return fieldConfig;
  });
  if(isLoading){
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
            submitText="Register Dealer"
            title="Dealer Registration"
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerForm; 