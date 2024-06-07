import React from "react";

const Footer = () => {
  return (
    <footer
      class="bg-gray-800  shadow fixed inset-x-0 bottom-0 "
    >
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-white sm:text-center ">
          ©{" "}
          <a href="#" class="hover:underline">
            PreciTrack™{" "}
          </a>
          Mapwala Private Limited
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white  sm:mt-0">
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
            Terms & Conditions
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
       
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
