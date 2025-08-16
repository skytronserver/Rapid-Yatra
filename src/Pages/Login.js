import React, { useState, useEffect } from "react";
import login2 from "../Images/login2.jpg";
import phon_image from "../Images/phon_image.jpg";
import login1 from "../Images/login1.jpg";
import login3 from "../Images/login3.jpg";
import login5 from "../Images/login5.jpg";
import Slider from "../Components/Slider";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Screensize from "../Hooks/Screensize";
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../store/services/loginService";
import { useGenerateCaptchaQuery, useVerifyCaptchaMutation } from "../store/services/captchaService";
import { Alert } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { cipherEncryption } from "../helper";

const Login = () => {
  const navigate = useNavigate();
  const screenSize = Screensize();
  const [login, { isLoading }] = useLoginMutation();
  const { data: captchaData, refetch: refetchCaptcha } = useGenerateCaptchaQuery();
  const [verifyCaptcha] = useVerifyCaptchaMutation();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ phoneNumber: '', password: '', captchaReply: '' });
  const [captcha, setCaptcha] = useState({ isLoaded: false, text: '', value: '', captchaId: null });
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({ phoneNumber: '', password: '', captchaReply: '' });

  useEffect(() => {
    if (captchaData) {
      setCaptcha({ isLoaded: true, text: `data:image/png;base64,${captchaData.captcha}`, value: '', captchaId: captchaData.key });
    }
  }, [captchaData]);

  const fetchCaptcha = () => refetchCaptcha();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { phoneNumber: '', password: '', captchaReply: '' };
    if (!/^\d{10}$/.test(formData.phoneNumber)) { newErrors.phoneNumber = 'Phone number must be 10 digits'; isValid = false; }
    if (formData.password.length < 6) { newErrors.password = 'Password must be at least 6 characters'; isValid = false; }
    if (!formData.captchaReply.trim()) { newErrors.captchaReply = 'Captcha is required'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const renderAlert = (success, message) => {
    if (!message) return null;
    return <Alert variant="filled" severity={success ? "success" : "error"} sx={{ mt: 2 }}>{message}</Alert>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!termsAccepted) { setIsSuccess(false); setMessage('Please accept the terms and conditions'); return; }

    try {
      const response = await login({
        username: formData.phoneNumber,
        password: formData.password,
        captcha_key: captcha.captchaId,
        captcha_reply: formData.captchaReply
      });
      const myCipher = cipherEncryption('skytrack');
      if ('data' in response && response.data.token) {
        setIsSuccess(true);
        const cookiesData = `${myCipher(response.data?.user?.name)}-${myCipher(response.data?.user?.role)}-${myCipher(response.data?.user?.mobile)}`;
        const skytrack_cookiesData = `${myCipher(response.data?.user?.email)}-${myCipher(response.data?.user?.role)}-${myCipher(response.data?.user?.date_joined)}-${myCipher(response.data?.user?.mobile)}`;
        sessionStorage.setItem('cookiesData', cookiesData + '-' + response.data?.user?.id);
        localStorage.setItem('skytrackCookiesData', skytrack_cookiesData);
        sessionStorage.setItem('tempToken', response.data.token);
        sessionStorage.setItem('phoneNumber', formData.phoneNumber);
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('sessionID', Date.now().toString());
        sessionStorage.setItem('oAuthToken', response.data.token);
        navigate('/');
      } else {
        const errorMessage = response?.data?.error || response?.error?.data?.error || 'Login failed';
        setIsSuccess(false); setMessage(errorMessage); fetchCaptcha();
      }
    } catch (error) { setIsSuccess(false); setMessage('Login error'); fetchCaptcha(); }
  };

  const handleTermsChange = (e) => setTermsAccepted(e.target.checked);

  const images = [login1, login2, login3, login5];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar page={"home"} />
      <div className="relative flex-1">
        {screenSize.width > 768 ? (
          <Slider className="absolute inset-0">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`slider-${i}`}
                className="h-full w-full object-cover filter brightness-110"
              />
            ))}
          </Slider>
        ) : (
          <img
            src={phon_image}
            className="absolute h-full w-full object-cover filter brightness-110"
            alt=""
          />
        )}

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-32">
          <div className="w-full max-w-md backdrop-blur-md bg-white/25 rounded-2xl p-8 shadow-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Login to Your Account</h3>
            <form onSubmit={handleSubmit}>
              {/* Phone */}
              <div className="mb-4">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className={`w-full p-3 rounded-lg border ${errors.phoneNumber ? 'border-red-400' : 'border-gray-300'} bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              {/* Password */}
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={`w-full p-3 rounded-lg border ${errors.password ? 'border-red-400' : 'border-gray-300'} bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-gray-900">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Captcha */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  {captcha.isLoaded ? (
                    <img src={captcha.text} alt="captcha" className="h-10" />
                  ) : (
                    <div className="animate-spin h-10 w-10 border-b-2 border-gray-500 rounded-full"></div>
                  )}
                  <button type="button" onClick={fetchCaptcha} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700">Refresh</button>
                </div>
                <input
                  type="text"
                  name="captchaReply"
                  value={formData.captchaReply}
                  onChange={handleInputChange}
                  placeholder="Enter Captcha"
                  className={`w-full p-3 rounded-lg border ${errors.captchaReply ? 'border-red-400' : 'border-gray-300'} bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                />
                {errors.captchaReply && <p className="text-red-500 text-xs mt-1">{errors.captchaReply}</p>}
              </div>

              {/* Terms */}
              <div className="mb-4 flex items-center text-gray-800 text-sm">
                <input type="checkbox" checked={termsAccepted} onChange={handleTermsChange} className="mr-2" />
                I accept the <a href="/termscondition" className="underline text-gray-900">Terms</a> and <a href="/termscondition" className="underline text-gray-900">Privacy Policy</a>
              </div>

              <button type="submit" disabled={isLoading} className="w-full py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
                {isLoading ? "Authenticating..." : "Login"}
              </button>
              {renderAlert(isSuccess, message)}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
