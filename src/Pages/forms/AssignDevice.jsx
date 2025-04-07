import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DynamicForm from '../../Components/Form/DynamicForm';
import { assignDeviceFormFields, assignDeviceInitials } from '../../Components/formfeilds/assignDevice';
import { useGetDealerListQuery, useGetDeviceStockListQuery } from '../../store/services/dropDownService';
import { useAssignDeviceMutation } from '../../store/services/formsService';
import { toast } from 'react-hot-toast';
import ElegantLoader from '../../Components/Loader';

const AssignDevice = () => {
  const [formValues, setFormValues] = useState(assignDeviceInitials);

  const { data: dealerList, isLoading: isDealerLoading, error: dealerError } = useGetDealerListQuery();
  const { data: modelListResponse, isLoading: isModelLoading, error: modelError } = useGetDeviceStockListQuery({
    stock_status: "NotAssigned"
  });
  const [assignDevice] = useAssignDeviceMutation();

  const modelList = modelListResponse?.data || [];

  const formFields = Object.values(assignDeviceFormFields).map(field => {
    if (field.name === 'device') {
      return {
        ...field,
        options: modelList.length > 0 && !isModelLoading 
          ? modelList.map(model => ({
              value: model.id,
              label: model.imei
            }))
          : [{ label: isModelLoading ? 'Loading...' : 'No devices available', value: '' }],
        required: true,
        disabled: isModelLoading || !!modelError,
      };
    }
    if (field.name === 'dealer') {
      return {
        ...field,
        options: dealerList && !isDealerLoading
          ? dealerList.map(dealer => ({
              value: dealer.id,
              label: dealer.company_name
            }))
          : [{ label: isDealerLoading ? 'Loading...' : 'No dealers available', value: '' }],
        required: true,
        disabled: isDealerLoading || !!dealerError,
      };
    }
    return field;
  });

  const handleSubmit = async (values) => {
    try {
      const data = {
        "dealer":values.dealer,
        "device":values.device,
        "shipping_remark":values.shipping_remark
      }
      const response = await assignDevice(data).unwrap();
      console.log(response,"response");
      toast.success('Device assigned successfully');
      setFormValues(assignDeviceInitials);
    } catch (error) {
      console.error('Error assigning device:', error);
      toast.error(error.data?.message || 'Failed to assign device');
    }
  };

  if(isDealerLoading || isModelLoading){
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
            submitText="Assign Device"
            title="Assign Device"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignDevice;