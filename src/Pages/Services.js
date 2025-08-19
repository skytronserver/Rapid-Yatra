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

      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-slate-50">
        <div className="w-full px-6 text-center">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
              Our Solutions
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            Products & <span className="text-blue-600">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-8 rounded-full"></div>
        </div>
      </section>

      {/* Services Blocks */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-slate-50">
        <div className="w-full px-6 space-y-16 -mt-20">

          {/* e-Disha V600 */}
          <div className="flex flex-col lg:flex-row items-center gap-8 -mt-4">
            <div className="lg:w-1/2 relative">
              <img
                src={edishaImg}
                alt="e-Disha V600"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-blue-500 opacity-20 rounded-full blur-xl"></div>
            </div>
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-3xl font-bold text-slate-900">e-Disha V600</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                The e-Disha V600 is a next-generation vehicle tracking and safety system
                with precision GPS, instant SOS alerts, and SMS fallback for low-network areas.
                Rugged and weather-resistant, it is ideal for commercial vehicles, fleets,
                passenger transport, school buses, and emergency services.
              </p>
            </div>
          </div>

          {/* Fleet & Logistics Solutions */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 -mt-4">
            <div className="lg:w-1/2 relative">
              <img
                src={fleetImg}
                alt="Fleet & Logistics Solutions"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-slate-500 opacity-20 rounded-full blur-xl"></div>
            </div>
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-3xl font-bold text-slate-900">Fleet & Logistics Solutions</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                DARS provides intelligent tracking and monitoring for operational efficiency
                and safety compliance. Our logistics and infrastructure support solutions
                cater to cargo, passenger transport, and specialised fleets.
              </p>
            </div>
          </div>

          {/* Technology & Support */}
          <div className="flex flex-col lg:flex-row items-center gap-8 -mt-4">
            <div className="lg:w-1/2 relative">
              <img
                src={supportImg}
                alt="Technology & Support"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-blue-600 opacity-20 rounded-full blur-xl"></div>
            </div>
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-3xl font-bold text-slate-900">Technology & Support</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Leveraging IoT, telematics, and automation, we optimize transport operations.
                Our comprehensive service and support ensure seamless operation and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900">
        <div className="w-full px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Why Choose DARS?
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-12">
            Combining innovation, quality, and a customer-centric approach, DARS Transtrade ensures
            safer, smarter, and more accountable journeys for your fleet and transport needs.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>

            <p className="text-slate-300">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
