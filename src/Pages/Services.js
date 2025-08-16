import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import edishaImg from "../Images/weoffer1.png";
import fleetImg from "../Images/weoffer2.png";
import supportImg from "../Images/weoffer3.png";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar page={"services"} />

      <section className="py-20 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Our Solutions
            </span>
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Products & Services
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="mb-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={edishaImg}
                  alt="e-Disha V600"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 opacity-20 rounded-full blur-xl"></div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-4xl font-bold text-slate-900">e-Disha V600</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                The e-Disha V600 is a next-generation vehicle tracking and safety system 
                with precision GPS, instant SOS alerts, and SMS fallback for low-network areas. 
                Rugged and weather-resistant, it is ideal for commercial vehicles, fleets, 
                passenger transport, school buses, and emergency services.
              </p>
            </div>
          </div>

          <div className="mb-20 flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={fleetImg}
                  alt="Fleet & Logistics Solutions"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-slate-500 opacity-20 rounded-full blur-xl"></div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-4xl font-bold text-slate-900">Fleet & Logistics Solutions</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                DARS provides intelligent tracking and monitoring for operational efficiency 
                and safety compliance. Our logistics and infrastructure support solutions 
                cater to cargo, passenger transport, and specialised fleets.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={supportImg}
                  alt="Technology & Support"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 opacity-20 rounded-full blur-xl"></div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-4xl font-bold text-slate-900">Technology & Support</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Leveraging IoT, telematics, and automation, we optimize transport operations. 
                Our comprehensive service and support ensure seamless operation and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Why Choose DARS?
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-12">
            Combining innovation, quality, and a customer-centric approach, DARS Transtrade ensures 
            safer, smarter, and more accountable journeys for your fleet and transport needs.
          </p>
          
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;