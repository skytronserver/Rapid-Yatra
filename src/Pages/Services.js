import React from "react";
import Navbar from "../Components/Navbar";
import bgImg from "../Images/bgImg.jpg";
import Footer from "../Components/Footer";
import { AiFillAndroid } from "react-icons/ai";

const Services = () => {
  return (
    <div>
      <Navbar page={"services"} />
      <section class=" py-12 sm:py-16 lg:py-20 bg-[#f7dbc0]">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <div class="sm:text-center">
            <h2 class="text-3xl font-medium leading-7 text-green-950 sm:text-4xl xl:text-5xl">
              What We <br class="sm:hidden" />
              Offer
            </h2>
            <hr class="mt-4 h-1 w-32 border-none bg-green-950 sm:mx-auto sm:mt-8" />
          </div>

          <div class="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 text-green-950 text-center sm:grid-cols-3 sm:text-left lg:gap-0 max-w-screen-xl mx-auto">
            <div class="relative mb-3 text-left lg:px-12">
              <div class="absolute left-3 -top-4 h-16 w-16 rounded-full bg-white"></div>
              <p class="relative text-3xl font-black">
                Custom IoT Design and Solutions
              </p>
              <p class="relative mt-5">
                Our team of experienced engineers and designers specialize in
                developing bespoke IoT solutions tailored to meet your specific
                needs. From initial concept to final product, we ensure that
                every detail is meticulously crafted to deliver optimal
                performance and reliability.
              </p>
            </div>

            <div class="relative mb-3 text-left lg:px-12">
              <div class="absolute left-3 -top-4 h-16 w-16 rounded-full bg-white"></div>
              <div class="absolute bottom-0 left-0 hidden h-16 w-px lg:block"></div>
              <p class="relative text-3xl font-black">
                Sales of Cutting-Edge Products
              </p>
              <p class="relative mt-5 ">
                Explore our extensive range of IoT products designed to cater to
                a variety of applications. Whether you're looking for smart home
                devices, industrial automation solutions, or innovative consumer
                electronics, Mapwala has something for everyone.
              </p>
            </div>

            <div class="relative mb-3 text-left lg:px-12">
              <div class="absolute left-3 -top-4 h-16 w-16 rounded-full bg-white"></div>
              <div class="absolute bottom-0 left-0 hidden h-16 w-px lg:block"></div>
              <p class="relative m-0 text-3xl font-black">
                Comprehensive Service and Support
              </p>
              <p class="relative mt-5">
                At Mapwala, our commitment to you doesn't end at the point of
                sale. We offer comprehensive after-sales service and support to
                ensure your devices continue to operate at their best. Our
                dedicated customer service team is always ready to assist you
                with any questions or technical issues.
              </p>
            </div>
          </div>
        </div>
      </section>

 

      <section class="bg-[#f7dbc0] text-green-800  py-10 sm:py-16 lg:py-24">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div class="sm:text-center">
            <h2 class="text-3xl font-medium leading-7 text-green-950 sm:text-4xl xl:text-5xl">
              Why Choose <br class="sm:hidden" />
              Mapwala?
            </h2>
            <hr class="mt-4 h-1 w-32 border-none bg-green-950 sm:mx-auto sm:mt-8" />
          </div>

          <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:mt-16">
            <div class="relative overflow-hidden bg-white">
              <div class="px-6 py-10">
                <div class="flex items-center">
                  <h3 class="relative inline-block text-3xl font-bold leading-none">
                    <span class="bg-[#99d7d4] absolute -top-4 h-2 w-full"></span>
                    Innovative Solutions
                  </h3>
                </div>
                <p class="mt-6 text-base md:max-w-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  in architecto explicabo aut, adipisci sed.
                </p>
              </div>
            </div>

            <div class="relative overflow-hidden bg-white">
              <div class="px-6 py-10">
                <div class="flex items-center">
                  <h3 class="relative inline-block text-3xl font-bold leading-none">
                    <span class="bg-[#99d7d4] absolute -top-4 h-2 w-full"></span>
                    Quality Assurance
                  </h3>
                </div>
                <p class="mt-6 text-base md:max-w-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  in architecto explicabo aut, adipisci sed.
                </p>
              </div>
            </div>

            <div class="relative overflow-hidden bg-white">
              <div class="px-6 py-10">
                <div class="flex items-center">
                  <h3 class="relative inline-block text-3xl font-bold leading-none">
                    <span class="bg-[#99d7d4] absolute -top-4 h-2 w-full"></span>
                    Customer-Centric Approach
                  </h3>
                </div>
                <p class="mt-6 text-base md:max-w-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  in architecto explicabo aut, adipisci sed.
                </p>
              </div>
            </div>
            <div class="relative overflow-hidden bg-white">
              <div class="px-6 py-10">
                <div class="flex items-center">
                  <h3 class="relative inline-block text-3xl font-bold leading-none">
                    <span class="bg-[#99d7d4] absolute -top-4 h-2 w-full"></span>
                    Expert Team
                  </h3>
                </div>
                <p class="mt-6 text-base md:max-w-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  in architecto explicabo aut, adipisci sed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
