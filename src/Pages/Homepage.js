import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen overflow-hidden relative flex flex-col fixed inset-0">
      <Navbar page="home" />

      {/* Decorative Background */}
      <div className="absolute top-16 left-8 w-24 h-24 sm:w-40 sm:h-40 bg-orange-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-32 right-12 sm:right-24 w-32 h-32 sm:w-52 sm:h-52 bg-red-200/35 rounded-full blur-3xl animate-pulse delay-100"></div>
      <div className="absolute bottom-28 left-1/3 w-24 h-24 sm:w-36 sm:h-36 bg-amber-200/30 rounded-full blur-3xl animate-pulse delay-200"></div>
      <div className="absolute top-2/5 left-2/3 w-16 h-16 sm:w-28 sm:h-28 bg-rose-200/25 rounded-full blur-2xl animate-bounce delay-400"></div>
      <div className="absolute bottom-16 right-1/4 w-32 h-32 sm:w-44 sm:h-44 bg-yellow-200/20 rounded-full blur-3xl animate-pulse delay-600"></div>

      {/* Hero Section */}
      <div className="relative flex-1 flex items-center px-4 py-2">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2 h-full">

            {/* Main Content - Left Side */}
            <div className="text-center lg:text-left flex-1 pr-0 lg:pr-4 mt-[-160px] sm:mt-0">
              {/* Badge */}
              <div className="inline-flex items-center px-5 py-2 bg-white/90 backdrop-blur-sm border border-orange-200/60 rounded-full text-sm sm:text-base lg:text-lg text-orange-700 font-semibold shadow-lg mb-5">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                Supporting Make in India Initiative
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight mb-5">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 animate-gradient-x block lg:inline">
                  Rapid Yatra
                </span>
              </h1>

              {/* Company Info */}
              <div className="space-y-3 mb-7">
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-800 font-bold">
                  <span className="text-orange-600">HEMRE Position System Pvt. Ltd.</span>
                </p>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  State-of-the-art vehicle tracking and safety system solutions. Leveraging technology and innovation to make travel safer, smarter, and more reliable across India.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/about"
                  className="group w-[220px] sm:w-auto px-10 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold flex items-center justify-center hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden text-base mx-auto sm:mx-0"
                >
                  <span className="relative z-10">About Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/contact"
                  className="group w-[220px] sm:w-auto px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-orange-600 text-orange-600 rounded-xl font-bold flex items-center justify-center hover:bg-orange-50 hover:shadow-lg transition-all duration-300 hover:scale-105 text-base mx-auto sm:mx-0"
                >
                  <span className="group-hover:text-orange-700 transition-colors duration-300">
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>

            {/* Logo Section - Hidden on Mobile */}
            <div className="hidden lg:flex justify-center lg:justify-start flex-shrink-0">
              <div className="relative group">
                {/* Hexagonal Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-72 h-72 lg:w-80 lg:h-80 relative">
                    <div className="absolute top-4 left-8 w-16 h-16 border-2 border-orange-300 rotate-45 rounded-lg"></div>
                    <div className="absolute top-12 right-8 w-12 h-12 border-2 border-red-300 rotate-12 rounded-full"></div>
                    <div className="absolute bottom-8 left-4 w-20 h-20 border-2 border-amber-300 -rotate-12 rounded-lg"></div>
                    <div className="absolute bottom-16 right-16 w-8 h-8 border-2 border-orange-400 rotate-45 rounded-full"></div>
                  </div>
                </div>

                {/* Main Logo Container */}
                <div className="relative w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-transparent to-red-400/20 rounded-3xl animate-pulse"></div>
                  <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center">
                    <img
                      className="w-full h-full object-contain drop-shadow-lg"
                      src={logo}
                      alt="Rapid Yatra - HEMRE Position System"
                    />
                  </div>
                  <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-8 left-8 w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 left-4 w-1 h-1 bg-red-400 rounded-full animate-bounce"></div>
                </div>

                {/* Floating Tags */}
                <div className="absolute -top-2 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-lg shadow-lg text-xs font-bold animate-float">
                  GPS Enabled
                </div>
                <div className="absolute -bottom-2 -right-4 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-xl shadow-xl">
                  <div className="text-sm font-bold">Rapid Yatra</div>
                  <div className="text-xs opacity-90">Tracking Solutions</div>
                </div>
                <div className="absolute top-1/2 -left-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-lg shadow-lg text-xs font-bold animate-float-delayed">
                  24/7 Support
                </div>

                {/* Orbiting Elements */}
                <div className="absolute top-16 -right-8 w-6 h-6 bg-yellow-400 rounded-full animate-bounce opacity-70 flex items-center justify-center text-xs">
                  🛡️
                </div>
                <div className="absolute bottom-20 -left-8 w-6 h-6 bg-green-400 rounded-full animate-pulse opacity-70 flex items-center justify-center text-xs">
                  📍
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-2deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 4s ease infinite; }
        .animate-orbit { animation: orbit 15s linear infinite; }
      `}</style>
    </div>
  );
};

export default HomePage;
