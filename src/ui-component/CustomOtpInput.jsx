import React, { useState, useRef } from 'react';
import { Box, TextField } from '@mui/material';

const CustomOtpInput = ({ length = 6, value = '', onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  React.useEffect(() => {
    // Update internal OTP state when value prop changes
    if (value) {
      setOtp(value.split('').concat(new Array(length - value.length).fill('')));
    }
  }, [value, length]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Call parent onChange with concatenated OTP
    const otpString = newOtp.join('');
    onChange(otpString);

    // Move to next input if current field is filled
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const pasteDataArray = pasteData.slice(0, length).split('');

    if (pasteDataArray.some(char => isNaN(char))) return;

    const newOtp = [...otp];
    pasteDataArray.forEach((value, index) => {
      if (index < length) {
        newOtp[index] = value;
      }
    });

    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Focus last filled input or first empty input
    const lastFilledIndex = Math.min(pasteDataArray.length - 1, length - 1);
    inputRefs.current[lastFilledIndex].focus();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {otp.map((digit, index) => (
        <TextField
          key={index}
          inputRef={el => inputRefs.current[index] = el}
          value={digit}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          inputProps={{
            maxLength: 1,
            style: { 
              textAlign: 'center',
              fontSize: '1.5rem',
              padding: '8px',
              width: '40px'
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '8px',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default CustomOtpInput; 