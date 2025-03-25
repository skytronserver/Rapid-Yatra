import { deviceInitials, deviceFormField } from '../../Components/formfeilds/deviceStock';
import * as Yup from 'yup';
import DynamicForm from '../../Components/Form/DynamicForm';
import { Card, CardContent } from '@mui/material';
import { useGetModelListQuery } from '../../store/services/dropDownService';

const DeviceStock = () => {
  const validationSchema = Yup.object().shape(
    Object.keys(deviceFormField).reduce((acc, key) => {
      if (deviceFormField[key].validation) {
        acc[key] = deviceFormField[key].validation;
      }
      return acc;
    }, {})
  );
  const { data: modelList, isLoading } = useGetModelListQuery();
  console.log(modelList, 'modelList');
  
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form values:', values);
    setSubmitting(false);
  };
  const formFields = Object.values(deviceFormField).map(field => {
    if (field.name === 'deviceModel') {
      return {
        ...field,
        options: modelList || [{ label: 'Loading...', value: '' }],
        required: true
      };
    }
    return {
      ...field,
      required: true
    };
  });
  

  return (
    <div className="p-4">
      <Card sx={{ padding: 3, borderRadius: 3 }}>
        <CardContent>
          <DynamicForm
            initialValues={deviceInitials}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={formFields}
            submitText="Upload Stock"
            title="Device Stock Upload"
            columns={{
              default: 1,
              md: 2,
              lg: 3
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceStock;