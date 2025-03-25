import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useResendOtpMutation } from "../store/services/loginService";
import { toast } from 'react-hot-toast';

const OTPComponent = ({ otp, handleChange, handleOTPSubmit }) => {
  const [resendOtp] = useResendOtpMutation();
  const [remainingTime, setRemainingTime] = useState(180);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResendOtp = async () => {
    if (remainingTime > 0) return;

    try {
      await resendOtp({
        phone_number: sessionStorage.getItem('phoneNumber'),
        token: sessionStorage.getItem('tempToken')
      });
      setRemainingTime(180);
      toast.success('OTP resent successfully');
    } catch (error) {
      toast.error('Error resending OTP');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        p: 3,
        maxWidth: '400px',
        margin: '0 auto'
      }}
    >
      <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
        Verify OTP
      </Typography>

      <TextField
        fullWidth
        type="text"
        inputProps={{ maxLength: 6 }}
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => handleChange(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            fontSize: '0.95rem',
          }
        }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleOTPSubmit}
        sx={{
          py: 1.25,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 400,
          borderRadius: 2,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 1
          }
        }}
      >
        Verify OTP
      </Button>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography color="text.secondary">
          Time remaining: {Math.floor(remainingTime / 60)}:
          {String(remainingTime % 60).padStart(2, '0')}
        </Typography>
        
        <Button
          onClick={handleResendOtp}
          disabled={remainingTime > 0}
          sx={{
            mt: 1,
            textTransform: 'none',
            opacity: remainingTime > 0 ? 0.5 : 1,
            cursor: remainingTime > 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Resend OTP
        </Button>
      </Box>
    </Box>
  );
};

export default OTPComponent; 