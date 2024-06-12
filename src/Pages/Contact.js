import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Contact = () => {
  return (
    <div>
      <Navbar page={"contact"} />
      <div class="font-sans text-base text-blue-700 sm:px-10  pb-14">
        <div class="text-base text-gray-700">
          <div class="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            <div class="mx-2 pt-12 text-center md:mx-auto md:w-2/3 md:pb-12">
              <h1 class="mb-4 text-3xl font-black sm:text-5xl xl:text-6xl">
                Contact us
              </h1>
              <div class="text-lg sm:text-xl xl:text-xl">
                <div class="text-gray-500">
                  <p class="mb-4">
                    Ready to take the next step? Reach out to our team for more
                    information or to discuss your project requirements. At
                    Mapwala, we are excited to partner with you on your journey
                    to a smarter, more connected world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mx-auto mb-20 flex w-full max-w-screen-lg flex-col overflow-hidden rounded-xl text-gray-700 md:flex-row md:border md:shadow-lg bg-white">
          <form class="mx-auto w-full max-w-xl border-gray-200 px-10 py-8 md:px-8">
            <div class="mb-4">
              <label class="text mb-2 block font-medium" for="email">
                Your e-mail:
              </label>
              <input
                class="w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                id="email"
                type="email"
                required=""
              />
            </div>
            <div class="mb-4">
              <label class="text mb-2 block font-medium" for="subject">
                Subject:
              </label>
              <input
                class="w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                id="subject"
                type="subject"
                required=""
              />
            </div>
            <div class="mb-4">
              <label class="text mb-2 block font-medium" for="message">
                Message:
              </label>
              <textarea
                class="h-52 w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                id="message"
                required=""
              ></textarea>
            </div>
            <div class="flex items-center">
              <div class="flex-1"></div>
              <button
                class="rounded-xl bg-blue-600 px-4 py-3 text-center font-bold text-white hover:bg-blue-700"
                type="submit"
              >
                Send message
              </button>
            </div>
          </form>
          <div class="mt-10 bg-blue-600 px-10 py-8 text-gray-100 md:mt-0 md:ml-auto">
            
            <div class="">
              <p class="mb-4 font-medium border-b  pb-2">REACH US</p>
              <p class="mb-4">Office Address:</p>
              <p class="mb-1">PreciTrack Mapwala Private Limited</p>
              <p class="mb-1">2, Civil Lines Enclave, Civil Lines</p>
              <p class="mb-4">Gurgaon 122001</p>
            
              {/* <p class="mb-4">
                Phone:
                <a href="#" class="font-semibold underline">
                  +46 (0) 10-32 32 322
                </a>
              </p> */}
              <hr class="my-2 h-0 border-t border-r-0 border-b-0 border-l-0 border-gray-300" />
              <p class="mb-4">Monday – Friday: 09:00 – 18:00</p>
              <p class="mb-4">Saturday: 08:00 - 15:00</p>
              <p class="mb-4">Sunday: Closed</p>
              <p class="mb-4">
                Email: {" "}
                <a href="#" class="font-semibold underline">
                contact@mapwala.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
