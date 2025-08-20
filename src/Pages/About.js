import React from "react";
import Navbar from "../Components/Navbar";
import aboutimg from "../Images/aboutimg.png";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen">
      <Navbar page={"about"} />

      {/* Dynamic Hero Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-300/40 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-16 w-40 h-40 bg-red-300/30 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-amber-300/50 rounded-full animate-ping delay-200"></div>
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 px-6 py-3 rounded-full border-2 border-orange-200 mb-8 shadow-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-orange-700 font-bold">Supporting Make in India Initiative</span>
          </div>
          
          <h1 className="text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 animate-pulse">
              HEMRE
            </span>
          </h1>
          
          <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-8"></div>
          
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Leveraging technology and innovation to make travel safer, smarter, and more reliable
          </p>
        </div>
      </div>

      {/* Company Story Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-orange-400 to-red-400 rounded-3xl transform rotate-3"></div>
              <img
                src={aboutimg}
                alt="HEMRE Position System"
                className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-2xl shadow-xl">
                <div className="text-lg font-bold">Innovation Leader</div>
                <div className="text-sm opacity-90">Since Inception</div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-black text-gray-900 mb-6">
                  HEMRE Position System
                  <span className="block text-3xl text-orange-600 font-bold mt-2">Private Limited</span>
                </h2>
                
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mb-8"></div>
                
                <p className="text-xl text-gray-700 leading-relaxed">
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

      {/* Vision & Mission - Creative Layout */}
      <div className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-orange-400 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-red-400 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">Vision & Mission</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Vision */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl transform group-hover:scale-105 transition-transform duration-300 opacity-90"></div>
              <div className="relative bg-white p-10 m-1 rounded-3xl h-full shadow-2xl">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                    <span className="text-4xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                    <div className="w-16 h-1 bg-orange-500 mt-2"></div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be a leading provider of intelligent navigation and safety solutions that redefine road travel, 
                  ensuring security, efficiency, and peace of mind for every journey.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl transform group-hover:scale-105 transition-transform duration-300 opacity-90"></div>
              <div className="relative bg-white p-10 m-1 rounded-3xl h-full shadow-2xl">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                    <span className="text-4xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                    <div className="w-16 h-1 bg-blue-500 mt-2"></div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
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
      <div className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full shadow-xl mb-8">
              <span className="text-lg font-bold tracking-wider">OUR BRAND</span>
            </div>
            
            <h2 className="text-6xl font-black text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Rapid Yatra
              </span>
            </h2>
            
            <p className="text-2xl text-gray-700 font-semibold mb-12">
              State-of-the-art vehicle tracking and safety system solution
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { name: "School Buses", icon: "🚌", gradient: "from-yellow-400 to-orange-500" },
              { name: "Commercial Vehicles", icon: "🚛", gradient: "from-blue-400 to-blue-600" },
              { name: "Passenger Transport", icon: "🚐", gradient: "from-green-400 to-green-600" },
              { name: "Emergency Services", icon: "🚑", gradient: "from-red-400 to-red-600" },
              { name: "Cash Vans", icon: "🏦", gradient: "from-purple-400 to-purple-600" }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}></div>
                <div className="relative bg-white p-8 m-1 rounded-3xl text-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{service.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <p className="text-xl font-bold">
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
