import * as Yup from "yup";
let modelList=[{value:'',label:'Waiting for Models'}];
let providerList=[{value:'',label:'Waitinf for Provider'}];
export const bulkInitials = {
    model_id:"",
    esim_provider:"",
    excel_file:null,
    
};
export const bulkFormField = {
  model_id: {
    name: "model_id",
    type: "select",
    label: "Model Name",
    validation: Yup.string().required("Model is required").trim(),
    options: modelList,
  },
  esim_provider: {
    name: "esim_provider",
    type: "select",
    label: "eSIM Provider",
    validation: Yup.string().required("eSIM Provider is required").trim(),
    options: providerList
  },
  excel_file: {
    name: "excel_file",
    type: "file",
    label: "Select the Excel File",
    validation: Yup.mixed()
      .required("Excel File is required")
      .test("fileType", "Only Excel files are allowed", (value) => {
        if (!value) return false;
        const allowedTypes = [
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        return value && allowedTypes.includes(value.type);
      })
      .test("fileSize", "File size must be less than 5MB", (value) => {
        return value && value.size <= 5000000;
      }),
    accept: ".xlsx,.xls",
  }
}