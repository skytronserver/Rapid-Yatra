import React from "react";
import login2 from "../Images/login2.jpg";
import phon_image from "../Images/phon_image.jpg";
import login1 from "../Images/login1.jpeg";
// import login4 from "../Images/login4.png"
import login3 from "../Images/login3.jpg"
import login5 from "../Images/login5.png"
import Slider from "../Components/Slider";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Screensize from "../Components/Hooks/Screensize";
// import { Link } from "react-router-dom";

const Login = () => {
  const screenSize = Screensize();
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
    // {
    //   imgURL: login5,
    //   imgAlt: "img-5",
    // },
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
                {/* <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
                Welcome to Mapwala
                </h2> */}
                {/* <p className="mb-4 max-w-xl text-base text-gray-200 md:text-lg">
                  Your Trusted Partner in Innovative IoT Solutions
                </p> */}
                {/* <Link
                  to="/services"
                  aria-label=""
                  className="inline-flex items-center font-semibold tracking-wider text-blue-700 transition-colors duration-200 hover:text-blue-600"
                >
                  Learn more
                  <svg
                    className="ml-2 inline-block w-3"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path>
                  </svg>
                </Link> */}
              </div>
              <div className="w-full  max-w-xl xl:w-5/12 xl:px-8">
                <div className="h-auto bg-opacity-40 overflow-hidden rounded-xl border-t-4 border-blue-600 bg-white p-7 shadow-2xl shadow-blue-300 sm:p-10">
                  <h3 className="mb-4 text-xl font-bold text-blue-900 sm:mb-4 sm:text-center sm:text-2xl">
                    Login to your Account
                  </h3>
                  <form>
                    <div className="mb-4 sm:mb-4">
                      <label
                        for="email"
                        className="mb-1 inline-block font-medium text-blue-900"
                      >
                        E-mail
                      </label>
                      <input
                        placeholder="Your Email"
                        required=""
                        type="text"
                        className="mb-2 h-12 w-full flex-grow appearance-none rounded border border-gray-300 bg-white px-4 shadow-sm ring-blue-200 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring"
                        id="email"
                        name="email"
                      />
                    </div>
                    <div className="mb-4 sm:mb-4">
                      <label
                        for="password"
                        className="mb-1 inline-block font-medium text-blue-900"
                      >
                        Password
                      </label>
                      <input
                        placeholder="Your Password"
                        required=""
                        type="password"
                        className="mb-2 h-12 w-full flex-grow appearance-none rounded border border-gray-300 bg-white px-4 shadow-sm ring-blue-200 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring"
                        id="password"
                        name="password"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="mb-2 flex text-sm">
                        <input
                          type="checkbox"
                          name="accept"
                          className="mr-2"
                          required=""
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
