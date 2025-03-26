import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { assignDeviceFormFields, assignDeviceInitials } from '../../Components/formfeilds/assignDevice';
import { useGetDealerListQuery, useGetDeviceStockListQuery } from '../../store/services/dropDownService';

const AssignDevice = () => {
  const [formValues, setFormValues] = useState(assignDeviceInitials);

  const {data:dealerList}=useGetDealerListQuery();
  const {data:modelList}=useGetDeviceStockListQuery({stock_status:"NotAssigned"});


  const formFields = Object.values(assignDeviceFormFields).map(field => ({
    ...field,
    required: field.validation?.spec?.presence === 'required',
    ...(field.name === 'dealer_id' && {
      options: dealerList?.map(dealer => ({
        value: dealer.id,
        label: dealer.company_name
      })) || []
    }),
    ...(field.name === 'model_id' && {
      options: modelList?.map(device => ({
        value: device.model.id,
        label: device.model.model_name
      })) || []
    })
  }));

  console.log(modelList);
  console.log(dealerList);

  const handleSubmit = (values) => {
    // TODO: Implement your submit logic here
    console.log('Form submitted:', values);
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
            submitText="Assign Device"
            title="Assign Device"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignDevice;