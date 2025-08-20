import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 min-h-screen relative flex flex-col overflow-hidden">
      <Navbar page="home" />

      {/* Decorative Background */}
      <div className="absolute top-20 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-10 sm:right-20 w-28 h-28 sm:w-48 sm:h-48 bg-cyan-200/40 rounded-full blur-3xl animate-pulse delay-75"></div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 sm:w-32 sm:h-32 bg-violet-200/30 rounded-full blur-3xl animate-pulse delay-150"></div>
      <div className="absolute top-1/3 left-1/2 w-14 h-14 sm:w-24 sm:h-24 bg-pink-200/25 rounded-full blur-2xl animate-bounce delay-300"></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 sm:w-40 sm:h-40 bg-emerald-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Floating geometric shapes */}
      <div className="absolute top-32 right-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-indigo-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute bottom-1/3 left-16 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 rounded-full animate-float-delayed opacity-50"></div>
      <div className="absolute top-1/2 right-12 w-2 h-2 bg-violet-500 rounded-full animate-bounce opacity-40"></div>

      {/* Hero Section */}
      <div className="relative flex-grow flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="text-center max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-white/70 backdrop-blur-sm border border-indigo-200/50 rounded-full text-xs sm:text-sm text-indigo-700 font-medium mb-6 sm:mb-8 shadow-lg">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Next-Generation Vehicle Tracking Technology
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 animate-gradient-x">
              e-Disha
            </span>
          </h1>

          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
            <p className="text-base sm:text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
              <strong className="text-gray-900">E-Disha</strong> is a
              next-generation vehicle tracking and safety system with precision
              GPS, instant SOS alerts, and SMS fallback for low-network areas.
            </p>
            <p className="text-sm sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Rugged and weather-resistant, it is ideal for commercial vehicles,
              fleets, passenger transport, school buses, and emergency services.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
            <Link
              to="/services"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl sm:rounded-2xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden text-sm sm:text-base"
            >
              <span className="relative z-10">Our Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/about"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/70 backdrop-blur-sm border-2 border-cyan-600 text-cyan-600 rounded-xl sm:rounded-2xl font-semibold hover:bg-cyan-50 hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              <span className="group-hover:text-cyan-700 transition-colors duration-300">
                About Us
              </span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 opacity-70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
              <span>24/7 Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full"></div>
              <span>Weather Resistant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full"></div>
              <span>Fleet Ready</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-180deg);
          }
        }
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
