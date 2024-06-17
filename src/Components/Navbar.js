import React from "react";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";

const Navbar = ({ page }) => {
  return (
    <div className="bg-slate-800">
      <header class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-white md:mx-auto md:flex-row md:items-center">
        <img className="h-16" src={logo} alt={"Mapwala"} />
        <input type="checkbox" class="peer hidden" id="navbar-open" />
        <label
          class="absolute top-5 right-7 cursor-pointer md:hidden"
          for="navbar-open"
        >
          <span class="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          class="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul class="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li class={`${page == "home" ? "font-bold" : ""} md:mr-12`}>
              <Link to="/">Home</Link>
            </li>
            <li class={`${page == "about" ? "font-bold" : ""} md:mr-12`}>
              <Link to="/about">About Us</Link>
            </li>
            <li class={`${page == "services" ? "font-bold" : ""} md:mr-12`}>
              <Link to="/services">Products & Services</Link>
            </li>
            
            <li class={`${page == "contact" ? "font-bold" : ""} md:mr-12`}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
