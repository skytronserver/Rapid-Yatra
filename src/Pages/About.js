import React from "react";
import Navbar from "../Components/Navbar";
import aboutimg from "../Images/aboutimage.png";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen">
      <Navbar page={"about"} />

      {/* Dynamic Hero Section */}
      <div className="relative py-16 sm:py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-20 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-orange-300/40 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-8 w-28 h-28 sm:w-40 sm:h-40 bg-red-300/30 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 sm:w-28 sm:h-28 bg-amber-300/50 rounded-full animate-ping delay-200"></div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center flex-wrap justify-center bg-gradient-to-r from-orange-100 to-red-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-orange-200 mb-6 sm:mb-8 shadow-lg">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
            <span className="text-sm sm:text-base md:text-lg font-bold text-orange-700">
              Supporting Make in India Initiative
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 animate-pulse">
              HEMRE
            </span>
          </h1>

          <div className="w-20 sm:w-32 h-1 sm:h-2 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-6 sm:mb-8"></div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Leveraging technology and innovation to make travel safer, smarter, and more reliable
          </p>
        </div>
      </div>

      {/* Company Story Section */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-orange-400 to-red-400 rounded-3xl transform rotate-3"></div>
              <img
                src={aboutimg}
                alt="HEMRE Position System"
                className="relative w-full h-64 sm:h-80 md:h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl">
                <div className="text-sm sm:text-lg font-bold">Innovation Leader</div>
                <div className="text-xs sm:text-sm opacity-90">Since Inception</div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
                  HEMRE Position System
                  <span className="block text-xl sm:text-2xl md:text-3xl text-orange-600 font-bold mt-1 sm:mt-2">
                    Private Limited
                  </span>
                </h2>

                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mb-6 sm:mb-8"></div>

                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  At HEMRE Position System Pvt. Ltd., we are committed to leveraging technology and
                  innovation to make travel safer, smarter, and more reliable. Supporting the Make in
                  India initiative, we empower transport services across the country with cutting-edge
                  navigation and tracking solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-40 sm:w-64 h-40 sm:h-64 border-4 border-orange-400 rounded-full"></div>
          <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 w-32 sm:w-48 h-32 sm:h-48 border-4 border-red-400 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Vision & Mission
            </h2>
            <div className="w-20 sm:w-32 h-1 sm:h-2 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
            {/* Vision */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl transform group-hover:scale-105 transition-transform duration-300 opacity-90"></div>
              <div className="relative bg-white p-6 sm:p-10 m-1 rounded-3xl h-full shadow-2xl">
                <div className="flex items-start mb-4 sm:mb-6">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg">
                    <span className="text-2xl sm:text-3xl md:text-4xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Our Vision</h3>
                    <div className="w-12 sm:w-16 h-1 bg-orange-500 mt-1 sm:mt-2"></div>
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  To be a leading provider of intelligent navigation and safety solutions that redefine road travel,
                  ensuring security, efficiency, and peace of mind for every journey.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl transform group-hover:scale-105 transition-transform duration-300 opacity-90"></div>
              <div className="relative bg-white p-6 sm:p-10 m-1 rounded-3xl h-full shadow-2xl">
                <div className="flex items-start mb-4 sm:mb-6">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg">
                    <span className="text-2xl sm:text-3xl md:text-4xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h3>
                    <div className="w-12 sm:w-16 h-1 bg-blue-500 mt-1 sm:mt-2"></div>
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  We are committed to developing advanced technological solutions to meet the latent needs
                  of our customers, delivering innovation that enhances safety, reliability, and efficiency
                  in road transport across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rapid Yatra Brand Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl mb-6 sm:mb-8">
              <span className="text-sm sm:text-base md:text-lg font-bold tracking-wider">OUR BRAND</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Rapid Yatra
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-2xl text-gray-700 font-semibold mb-10 sm:mb-12">
              State-of-the-art vehicle tracking and safety system solution
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {[
              { name: "School Buses", icon: "🚌", gradient: "from-yellow-400 to-orange-500" },
              { name: "Commercial Vehicles", icon: "🚛", gradient: "from-blue-400 to-blue-600" },
              { name: "Passenger Transport", icon: "🚐", gradient: "from-green-400 to-green-600" },
              { name: "Emergency Services", icon: "🚑", gradient: "from-red-400 to-red-600" },
              { name: "Cash Vans", icon: "🏦", gradient: "from-purple-400 to-purple-600" }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}></div>
                <div className="relative bg-white p-6 sm:p-8 m-1 rounded-3xl text-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{service.icon}</div>
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-5 sm:w-6 h-5 sm:h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-[10px] sm:text-xs font-bold">✓</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">{service.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 sm:mt-16">
            <div className="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <p className="text-base sm:text-xl font-bold">
                "Making every journey safer, smarter, and more reliable."
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
