import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useVerifyOtpMutation, useResendOtpMutation } from "../store/services/loginService";
import { cipherEncryption } from '../helper';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import logo from "../Images/logo.jpg";
import Footer from '../Components/Footer';
import { encryptWithPublicKey } from "../helper"; 

const OtpVerification = () => {
  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();
  const [otp, setOtp] = useState('');
  const [remainingTime, setRemainingTime] = useState(180);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await verifyOtp({
        phone_number: sessionStorage.getItem('phoneNumber'),
        token: sessionStorage.getItem('tempToken'),
        otp: encryptWithPublicKey(otp)
      });

      if ('data' in response && response.data.token) {
        toast.success('Login successful!');
        const myCipher = cipherEncryption('skytrack');
        
        if (response.data?.user) {
          const user = response.data.user;
          const info = response.data.info || {};

          if (user.role === 'sosexecutive') {
            const cookiesData = `${myCipher(user.name || '')}-${myCipher(info.user_type || '')}-${myCipher(user.mobile || '')}`;
            const skytrack_cookiesData = `${myCipher(user.email || '')}-${myCipher(info.user_type || '')}-${myCipher(user.date_joined || '')}-${myCipher(user.mobile || '')}`;
            
            sessionStorage.setItem('cookiesData', cookiesData + '-' + user.id);
            localStorage.setItem('skytrackCookiesData', skytrack_cookiesData);
          }
        }

        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('sessionID', Date.now().toString());
        sessionStorage.setItem('oAuthToken', response.data.token);
        navigate('/');
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Error verifying OTP');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <>
      <Box
        sx={{
          backgroundColor: '#1e293b',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img 
          src={logo} 
          alt="Mapwala" 
          style={{
            height: '2.5rem',
            width: 'auto'
          }}
        />
      </Box>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          p: { xs: 2, sm: 3 }
        }}
      >
        <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                mb: 3, 
                textAlign: 'center',
                fontWeight: 500
              }}
            >
              Verify OTP
            </Typography>

            <form onSubmit={handleVerifyOtp}>
              <TextField
                fullWidth
                type="text"
                inputProps={{ maxLength: 6 }}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: '0.95rem',
                  }
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
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
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Verify OTP'
                )}
              </Button>
            </form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
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
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default OtpVerification; 