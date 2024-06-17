import React from "react";
import Navbar from "../Components/Navbar";
import aboutimg from "../Images/aboutimg.jpg";
import weoffer1 from "../Images/weoffer1.jpeg";
import weoffer2 from "../Images/weoffer2.jpeg";
import weoffer3 from "../Images/weoffer3.jpeg";
import chooosemmw1 from "../Images/choosemw1.jpeg";
import chooosemmw2 from "../Images/choosemw2.jpeg";
import background from "../Images/background.png";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    // <div style={{ backgroundImage: `url(${background})`, opacity: 0.3}}>
    <div className="bg-slate-200">
      <Navbar page={"services"} />
      {/* <section className=" py-12 sm:py-16 lg:py-20 bg-[#f7dbc0]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:text-center">
            <h2 className="text-3xl font-medium leading-7 text-blue-800 sm:text-4xl xl:text-5xl">
              What We <br className="sm:hidden" />
              Offer
            </h2>
            <hr className="mt-4 h-1 w-32 border-none bg-blue-600 sm:mx-auto sm:mt-8" />
          </div>

          <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 text-blue-800 text-center sm:grid-cols-3 sm:text-left lg:gap-0 max-w-screen-xl mx-auto">
            <div className="relative mb-3 text-left lg:px-12">
              <div className="absolute left-3 -top-4 h-16 w-16 rounded-full bg-white"></div>
              <p className="relative text-3xl font-black">
                Custom IoT Design and Solutions
              </p>
              <p className="relative mt-5">
                Our team of experienced engineers and designers specialize in
                developing bespoke IoT solutions tailored to meet your specific
                needs. From initial concept to final product, we ensure that
                every detail is meticulously crafted to deliver optimal
                performance and reliability.
              </p>
            </div>

            <div className="relative mb-3 text-left lg:px-12">
              <div className="absolute left-3 -top-4 h-16 w-16 rounded-full bg-white"></div>
              <div className="absolute bottom-0 left-0 hidden h-16 w-px lg:block"></div>
              <p className="relative text-3xl font-black">
                Sales of Cutting-Edge Products
              </p>
              <p className="relative mt-5 ">
                Explore our extensive range of IoT products designed to cater to
                a variety of applications. Whether you're looking for smart home
                devices, industrial automation solutions, or innovative consumer
                electronics, Mapwala has something for everyone.
              </p>
            </div>

            <div className="relative mb-3 text-left lg:px-12">
              <div className="absolute left-3 -top-4 h-16 w-16 rounded-full bg-white"></div>
              <div className="absolute bottom-0 left-0 hidden h-16 w-px lg:block"></div>
              <p className="relative m-0 text-3xl font-black">
                Comprehensive Service and Support
              </p>
              <p className="relative mt-5">
                At Mapwala, our commitment to you doesn't end at the point of
                sale. We offer comprehensive after-sales service and support to
                ensure your devices continue to operate at their best. Our
                dedicated customer service team is always ready to assist you
                with any questions or technical issues.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="mx-auto max-w-screen-xl py-12 text-blue-700 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* <p className="text-sm font-medium text-blue-800">INTRODUCING</p> */}
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl xl:text-5xl">
              What We Offer
            </h2>
            <hr className="mx-auto mt-4 h-2 w-32 border-none bg-blue-700" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-20 text-center sm:mx-auto sm:max-w-sm md:mt-20 md:max-w-full md:text-left">
            <div className=" ">
              <div className="m-5 flex flex-col items-center justify-center md:flex-row">
                <img
                  className="h-56 object-contain md:order-2 md:object-left"
                  src={weoffer1}
                  alt=""
                />
                <div className="">
                  <h3 className="text-4xl">Custom IoT Design</h3>
                  <p className="mt-6 text-base text-gray-500">
                    Our team of experienced engineers and designers specialize
                    in developing bespoke IoT solutions tailored to meet your
                    specific needs. From initial concept to final product, we
                    ensure that every detail is meticulously crafted to deliver
                    optimal performance and reliability.
                  </p>
                </div>
              </div>
            </div>
            <div className=" ">
              <div className="m-5 flex flex-col items-center justify-center md:flex-row ">
                <img
                  className="h-56 object-contain md:ml-0 md:object-left"
                  src={weoffer2}
                  alt=""
                />
                <div className="sm:ml-10">
                  <h3 className="text-4xl">Sales of Cutting-Edge Products</h3>
                  <p className="mt-6 text-base text-gray-500">
                    Explore our extensive range of IoT products designed to
                    cater to a variety of applications. Whether you're looking
                    for smart home devices, industrial automation solutions, or
                    innovative consumer electronics, Mapwala has something for
                    everyone.
                  </p>
                </div>
              </div>
            </div>
            <div className=" ">
              <div className="m-5 flex flex-col items-center justify-center md:flex-row ">
                <img
                  className="ml-10 h-56 object-contain md:order-2 md:object-left"
                  src={weoffer3}
                  alt=""
                />
                <div className="">
                  <h3 className="text-4xl">
                    Comprehensive Service and Support
                  </h3>
                  <p className="mt-6 text-base text-gray-500">
                    At Mapwala, our commitment to you doesn't end at the point
                    of sale. We offer comprehensive after-sales service and
                    support to ensure your devices continue to operate at their
                    best. Our dedicated customer service team is always ready to
                    assist you with any questions or technical issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl py-12 text-blue-700 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* <p className="text-sm font-medium text-blue-800">INTRODUCING</p> */}
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl xl:text-5xl">
              Why Choose Mapwala?
            </h2>
            <hr className="mx-auto mt-4 h-2 w-32 border-none bg-blue-700" />
          </div>

          <div className="agrid-rows-[repeat(2,_minmax(1px,fit-content))] mt-10 grid grid-cols-1 gap-10 text-center sm:mx-auto sm:max-w-sm md:mt-20 md:h-[68rem] md:max-w-full md:grid-cols-2 md:grid-rows-5 md:text-left">
            <div className="row-span-3 bg-blue-200 md:px-8">
              <img
                className="h mx-auto object-contain md:ml-0 mt-10"
                src={chooosemmw1}
                alt=""
              />
              <div className="mt-10">
                <h3 className="text-4xl">Innovative Solutions</h3>
                <p className="mt-6 text-base">
                  Our focus on continuous research and development ensures that
                  we stay ahead of the curve, bringing you the latest in IoT
                  technology.
                </p>
                {/* <button className="mt-4 rounded-lg bg-blue-700 px-6 py-2 text-white transition hover:translate-y-1">Learn more</button> */}
              </div>
            </div>

            <div className="row-span-2 bg-blue-200 md:flex md:flex-col md:justify-center md:px-8">
              <div className="">
                <h3 className="text-4xl">Quality Assurance</h3>
                <p className="mt-6 text-base">
                  We adhere to the highest standards of quality and reliability,
                  ensuring that our products meet and exceed your expectations.
                </p>
                {/* <button className="mt-4 rounded-lg bg-blue-700 px-6 py-2 text-white transition hover:translate-y-1">Learn more</button> */}
              </div>
            </div>

            <div className="row-span-3 bg-blue-200 md:flex md:flex-col md:justify-center md:px-8">
              <img
                className="mx-auto object-contain md:ml-0"
                src={chooosemmw2}
                alt=""
              />
              <div className="mt-10">
                <h3 className="text-4xl">Customer-Centric Approach</h3>
                <p className="mt-6 text-base">
                  Your satisfaction is our top priority. We listen to your needs
                  and provide solutions that are tailored to enhance your
                  experience.
                </p>
                {/* <button className="mt-4 rounded-lg bg-blue-700 px-6 py-2 text-white transition hover:translate-y-1">Learn more</button> */}
              </div>
            </div>

            <div className="row-span-2 bg-blue-200 md:flex md:flex-col md:justify-center md:px-8">
              <div className="">
                <h3 className="text-4xl">Expert Team</h3>
                <p className="mt-6 text-base">
                  Our in-house electronics design team is composed of seasoned
                  professionals with a passion for innovation and a track record
                  of delivering successful projects.
                </p>
                {/* <button className="mt-4 rounded-lg bg-blue-700 px-6 py-2 text-white transition hover:translate-y-1">Learn more</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="relative bg-[#f7dbc0] py-10 text-blue-900 sm:py-16 lg:py-24"> */}
      <section className="relative  py-10 text-blue-900 sm:py-16 lg:py-24">
        <div className=" mb-36  ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center ">
              <div className="mb-4 inline-flex h-12 w-12 text-blue-800 m-8">
                <svg
                  viewBox="0 0 136 217"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.6632 105.436C27.6632 105.636 24.8632 105.836 21.9632 105.936C17.4632 106.236 12.8632 106.536 8.36322 106.736C7.36322 106.836 6.46322 106.836 5.46322 106.736C1.56322 106.336 -0.636777 103.236 0.163223 99.4361C0.263223 99.0361 0.363223 98.6361 0.563223 98.3361C5.06322 86.5361 8.26322 74.4361 11.2632 62.2361C14.6632 48.7361 18.1632 35.2361 21.6632 21.8361C22.3632 19.2361 23.1632 16.6361 23.8632 14.0361C24.8632 10.5361 26.8632 8.23607 30.6632 7.83607C34.6632 7.43607 38.5632 6.73607 42.5632 6.43607C60.5632 5.33607 78.5632 3.33607 96.4632 1.23607C100.963 0.736068 105.563 0.336068 110.063 0.036068C111.663 -0.063932 113.263 0.036068 114.763 0.436068C118.563 1.33607 120.163 4.93607 118.663 8.43607C118.163 9.53607 117.463 10.5361 116.763 11.5361C114.963 14.3361 113.163 17.0361 111.463 19.8361C106.863 27.6361 102.363 35.4361 97.6632 43.1361C92.9632 50.8361 88.1632 58.5361 83.3632 66.2361C81.9632 68.4361 80.5632 70.5361 79.1632 72.6361C78.7632 73.2361 78.3632 73.9361 77.7632 74.9361C78.7632 74.9361 79.3632 74.9361 79.9632 74.9361C88.2632 75.0361 96.5632 75.0361 104.863 75.1361C105.463 75.1361 106.163 75.2361 106.763 75.3361C110.563 76.1361 112.463 79.6361 111.063 83.2361C110.563 84.5361 109.663 85.7361 108.763 86.8361C104.663 92.2361 100.463 97.5361 96.4632 103.036C94.5632 105.636 92.8632 108.536 91.3632 111.436C83.2632 126.836 75.2632 142.136 67.3632 157.636C59.1632 173.536 51.1632 189.636 43.0632 205.536C42.4632 206.736 41.7632 207.936 40.7632 208.936C38.3632 211.436 35.1632 211.236 32.6632 208.936C30.8632 207.236 29.8632 205.236 29.7632 202.836C29.4632 198.336 29.0632 193.736 29.1632 189.136C29.4632 172.736 30.0632 156.336 30.3632 139.936C30.5632 128.836 30.5632 117.736 30.6632 106.636C30.8632 106.336 30.7632 105.936 30.6632 105.436Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Join the IoT Revolution with Mapwala
              </h2>
              <p className="mt-4 text-xl font-medium">
                Discover how Mapwala can transform your world with smart,
                connected solutions. Whether you are a business looking to
                streamline operations or a tech enthusiast eager to embrace the
                future, we have the perfect IoT products and services for you.
              </p>

              <div className="sm mt-8 flex flex-col items-center justify-center sm:flex-row sm:space-x-4 sm:px-0 lg:mt-12">
                <Link
                  to="/contact"
                  className="mt-4 rounded-lg border-2 border-blue-800 bg-blue-600 px-6 py-2 font-medium text-white transition hover:translate-y-1"
                >
                  Try Now
                </Link>
                {/* <button className="mt-4 rounded-lg border-2 border-blue-800 px-6 py-2 font-medium text-blue-800 transition hover:translate-y-1">
                Choose a Plan
              </button> */}
              </div>

              <p className="mt-6 text-base ">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-blue-600 transition-all duration-200 hover:text-blue-800 hover:underline focus:text-blue-800"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
