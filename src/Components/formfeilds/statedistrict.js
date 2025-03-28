import * as Yup from "yup";

export const stateInitials = {
    state:"",
    status:"",
};
export const districtInitials={
    state:"",
    status:"",
    district:"",
    district_code:"",
}
export const stateFields = {
    state: {
    name: "state",
    type: "text",
    label: "State Name",
    validation: Yup.string().required("State name is required"),
  },
  status: {
    name: "status",
    type: "select",
    label: "Status",
    validation: Yup.string().required("Status is required"),
    options: [
        { value: "active", label: "Active" }
      ],
  },
};
export const districtFields = {
  district: {
  name: "district",
  type: "text",
  label: "District Name",
  validation: Yup.string().required("District name is required"),
},
district_code: {
  name: "district_code",
  type: "text",
  label: "District Code",
  validation: Yup.string().required("District Code is required"),
},
state: {
  name: "state",
  type: "select",
  label: "State Name",
  validation: Yup.string().required("State is required"),
  options: [],
},
status: {
  name: "status",
  type: "select",
  label: "Status",
  validation: Yup.string().required("Status is required"),
  options: [
      { value: "active", label: "Active" },
      { value: "deactive", label: "Deactive" }
    ],
},
};
