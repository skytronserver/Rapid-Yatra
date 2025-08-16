import React from "react";
import Navbar from "../Components/Navbar";
import aboutimg from "../Images/aboutimg.png";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar page={"about"} />

      {/* Hero Section */}
      <div className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-slate-900">
          DARS Transtrade{" "}
          <span className="text-3xl text-blue-600 font-medium">Private Limited</span>
        </h1>
        <div className="flex items-center justify-center mt-6 space-x-4">
          <div className="w-20 h-1 bg-blue-600"></div>
          <p className="text-xl text-slate-600 font-medium">
            Innovating Safety & Connectivity for a Moving World
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 space-y-24">

        {/* Vision Section */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg p-10 relative rounded-xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  At DARS Transtrade Pvt. Ltd., we believe that the future of mobility lies in 
                  safety, reliability, and intelligent connectivity. This vision drives every 
                  solution we create — from pioneering transport safety systems to delivering 
                  advanced logistics and technology integration across industries.
                </p>
                <p className="border-l-4 border-blue-300 pl-4 bg-blue-50 py-2">
                  The Company is creating space in the growing international merchant trade.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 mt-10 lg:mt-0 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-slate-600 transform rotate-2 rounded-xl"></div>
            <img
              src={aboutimg}
              alt="DARS Transtrade"
              className="relative w-full h-80 object-cover shadow-lg rounded-xl"
            />
          </div>
        </div>

        {/* Flagship Innovation */}
        <div className="bg-gradient-to-r from-slate-800 to-blue-900 shadow-lg rounded-xl p-12 text-white">
          <div className="text-center mb-8">
            <div className="inline-block bg-white/20 px-6 py-2 text-sm font-bold tracking-widest mb-4">
              FLAGSHIP INNOVATION
            </div>
            <h2 className="text-3xl font-bold mb-4">e-Disha V600</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              Leading our product portfolio is the e-Disha V600, a next-generation, state-of-the-art 
              vehicle tracking and safety system proudly manufactured and marketed by DARS. With 
              precision GPS tracking, instant SOS alerts, and SMS fallback for low-network areas, 
              the e-Disha V600 ensures that every journey is monitored, protected, and connected. 
              Its rugged, weather-resistant build and driver-behaviour monitoring make it ideal for 
              commercial vehicles, fleets, passenger transport, school buses, and emergency services alike.
            </p>
          </div>
        </div>

        {/* Solutions Portfolio */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Beyond a Single Product – A Legacy of Solutions
            </h2>
            <div className="flex justify-center items-center mb-6 space-x-2">
              <div className="w-16 h-1 bg-slate-400"></div>
              <div className="w-4 h-4 bg-slate-600 transform rotate-45"></div>
              <div className="w-16 h-1 bg-slate-400"></div>
            </div>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto">
              DARS Transtrade has a proven track record in delivering integrated transport solutions, 
              smart fleet management systems, and safety-compliance technologies for clients across 
              India and internationally. Our expertise spans:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Solution Cards */}
            {[
              {
                title: "Intelligent Tracking & Monitoring",
                desc: "Real-time data for operational efficiency and safety compliance.",
                colorFrom: "from-blue-500",
                colorTo: "to-blue-600",
              },
              {
                title: "Logistics & Infrastructure Support",
                desc: "Solutions tailored to the needs of cargo, passenger transport, and specialised fleets.",
                colorFrom: "from-slate-500",
                colorTo: "to-slate-600",
              },
              {
                title: "Technology Integration",
                desc: "Leveraging IoT, telematics, and automation to optimise transport operations.",
                colorFrom: "from-green-500",
                colorTo: "to-green-600",
              },
            ].map((card, idx) => (
              <div key={idx} className="group relative">
                <div className="bg-white shadow-lg p-8 h-full transform transition-all duration-300 group-hover:shadow-xl rounded-xl">
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${card.colorFrom} ${card.colorTo} rounded-t-xl`}></div>
                  <div className="pt-4">
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mb-6 rounded-full">
                      <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{card.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{card.desc}</p>
                    <div className="mt-6 w-12 h-1 bg-blue-600 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transformation Mission */}
        <div className="relative">
          <div className="absolute inset-0 bg-slate-100 transform -skew-y-1"></div>
          <div className="relative py-16 px-6 max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center bg-white shadow-md px-8 py-4 mx-auto rounded-lg">
              <div className="w-3 h-3 bg-blue-600 mr-3 rounded-full"></div>
              <span className="text-slate-900 font-bold text-lg">MISSION STATEMENT</span>
              <div className="w-3 h-3 bg-blue-600 ml-3 rounded-full"></div>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              By combining our established capabilities with innovations like the e-Disha V600, 
              we are transforming the way India moves — making every trip safer, smarter, and more accountable.
            </p>

            <div className="bg-white shadow-lg p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">DARS Transtrade Pvt. Ltd.</h3>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto mb-4 rounded"></div>
              <p className="text-lg text-slate-600 font-medium italic">
                "Protecting journeys, powering progress."
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
