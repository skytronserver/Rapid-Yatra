import * as Yup from "yup";
const providerList=[]
const today = new Date().toISOString().split('T')[0];
export const deviceModelInitials = {
    eSimProviders: [],
    model_name:"",
    test_agency:"",
    tac_no:"",
    tac_validity:"",
    vendor_id:"",
    hardware_version:"",
    tac_doc_path:null,
    
};
export const deviceModelFormField = {
  eSimProviders: {
    name: "eSimProviders",
    type: "multiselect",
    label: "M2M Service Provider",
    validation: Yup.array().min(1, "At least one M2M Service Provider is required"),
    options: [{'label':'Select','value':''}]
  },
  model_name: {
    name: "model_name",
    type: "text",
    label: "Model",
    validation: Yup.string()
      .required("Model is required")
      .matches(/^[a-zA-Z0-9\s-_]+$/, "Only alphanumeric characters, spaces, hyphens and underscores are allowed")
      .min(2, "Model name must be at least 2 characters")
      .max(50, "Model name cannot exceed 50 characters")
      .trim(),
  },
  tac_no: {
    name: "tac_no",
    type: "text",
    label: "Tac No",
    validation: Yup.string()
      .required("TAC No. is required")
      .matches(/^[0-9]{8}$/, "TAC No must be exactly 8 digits")
      .trim(),
  },
  test_agency: {
    name: "test_agency",
    type: "text",
    label: "Test Agency Name",
    validation: Yup.string()
      .required("Test Agency is required")
      .matches(/^[a-zA-Z0-9\s-_]+$/, "Only alphanumeric characters, spaces, hyphens and underscores are allowed")
      .min(2, "Agency name must be at least 2 characters")
      .max(100, "Agency name cannot exceed 100 characters")
      .trim(),
  },
  tac_validity: {
    name: "tac_validity",
    type: "date",
    label: "TAC Validity",
    validation: Yup.date()
      .required("TAC Validity is required")
      .min(today, "TAC Validity date cannot be in the past"),
  },
  vendor_id: {
    name: "vendor_id",
    type: "text",
    label: "Vendor ID",
    validation: Yup.string()
      .required("Vendor ID is required")
      .matches(/^[A-Z0-9]{6,12}$/, "Vendor ID must be 6-12 characters long and contain only uppercase letters and numbers")
      .trim(),
  },
  hardware_version: {
    name: "hardware_version",
    type: "text",
    label: "Hardware Version",
    validation: Yup.string()
      .required("Hardware Version is required")
      .matches(/^[0-9.]+$/, "Hardware Version must contain only numbers and dots")
      .trim(),
  },
  tac_doc_path: {
    name: "tac_doc_path",
    type: "file",
    label: "Upload TAC",
    validation: Yup.mixed()
      .required("TAC is required")
      .test("fileType", "Only PDF and image files are allowed", (value) => {
        if (!value) return false;
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'image/jpg'
        ];
        return value && allowedTypes.includes(value.type);
      })
      .test("fileSize", "File size must be less than 10MB", (value) => {
        return value && value.size <= 10000000;
      }),
    accept: ".pdf,.jpg,.jpeg,.png",
  }
};
