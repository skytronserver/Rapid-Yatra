import * as Yup from "yup";
export const modelExtensionInitials = {
  device_model: "",
  testAgency: "",
  tacNo: "",
  tacValidity: "",
  cop_no: "",
  cop_validity: "",
  cop_file: null,
};
export const modelExtensionFormField = {
  device_model: {
    name: "device_model",
    type: "select",
    label: "Model",
    validation: Yup.string().required("Model is required"),
    options: [],
  },
  testAgency: {
    name: "testAgency",
    type: "text",
    disabled: true,
    label: "Test Agency Name",
    validation: Yup.string().required("Test Agency is required"),
    readOnly: true,
  },
  tacNo: {
    name: "tacNo",
    type: "text",
    disabled: true,
    label: "Tac No",
    validation: Yup.string().required("TAC No. is required"),
    readOnly: true,
  },
  tacValidity: {
    name: "tacValidity",
    type: "date",
    disabled: true,
    label: "TAC Validity",
    validation: Yup.date().required("TAC Validity is required"),
    readOnly: true,
  },
  cop_no: {
    name: "cop_no",
    type: "text",
    label: "COP No",
    validation: Yup.string().required("COP No. is required"),
  },
  cop_validity: {
    name: "cop_validity",
    type: "date",
    label: "COP Validity",
    validation: Yup.date().required("COP Validity is required"),
  },
  cop_file: {
    name: "cop_file",
    type: "file",
    label: "Upload COP",
    validation: Yup.mixed()
      .required("COP file is required")
      .test("fileType", "Only PDF, DOC, DOCX, and image files are allowed", (value) => {
        if (!value) return false;
        const supportedFormats = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
          "image/jpg"
        ];
        return supportedFormats.includes(value?.type);
      })
      .test("fileSize", "File size must be less than 5MB", (value) => {
        if (!value) return false;
        return value?.size <= 5 * 1024 * 1024;
      }),
    accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  },
};
