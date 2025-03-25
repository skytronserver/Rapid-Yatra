import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useVerifyOtpMutation, useResendOtpMutation } from "../store/services/loginService";
import { cipherEncryption } from '../helper';

const OtpVerification = () => {
  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();
  const [otp, setOtp] = useState('');
  const [remainingTime, setRemainingTime] = useState(180);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp({
        phone_number: sessionStorage.getItem('phoneNumber'),
        token: sessionStorage.getItem('tempToken'),
        otp: otp
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
        navigate('/dashboard');
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Error verifying OTP');
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <input
              type="text"
              maxLength="6"
              className="w-full p-2 border rounded"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Verify OTP
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Time remaining: {Math.floor(remainingTime / 60)}:
            {String(remainingTime % 60).padStart(2, '0')}
          </p>
          <button
            onClick={handleResendOtp}
            disabled={remainingTime > 0}
            className={`mt-2 text-blue-600 ${
              remainingTime > 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification; 