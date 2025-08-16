import React from "react";
import logo from "../Images/logo.png"; 
import { Link } from "react-router-dom";

const Navbar = ({ page }) => {
  return (
    <div className="bg-white shadow-md">
      <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-3 text-[#2b0a3d] md:mx-auto md:flex-row md:items-center">
        
        {/* Logo */}
       <img className="h-10 w-36 md:h-16 md:w-40 lg:h-18 lg:w-50 object-contain" src={logo} alt="e-DISHA" />


        {/* Mobile Toggle */}
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-7 cursor-pointer md:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#2b0a3d] hover:text-[#FFD700]" 
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        {/* Navigation */}
        <nav
          aria-label="Header Navigation"
          className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-6 peer-checked:max-h-60 md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul className="flex flex-col items-center space-y-3 md:ml-auto md:flex-row md:space-y-0">
            
            <li className={`relative md:mr-12 ${page === "home" ? "text-[#FFD700] font-bold" : "hover:text-[#FFD700]"}`}>
              <Link to="/">Home</Link>
            </li>
            
            <li className={`relative md:mr-12 ${page === "about" ? "text-[#FFD700] font-bold" : "hover:text-[#FFD700]"}`}>
              <Link to="/about">About Us</Link>
            </li>
            
            <li className={`relative md:mr-12 ${page === "services" ? "text-[#FFD700] font-bold" : "hover:text-[#FFD700]"}`}>
              <Link to="/services">Products & Services</Link>
            </li>
            
            <li className={`relative md:mr-12 ${page === "contact" ? "text-[#FFD700] font-bold" : "hover:text-[#FFD700]"}`}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
