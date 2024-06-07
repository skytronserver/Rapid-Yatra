import React from "react";
import login2 from "../Images/login2.jpg";
import phon_image from "../Images/phon_image.jpg"
import login1 from "../Images/login1.jpg"
import Slider from "../Components/Slider";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Screensize from "../Components/Hooks/Screensize";

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
  ];
  return (
    <div className="">
      <Navbar page={"home"} />

      <div class="relative">
        {screenSize.width > 1100 ? (
          <Slider class="">
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
            class="absolute h-screen w-full object-cover"
            alt=""
          />
        )}

        <div class="">
          <div class="relative mx-auto overflow-hidden px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
            <div class="flex flex-col items-center justify-between xl:flex-row">
              <div class="mb-12 w-full max-w-xl xl:mb-0 xl:w-7/12 xl:pr-16"></div>
              <div class="w-full  max-w-xl xl:w-5/12 xl:px-8">
                <div class="h-auto bg-opacity-40 overflow-hidden rounded-xl border-t-4 border-green-600 bg-white p-7 shadow-2xl shadow-green-300 sm:p-10">
                  <h3 class="mb-4 text-xl font-bold text-green-900 sm:mb-4 sm:text-center sm:text-2xl">
                    Login to your Account
                  </h3>
                  <form>
      

                    <div class="mb-4 sm:mb-4">
                      <label
                        for="email"
                        class="mb-1 inline-block font-medium text-green-900"
                      >
                        E-mail
                      </label>
                      <input
                        placeholder="Your Email"
                        required=""
                        type="text"
                        class="mb-2 h-12 w-full flex-grow appearance-none rounded border border-gray-300 bg-white px-4 shadow-sm ring-green-200 transition duration-200 focus:border-green-400 focus:outline-none focus:ring"
                        id="email"
                        name="email"
                      />
                    </div>
                    <div class="mb-4 sm:mb-4">
                      <label
                        for="password"
                        class="mb-1 inline-block font-medium text-green-900"
                      >
                        Password
                      </label>
                      <input
                        placeholder="Your Password"
                        required=""
                        type="password"
                        class="mb-2 h-12 w-full flex-grow appearance-none rounded border border-gray-300 bg-white px-4 shadow-sm ring-green-200 transition duration-200 focus:border-green-400 focus:outline-none focus:ring"
                        id="password"
                        name="password"
                      />
                    </div>
                    <div class="mb-6">
                      <label class="mb-2 flex text-sm">
                        <input
                          type="checkbox"
                          name="accept"
                          class="mr-2"
                          required=""
                        />
                        <div class="text-gray-800">
                          <p class="">
                            I accept the{" "}
                            <a
                              href="#"
                              class="cursor-pointer text-blue-500 underline"
                            >
                              terms of use{" "}
                            </a>
                            and{" "}
                            <a
                              href="#"
                              class="cursor-pointer text-blue-500 underline"
                            >
                              privacy policy
                            </a>
                          </p>
                        </div>
                      </label>
                    </div>
                    <div class="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        class="inline-flex h-12 w-full items-center justify-center rounded-xl bg-green-600 px-6 font-medium tracking-wide text-white shadow-md ring-green-200 transition duration-200 hover:bg-green-700 focus:outline-none focus:ring"
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
