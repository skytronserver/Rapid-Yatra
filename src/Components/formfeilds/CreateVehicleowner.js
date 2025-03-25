import * as Yup from "yup";
const currentDate = new Date();
const FILE_SIZE = 512 * 1024 ; // 512 KB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
currentDate.setFullYear(currentDate.getFullYear() + 2);
const formattedDate = currentDate.toISOString().split('T')[0];
const today = new Date().toISOString().split('T')[0];
export const ownerInitialValues = {
  name: "",
  mobile: "",
  email: "",
  dob:"",
  address: "",
  expirydate: formattedDate,
  idProofno: "",
  file_idProof: null,
};
export const vehicleOwnerField = {
  name: {
    name: "name",
    type: "text",
    label: "Name",
    validation: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .matches(/^[a-zA-Z\s]*$/, "Name should only contain letters and spaces")
      .required("Name is required"),
  },
  email: {
    name: "email",
    type: "text",
    label: "Email",
    validation: Yup.string()
      .email("Invalid email address")
      .max(100, "Email must not exceed 100 characters")
      .required("Email is required"),
  },
  mobile: {
    name: "mobile",
    type: "tel",
    label: "Mobile",
    validation: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Mobile Number must start with 6-9 and be 10 digits")
      .required("Mobile Number is required"),
  },
  dob: {
    name: "dob",
    type: "date",
    label: "Date of Birth",
    validation: Yup.date()
      .max(new Date(), "Date of Birth cannot be in the future")
      .min(new Date(1900, 0, 1), "Invalid date of birth")
      .required("Date of Birth is required"),
    maxDate: today
  },
  address: {
    name: "address",
    type: "text",
    label: "Full Address",
    validation: Yup.string().required("Full Address is required"),
  },
  expirydate: {
    name:"expirydate",
    type: "date",
    label: "Expiry Date",
    disabled:true,
    validation: Yup.date().required("Expiry Date is required"),
  },
  idProofno: {
    name: "idProofno",
    type: "text",
    label: "User ID Proof Number",
    validation: Yup.string()
      .min(5, "ID Proof Number must be at least 5 characters long")
      .max(20, "ID Proof Number must not exceed 20 characters")
      .matches(/^[A-Z0-9]*$/, "ID Proof Number should only contain uppercase letters and numbers")
      .required("User ID Proof Number is required"),
  },
  file_idProof: {
    name: "file_idProof",
    type: "file",
    label: "ID Proof",
    message: 'Only JPG, PDF, PNG files are allowed and must be below 512KB.',
    validation: Yup.mixed()
      .required("ID Proof is required")
      .test("fileSize", "File size must be less than 512KB", value => {
        if (!value) return false;
        return value.size <= FILE_SIZE;
      })
      .test("fileFormat", "Unsupported file format. Only JPG, PDF, and PNG are allowed", value => {
        if (!value) return false;
        return SUPPORTED_FORMATS.includes(value.type);
      }),
  }
};
