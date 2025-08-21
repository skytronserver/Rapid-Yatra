import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 shadow fixed inset-x-0 bottom-0">
      <div className="w-full mx-auto max-w-full py-1 px-3 lg:py-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center">
          © HEMRE Position System Pvt. Ltd.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
          <li>
            <Link to="/termscondition" className="hover:underline me-4 md:me-6">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link to="/termscondition" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/termscondition" className="hover:underline me-4 md:me-6">
              Licensing
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
