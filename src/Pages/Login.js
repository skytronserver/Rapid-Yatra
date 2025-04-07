import React, { useState, useEffect } from "react";
import login2 from "../Images/login2.jpg";
import phon_image from "../Images/phon_image.jpg";
import login1 from "../Images/login1.jpg"
// import login4 from "../Images/login4.png"
import login3 from "../Images/login3.jpg"
import login5 from "../Images/login5.jpg"
import Slider from "../Components/Slider";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Screensize from "../Hooks/Screensize";
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../store/services/loginService";
import { useGenerateCaptchaQuery, useVerifyCaptchaMutation } from "../store/services/captchaService";
import { toast } from 'react-hot-toast';
import { cipherEncryption } from "../helper";

const Login = () => {
  const navigate = useNavigate();
  const screenSize = Screensize();
  const [login, { isLoading }] = useLoginMutation();
  const { data: captchaData, refetch: refetchCaptcha } = useGenerateCaptchaQuery();
  const [verifyCaptcha] = useVerifyCaptchaMutation();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    captchaReply: ''
  });
  const [captcha, setCaptcha] = useState({
    isLoaded: false,
    text: '',
    value: '',
    captchaId: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({
    phoneNumber: '',
    password: '',
    captchaReply: ''
  });

  useEffect(() => {
    if (captchaData) {
      setCaptcha({
        isLoaded: true,
        text: `data:image/png;base64,${captchaData.captcha}`,
        value: '',
        captchaId: captchaData.key
      });
    }
  }, [captchaData]);

  const fetchCaptcha = () => {
    refetchCaptcha();
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      phoneNumber: '',
      password: '',
      captchaReply: ''
    };
    
    // Phone number validation
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
      isValid = false;
    }
    
    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    // Captcha validation
    if (!formData.captchaReply.trim()) {
      newErrors.captchaReply = 'Captcha is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions to continue');
      return;
    }

    try {
      const response = await login({
        username: formData.phoneNumber,
        password: formData.password,
        captcha_key: captcha.captchaId,
        captcha_reply: formData.captchaReply
      });
      const myCipher = cipherEncryption('skytrack');
      if ('data' in response && response.data.token) {
        toast.success('OTP sent to your phone number');
        const cookiesData = `${myCipher(response.data?.user?.name)}-${myCipher(response.data?.user?.role)}-${myCipher(response.data?.user?.mobile)}`
        const skytrack_cookiesData = `${myCipher(response.data?.user?.email)}-${myCipher(response.data?.user?.role)}-${myCipher(response.data?.user?.date_joined)}-${myCipher(response.data?.user?.mobile)}`
        sessionStorage.setItem('cookiesData', cookiesData + '-' + response.data?.user?.id);
        localStorage.setItem('skytrackCookiesData', skytrack_cookiesData);
        sessionStorage.setItem('tempToken', response.data.token);
        sessionStorage.setItem('phoneNumber', formData.phoneNumber);
        navigate('/verify-otp');
      } else {
        const errorMessage = response?.data?.error || response?.error?.data?.error || 'An error occurred during login';
        toast.error(errorMessage);
        fetchCaptcha();
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      fetchCaptcha();
    }
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const images = [
    {
      imgURL: login1,
      imgAlt: "img-1",
    },
    {
      imgURL: login2,
      imgAlt: "img-2",
    },
    {
      imgURL: login3,
      imgAlt: "img-3",
    },
    {
      imgURL: login5,
      imgAlt: "img-4",
    },
    {
      imgURL: login5,
      imgAlt: "img-5",
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main container - takes full viewport height and prevents scrolling */}
      <Navbar page={"home"} />

      <div className="relative flex-1">
        {/* Content wrapper - takes remaining height after navbar */}
        {screenSize.width > 768 ? (
          <Slider className="absolute inset-0">
            {/* Background image slider - positioned absolutely to fill the container */}
            {images.map((image, index) => {
              return (
                <img
                  className="h-full w-full object-cover"
                  key={index}
                  src={image.imgURL}
                  alt={image.imgAlt}
                />
              );
            })}
          </Slider>
        ) : (
          <img
            src={phon_image}
            className="absolute h-full w-full object-cover"
            alt=""
          />
        )}

        <div className="relative h-full">
          {/* Content container - positioned relative to allow absolute positioning of children */}
          <div className="mx-auto h-full py-[2rem] sm:py-[4rem] px-2 sm:px-3 lg:px-32">
            {/* Main content wrapper - controls overall padding and height */}
            <div className="flex flex-col md:flex-row md:justify-end h-full">
              {/* Left side spacer - hidden on mobile, visible on md+ screens */}
              <div className="mb-4 w-full max-w-lg xl:mb-0 xl:w-7/12 xl:pr-6 hidden md:block">
                {/* Left side content - intentionally empty for desktop */}
              </div>
              {/* Login box container - controls width at different breakpoints */}
              <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] mx-auto md:mx-0 md:ml-4">
                {/* Login box - white background with shadow and border */}
                <div className="h-auto bg-opacity-40 overflow-hidden rounded-lg border-t-4 border-blue-600 bg-white p-2.5 sm:p-3 shadow-lg shadow-blue-300">
                  <h3 className="mb-3 text-base font-bold text-blue-900 text-center sm:text-lg">
                    Login to your Account
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label
                        htmlFor="phoneNumber"
                        className="mb-1 inline-block text-sm font-medium text-blue-900"
                      >
                        Phone Number
                      </label>
                      <input
                        placeholder="Your Phone Number"
                        required
                        type="tel"
                        className={`mb-1 h-9 w-full flex-grow appearance-none rounded border ${
                          errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                        } bg-white px-2 shadow-sm ring-blue-200 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring`}
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mb-1">{errors.phoneNumber}</p>
                      )}
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="password"
                        className="mb-1 inline-block text-sm font-medium text-blue-900"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          placeholder="Your Password"
                          required
                          type={showPassword ? "text" : "password"}
                          className={`mb-1 h-9 w-full flex-grow appearance-none rounded border ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          } bg-white px-2 pr-8 shadow-sm ring-blue-200 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring`}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs mb-1">{errors.password}</p>
                      )}
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="captchaReply"
                        className="mb-1 inline-block text-sm font-medium text-blue-900"
                      >
                        Captcha
                      </label>
                      <div className="flex flex-col sm:flex-row gap-1.5 mb-1.5">
                        <div className="bg-gray-50 p-1.5 rounded-lg border border-gray-200 flex-1 flex items-center justify-center min-h-[40px]">
                          {captcha.isLoaded ? (
                            <img src={captcha.text} alt="captcha" className="h-8 w-auto object-contain" />
                          ) : (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={fetchCaptcha}
                          className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap flex items-center justify-center gap-1 text-xs"
                          disabled={!captcha.isLoaded}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                          Refresh
                        </button>
                      </div>
                      <input
                        placeholder="Enter captcha"
                        required
                        type="text"
                        className={`mb-1 h-9 w-full flex-grow appearance-none rounded border ${
                          errors.captchaReply ? 'border-red-500' : 'border-gray-300'
                        } bg-white px-2 shadow-sm ring-blue-200 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring`}
                        name="captchaReply"
                        value={formData.captchaReply}
                        onChange={handleInputChange}
                        disabled={!captcha.isLoaded}
                      />
                      {errors.captchaReply && (
                        <p className="text-red-500 text-xs mb-1">{errors.captchaReply}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="mb-1.5 flex text-xs">
                        <input
                          type="checkbox"
                          name="accept"
                          className="mr-1.5"
                          checked={termsAccepted}
                          onChange={handleTermsChange}
                        />
                        <div className="text-gray-800">
                          <p className="text-xs">
                            I accept the{" "}
                            <a
                              href="#"
                              className="cursor-pointer text-blue-500 underline"
                            >
                              terms of use{" "}
                            </a>
                            and{" "}
                            <a
                              href="#"
                              className="cursor-pointer text-blue-500 underline"
                            >
                              privacy policy
                            </a>
                          </p>
                        </div>
                      </label>
                    </div>
                    <div className="mt-2 mb-1">
                      <button
                        type="submit"
                        className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-blue-600 px-3 font-medium tracking-wide text-white shadow-md ring-blue-200 transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
