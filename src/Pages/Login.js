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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="">
      <Navbar page={"home"} />

      <div className="relative">
        {screenSize.width > 1100 ? (
          <Slider className="">
            {images.map((image, index) => {
              return (
                <img
                  className=" "
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
            className="absolute h-screen w-full object-cover"
            alt=""
          />
        )}

        <div className="">
          <div className="relative mx-auto overflow-hidden px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="mb-12 w-full max-w-xl xl:mb-0 xl:w-7/12 xl:pr-16">

              </div>
              <div className="w-full  max-w-xl xl:w-5/12 xl:px-8">
                <div className="h-auto bg-opacity-40 overflow-hidden rounded-xl border-t-4 border-blue-600 bg-white p-7 shadow-2xl shadow-blue-300 sm:p-10">
                  <h3 className="mb-4 text-xl font-bold text-blue-900 sm:mb-4 sm:text-center sm:text-2xl">
                    Login to your Account
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4 sm:mb-4">
                      <label
                        htmlFor="phoneNumber"
                        className="mb-1 inline-block font-medium text-blue-900"
                      >
                        Phone Number
                      </label>
                      <input
                        placeholder="Your Phone Number"
                        required
                        type="tel"
                        className="mb-2 h-12 w-full flex-grow appearance-none rounded border border-gray-300 bg-white px-4 shadow-sm ring-blue-200 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4 sm:mb-4">
                      <label
                        htmlFor="password"
                        className="mb-1 inline-block font-medium text-blue-900"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          placeholder="Your Password"
                          required
                          type={showPassword ? "text" : "password"}
                          className="mb-2 h-12 w-full flex-grow appearance-none rounded border border-gray-300 bg-white px-4 pr-12 shadow-sm ring-blue-200 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    <div className="mb-4 sm:mb-4">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="bg-gray-100 p-3 rounded min-h-[60px] flex items-center justify-center">
                          {captcha.isLoaded ? (
                            <img src={captcha.text} alt="captcha" className="h-10" />
                          ) : (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={fetchCaptcha}
                          className="p-2 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-50"
                          disabled={!captcha.isLoaded}
                        >
                          ↻ Refresh
                        </button>
                      </div>
                      <input
                        placeholder="Enter captcha"
                        required
                        type="text"
                        className="mb-2 h-12 w-full flex-grow appearance-none rounded border border-gray-300 bg-white px-4 shadow-sm ring-blue-200 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring"
                        name="captchaReply"
                        value={formData.captchaReply}
                        onChange={handleInputChange}
                        disabled={!captcha.isLoaded}
                      />
                    </div>

                    <div className="mb-6">
                      <label className="mb-2 flex text-sm">
                        <input
                          type="checkbox"
                          name="accept"
                          className="mr-2"
                          checked={termsAccepted}
                          onChange={handleTermsChange}
                        />
                        <div className="text-gray-800">
                          <p className="">
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
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 font-medium tracking-wide text-white shadow-md ring-blue-200 transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring"
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
