import React from "react";
import Navbar from "../Components/Navbar";
import aboutimg from "../Images/aboutimg.jpg";
import Footer from "../Components/Footer";


const About = () => {
  return (
    <div>
      <Navbar page={"about"} />
      <div>
        <div class="py-6 sm:py-8 lg:py-12 bg-white">
          <div class="mx-auto max-w-screen-xl px-4 md:px-8 mb-20 ">
            <div class="grid gap-8 md:grid-cols-2 lg:gap-12">
              <div class="md:pt-8 lg:flex lg:flex-col lg:justify-center">
                <p class="text-center font-bold text-blue-500 md:text-left">
                  Who we are
                </p>

                <h1 class="mb-4 text-center text-2xl font-bold text-blue-800 sm:text-3xl md:mb-6 md:text-left">
                  Best Trackers and IoT Solutions
                </h1>

                <p class="mb-6 text-gray-500 sm:text-lg md:mb-8">
                  Mapwala is not just a name; it's a commitment to excellence
                  and innovation. Our robust in-house electronics design team
                  works tirelessly to create products that are not only
                  technologically advanced but also intuitive and user-friendly.
                  We pride ourselves on our ability to transform complex
                  technology into simple, accessible solutions that enhance
                  productivity, security, and convenience.
                </p>
              </div>
              <div>
                <div class="h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
                  <img
                    // src="https://images.unsplash.com/photo-1554743365-a80c1243316e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    src={aboutimg}
                    loading="lazy"
                    alt="Photo by Martin Sanchez"
                    class="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div class="md:col-span-2">
                <h2 class="mb-2 text-center text-xl font-semibold text-blue-800 sm:text-2xl md:mb-4 md:text-left">
                  About us
                </h2>

                <p class="mb-6 text-gray-500 sm:text-lg md:mb-8">
                  At Mapwala, we are dedicated to revolutionizing the way you
                  interact with technology. As a pioneering startup in the
                  design, sales, and service of Internet of Things (IoT)
                  products, we bring you cutting-edge solutions that seamlessly
                  integrate into your daily life and business operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
