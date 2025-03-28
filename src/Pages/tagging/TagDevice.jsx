import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import FormField from "../../ui-component/CustomTextField";
import MainCard from "../../ui-component/cards/MainCard";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  taggingFields,
  taggingInitials,
} from "../../Components/formfeilds/tagDevice";
import CustomOtpInput from "../../ui-component/CustomOtpInput";
import "./form.css";
import CustomStepper from "../../ui-component/CustomStepper";
import AutoHideAlert from "../../ui-component/AutoHideAlert";
import DisplayTable from "../../ui-component/DisplayTable";
import MapComponent from "./LiveMap";
import { 
  useFetchDeviceListFortaggingMutation,
  useFetchVehicleCategoryQuery,
  useVerifyDealerOtpMutation,
  useVerifyOwnerOtpMutation,
  useVerifyOwnerOtpFinalMutation,
  useVahanVerifyMutation,
  useLiveTrackingDataQuery,
  useTagDeviceMutation
} from "../../store/services/taggingService";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const StyledMainCard = styled(MainCard)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  padding: theme.spacing(3),
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(10px)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
  },
  transition: 'all 0.2s ease-in-out',
}));

const StepperContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  background: 'white',
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
}));

const steps = [
  { label: "Tag Device to Vehicle", name: "Step 1" },
  { label: "Dealer Verification", name: "Step 2" },
  { label: "Send Owner OTP", name: "Step 3" },
  { label: "Vehicle Owner Verification", name: "Step 4" },
  { label: "Ready for Activation", name: "Step 5" },
  { label: "Get Location", name: "Step 6" },
  { label: "Confirm Location", name: "Step 7" },
  { label: "Owner OTP Confirmation", name: "Step 8" },
];
function TagDeviceToVehicle() {
  const [updatedFormFields, setUpdatedFormField] = useState(taggingFields);
  const [deviceId, setDeviceId] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [htmlContent, setHtmlContent] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [reload, setReload] = useState(false);
  const [getMap, setGetMap] = useState({ imei: "", regno: "" });
  const [loading, setLoading] = useState({
    loader: false,
    form: false,
  });
  const [error, setError] = useState({
    normal: false,
    api: false,
  });

  const [otp, setOtp] = useState({
    dealer: "",
    owner: "",
    finalOwner: "",
  });
  const [dismissibleAlert, setDismissibleAlert] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });


  const [ownerDetails, setOwnerDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    device_ESN: "",
    ICCID: "",
    IMEI: "",
    vehicle_reg_no: "",
    vehicle_make: "",
    vehicle_model: "",
    engine_no: "",
    chassis_no: "",
    category: "",
    telecom_provider_1: "",
    telecom_provider_2: "",
    MSSISDN_1: "",
    MSSISDN_2: "",
    esim_validity: "",
    esim_provider: "",
    model: "",

  });

  const [vahanDetails, setVahanDetails] = useState({
    owner_name: "",
    email: "",
    mobile: "",
    device_serial_no: "",
    ICCID: "",
    IMEI: "",
    vehicle_reg_no: "",
    vehicle_make: "",
    vehicle_model: "",
    engine_no: "",
    chassis_no: "",
    vehicle_class: "",
    date_of_registration: "",
    device_activation_status: "",
    fitment_centre_name: "",
    GNSS_constellation_code: "",
    tac_no: "",
    tac_valid_upto: "",

  })

  const [fetchDeviceList] = useFetchDeviceListFortaggingMutation();
  const {data: categoryList} = useFetchVehicleCategoryQuery();
  const [verifyDealerOtp] = useVerifyDealerOtpMutation();
  const [verifyOwnerOtp] = useVerifyOwnerOtpMutation();
  const [verifyFinalOwnerOtp] = useVerifyOwnerOtpFinalMutation();
  const [vahanVerify] = useVahanVerifyMutation();
  const [tagDevice] = useTagDeviceMutation();
  const {data: liveTrackingData} = useLiveTrackingDataQuery(getMap, {
    skip: !getMap.imei || !getMap.regno
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchDeviceList({
          esim_status: "ESIM_Active_Confirmed",
          stock_status: "Available_for_fitting"
        }).unwrap();

        const formattedDeviceList = response?.data?.map((device) => ({
          value: device.id || device.device_id,
          label: device.device_esn || device.name,
        })) || [];

        const formattedCategoryList = categoryList?.map((category) => ({
          value: category.id,
          label: category.category,
        })) || [];

        console.log('Category List:', categoryList);
        console.log('Formatted Category List:', formattedCategoryList);

        setUpdatedFormField((prevConfig) => ({
          ...prevConfig,
          device: {
            ...prevConfig.device,
            options: formattedDeviceList,
          },
          category: {
            ...prevConfig.category,
            options: formattedCategoryList,
          },
        }));
        setLoading((prev) => ({ ...prev, form: true }));
      } catch (error) {
        console.error("Error fetching data:", error);
        setDismissibleAlert((prev) => ({
          ...prev,
          isOpen: true,
          message: "Error fetching device list",
          type: "error",
        }));
      }
    })();
    setActiveStep(0);
  }, [reload, fetchDeviceList, categoryList]);

  const handleDealerOtp = (otp) => {
    setOtp((prev) => ({ ...prev, dealer: otp }));
  };
  const handleOwnerOtp = (otp) => {
    setOtp((prev) => ({ ...prev, owner: otp }));
  };
  const handleFinalOwnerOtp = (otp) => {
    setOtp((prev) => ({ ...prev, finalOwner: otp }));
  };
  const handleOtpSubmit = async (type) => {
    setLoading((prev) => ({ ...prev, loader: true }));
    const otpData = {
      otp: otp?.[type],
      device_id: deviceId,
    };
    try {
      if (type === 'dealer') {
        await verifyDealerOtp(otpData).unwrap();
      }
      if (type === 'owner') {
        await verifyOwnerOtp(otpData).unwrap();
      }
      if (type === 'finalOwner') {
        await verifyFinalOwnerOtp(otpData).unwrap();
      }
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setDismissibleAlert(prev => ({ 
        ...prev, 
        isOpen: true, 
        message: 'OTP has been successfully verified', 
        type: 'success' 
      }));
    } catch (error) {
      setDismissibleAlert((prev) => ({
        ...prev,
        isOpen: true,
        message: "Something went wrong! Please try after sometimes or check your details",
        type: "error",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, loader: false }));
    }
  };
  const sendOwnerOtp = async (type) => {
    setLoading((prev) => ({ ...prev, loader: true }));
    const otpData = {
      device_id: deviceId,
    };
    try {
      if (type === 'owner') { await verifyOwnerOtp(otpData); }
      if (type === 'finalOwner') { await verifyFinalOwnerOtp(otpData); }
      setActiveStep(prevActiveStep => prevActiveStep + 1)
      setDismissibleAlert(prev => ({ ...prev, isOpen: true, message: 'Vehicle Owner OTP has been sent successfully', type: 'success' }));
    } catch (error) {
      console.error("Error while submitting data", error.message);
      setDismissibleAlert((prev) => ({
        ...prev,
        isOpen: true,
        message:
          "Something went wrong! Please try after sometimes or check your details",
        type: "error",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, loader: false }));
    }
  };
  const getVahanDetail = async () => {
    setLoading((prev) => ({ ...prev, loader: true }));
    try {
      const response = await vahanVerify({ device_id: deviceId }).unwrap();
      const device = response?.data?.Skytrack_data?.device || response?.Skytrack_data?.device;
      const owner = response?.data?.Skytrack_data?.vehicle_owner.users[0] || response?.Skytrack_data?.vehicle_owner.users[0];
      const vehicle = response?.data?.Skytrack_data || response?.Skytrack_data;
      
     
      const vahanData = typeof response?.data?.vahan_data === 'string' 
        ? JSON.parse(response.data.vahan_data)?.VltdDetailsDobj 
        : response?.data?.vahan_data?.VltdDetailsDobj;

      
      setGetMap((prev) => ({
        ...prev,
        regno: vehicle.vehicle_reg_no,
        imei: device.imei,
      }));
      setOwnerDetails((prev) => ({
        ...prev,
        name: owner.name,
        email: owner.email,
        mobile: owner.mobile,
        device_ESN: device.device_esn,
        ICCID: device.iccid,
        IMEI: device.imei,
        telecom_provider_1: device.telecom_provider1,
        telecom_provider_2: device.telecom_provider2,
        MSSISDN_1: device.msisdn1,
        MSSISDN_2: device.msisdn2,
        esim_validity: device.esim_validity,
        esim_provider: device.esim_provider[0],
        model: device.model,
        vehicle_reg_no: vehicle.vehicle_reg_no,
        engine_no: vehicle.engine_no,
        chassis_no: vehicle.chassis_no,
        vehicle_make: vehicle.vehicle_make,
        vehicle_model: vehicle.vehicle_model,
        category: vehicle.category,
      }));
      setVahanDetails((prev) => ({
        ...prev,
        chassis_no: vahanData?.chassisNo,
        date_of_registration: vahanData?.dateOfRegistration,
        device_activation_status: vahanData?.deviceActivationStatus,
        device_serial_no: vahanData?.deviceSerialno,
        engine_no: vahanData?.engineNo,
        fitment_centre_name: vahanData?.fitmentCentreName,
        GNSS_constellation_code: vahanData?.gnssConstellationCode,
        ICCID: vahanData?.iccId,
        IMEI: vahanData?.imeiNo,
        vehicle_make: vahanData?.makerName,
        vehicle_model: vahanData?.modelName,
        owner_name: vahanData?.ownerName,
        vehicle_reg_no: vahanData?.regnNo,
        tac_no: vahanData?.tacNo,
        tac_valid_upto: vahanData?.tacValidUpto,
        vehicle_class: vahanData?.vehClass,
      }));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setDismissibleAlert(prev => ({ ...prev, isOpen: true, message: 'Vahan Details are successfully fetched', type: 'success' }));

    } catch (error) {
      console.error("Error :", error?.message);
      let errorString = "Something went wrong! Please try after sometimes or check your details";
      if (error?.response) {
        const errorObject = error?.response?.data || '';
        errorString = errorObject !== '' && Object.values(errorObject).flat().join(" ");
      }
      setDismissibleAlert((prev) => ({
        ...prev,
        isOpen: true,
        message: errorString,
        type: "error",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, loader: false }));
    }
  };
  const retriveMapData = async () => {
    setLoading((prev) => ({ ...prev, loader: true }));
    try {
      const retriveData = await liveTrackingData(getMap).unwrap();
      console.log("Retrieved Map Data:", retriveData.data);
      setHtmlContent(retriveData.data);
      setMapLoaded(true);

      setDismissibleAlert((prev) => ({
        ...prev,
        isOpen: true,
        message: "Map Details is fetched successfully",
        type: "success",
      }));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.log("Error retrieving map data:", error);
      setDismissibleAlert((prev) => ({
        ...prev,
        isOpen: true,
        message:
          "Something went wrong! Please try after sometimes or check your details",
        type: "error",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, loader: false }));
    }
  };
  const handleFileChange = (event, formik) => {
    const selectedFile = event.target.files[0];
    const fieldName = event.target.name;
    if (selectedFile) {
      formik.setFieldValue(fieldName, selectedFile);
    }
  };

  const validationTagging = Yup.object(
    Object.keys(updatedFormFields).reduce((acc, field) => {
      acc[field] = updatedFormFields[field].validation;
      return acc;
    }, {})
  );

  const handleTagging = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setLoading((prev) => ({ ...prev, loader: true }));
    try {
      // Format the data before sending
      const formData = new FormData();
      for (const key in values) {
        if (values[key] instanceof File) {
          formData.append(key, values[key]);
        } else if (values[key] !== null && values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      }

      const response = await tagDevice(formData).unwrap();
      resetForm(taggingInitials);
      setDeviceId(response?.data?.data?.device);
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setDismissibleAlert(prev => ({ 
        ...prev, 
        isOpen: true, 
        message: 'Successfully OTP has been sent to your registered mobile number', 
        type: 'success' 
      }));
    } catch (error) {
      console.log(error);
      const errorData = error?.response?.data?.detail || error?.response?.data?.error
      const message = errorData ? "Error Details " + errorData : 'Something went wrong! Please try after sometimes or check your details';
      if (error?.message === "Network Error") {
        setError((prev) => ({ ...prev, api: true }));
      } else {
        setError((prev) => ({ ...prev, normal: true }));
      }
      setDismissibleAlert((prev) => ({
        ...prev,
        isOpen: true,
        message: message,
        type: "error",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, loader: false }));
      setSubmitting(false);
    }
  };
  const handleDismissibleAlert = () => {
    setDismissibleAlert((prev) => ({ ...prev, isOpen: false, message: "" }));
  };
  const reset = () => {
    setReload((prev) => !prev);
  };

  return (
    <Container maxWidth="xl">
      <AutoHideAlert
        open={dismissibleAlert.isOpen}
        onClose={handleDismissibleAlert}
        message={dismissibleAlert.message}
        type={dismissibleAlert.type}
      />
      
      {error.api && (
        <Alert 
          severity="error" 
          sx={{ 
            marginBottom: 2,
            borderRadius: 2,
            '& .MuiAlert-message': { fontSize: '1rem' }
          }}
        >
          <AlertTitle>Internal Server Error</AlertTitle>
          An error occurred in the server. Please contact the server administrator.
        </Alert>
      )}

      <Grid container spacing={3}>
        {loading.loader && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.8)',
              zIndex: 9999,
            }}
          >
            <CircularProgress size={60} />
          </Box>
        )}

        <Grid item xs={12}>
          <StepperContainer>
            <CustomStepper activeStep={activeStep} label={false} steps={steps} />
          </StepperContainer>
        </Grid>

        <Grid item xs={12} className={loading.loader ? "loading" : "not-loading"}>
          <StyledMainCard>
            {activeStep === 8 ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you're finished with Tagging device to
                  the vehicle receipt in the Download Receipt Tab!
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={reset}
                >
                  Finish
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 2 }} variant="h4">
                  {steps[activeStep].label}
                </Typography>
              </React.Fragment>
            )}

            {activeStep === 0 && loading.form && (
              <Formik
                initialValues={taggingInitials}
                validationSchema={validationTagging}
                onSubmit={handleTagging}
                enableReinitialize
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                      {Object.keys(updatedFormFields).map((field) => (
                        <Grid key={field} item md={6} sm={12} xs={12}>
                          <Paper 
                            elevation={0} 
                            sx={{ 
                              p: 2, 
                              borderRadius: 2,
                              border: '1px solid rgba(0,0,0,0.1)',
                              '&:hover': {
                                borderColor: 'primary.main',
                              },
                            }}
                          >
                            <FormField
                              fieldConfig={updatedFormFields[field]}
                              formik={formik}
                              handleFileChange={handleFileChange}
                            />
                          </Paper>
                        </Grid>
                      ))}
                      <Grid item xs={12} sx={{ textAlign: 'right', mt: 2 }}>
                        <StyledButton
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={loading.loader}
                        >
                          Next
                        </StyledButton>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            )}
            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    An OTP has been sent to your registered mobile number.
                    Please enter the OTP below to continue.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <CustomOtpInput
                    value={otp.dealer}
                    onChange={handleDealerOtp}
                    length={6}
                  />
                  <br />
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={() => handleOtpSubmit("dealer")}
                    disabled={otp.dealer.length !== 6}
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            )}
            {activeStep === 2 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Request OTP for Owner Verification</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Typography>
                    <Button
                      color="primary"
                      type="submit"
                      variant="contained"
                      onClick={() => sendOwnerOtp("owner")}
                    >
                      Request
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            )}
            {activeStep === 3 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    An OTP has been sent to vehicle owner mobile number. Please
                    enter the OTP below to continue.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <CustomOtpInput
                    value={otp.owner}
                    onChange={handleOwnerOtp}
                    length={6}
                  />
                  <br />
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={() => handleOtpSubmit("owner")}
                    disabled={otp.owner.length !== 6}
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            )}
            {activeStep === 4 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Click below to get details from Vahan</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <br />
                  <Typography>
                    <Button
                      color="primary"
                      type="submit"
                      variant="contained"
                      onClick={getVahanDetail}
                    >
                      Get Details
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            )}
            {activeStep === 5 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    Click below to get location of Vehicle
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <br />
                  <Typography>
                    <Button
                      color="primary"
                      type="submit"
                      variant="contained"
                      onClick={retriveMapData}
                    >
                      Get Location
                    </Button>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        borderRadius: '8px 0 0 8px',
                        border: '1px solid #f0f0f0',
                        backgroundColor: 'white'
                      }}
                    >
                      <DisplayTable
                        values={ownerDetails}
                        title="Details as in Skytron"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        borderRadius: '0 8px 8px 0',
                        border: '1px solid #f0f0f0',
                        backgroundColor: 'white'
                      }}
                    >
                      <DisplayTable
                        values={vahanDetails}
                        title="Details as in Vahan"
                      />
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            )}
            {activeStep === 6 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Request OTP for Owner Verification</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Typography>
                    <Button
                      color="primary"
                      type="submit"
                      variant="contained"
                      onClick={() => sendOwnerOtp("finalOwner")}
                    >
                      Request
                    </Button>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {mapLoaded && (
                      <MapComponent
                        gpsData={htmlContent?.data}
                        width="100%"
                        height="600px"
                      />
                  )}
                </Grid>
              </Grid>
            )}
            {activeStep === 7 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    An OTP has been sent to vehicle owner mobile number. Please
                    enter the OTP below to continue.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <CustomOtpInput
                    value={otp.finalOwner}
                    onChange={handleFinalOwnerOtp}
                    length={6}
                  />
                  <br />
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={() => handleOtpSubmit("finalOwner")}
                    disabled={otp.finalOwner.length !== 6}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            )}
          </StyledMainCard>
        </Grid>
      </Grid>
    </Container>
  );
}
export default TagDeviceToVehicle;