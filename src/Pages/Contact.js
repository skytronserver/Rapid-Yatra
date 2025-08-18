import React, { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const handleForm = (field, value) => {
    switch (field) {
      case "email":
        setEmailError(false);
        setEmail(value);
        break;
      case "subject":
        setSubjectError(false);
        setSubject(value);
        break;
      case "message":
        setMessageError(false);
        setMessage(value);
        break;
      default:
        setEmail("error");
        setSubject("error");
        setMessage("error");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (email.length === 0 && subject.length === 0 && message.length === 0) {
      setEmailError(true);
      setSubjectError(true);
      setMessageError(true);
      return;
    }
    if (email.length === 0) {
      setEmailError(true);
      return;
    }

    if (subject.length === 0) {
      setSubjectError(true);
      return;
    }
    if (message.length === 0) {
      setMessageError(true);
      return;
    }
    const serviceID = "service_fpbi0yq";
    const templateId = "template_ymuawjr";
    const publicKey = "QMrpQkZRPvWobmkeo";

    const templateParam = {
      from_name: email,
      from_email: "emailjs",
      to_name: "Prem Krishan Jain",
      message: `Subject: ${subject}. Message: ${message}`,
    };

    emailjs.send(serviceID, templateId, templateParam, publicKey).then(
      (res) => {
        toast.success("Message Sent Successfully", {
          position: "top-right",
        });
        setEmail("");
        setSubject("");
        setMessage("");
      },
      (error) => {
        toast.error("Server Side Error. Try Again Later", {
          position: "top-right",
        });
      }
    );
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 min-h-screen">
      <ToastContainer />
      <Navbar page={"contact"} />
      
      <div className="relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-cyan-200/40 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-violet-200/30 rounded-full blur-xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Let's Talk
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">Our Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to take the next step? Reach out to our team for more information or to discuss your project requirements. We are excited to partner with you on your journey to success.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
                    <p className="text-gray-600">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700" htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                            emailError 
                              ? "border-red-300 bg-red-50 focus:border-red-400" 
                              : "border-gray-200 focus:border-indigo-400 bg-gray-50 focus:bg-white"
                          }`}
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => handleForm("email", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                          subjectError 
                            ? "border-red-300 bg-red-50 focus:border-red-400" 
                            : "border-gray-200 focus:border-indigo-400 bg-gray-50 focus:bg-white"
                        }`}
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => handleForm("subject", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none resize-none h-32 ${
                        messageError 
                          ? "border-red-300 bg-red-50 focus:border-red-400" 
                          : "border-gray-200 focus:border-indigo-400 bg-gray-50 focus:bg-white"
                      }`}
                      id="message"
                      value={message}
                      onChange={(e) => handleForm("message", e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    onClick={sendEmail}
                    type="button"
                    className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Contact Person</h3>
                </div>
                <p className="text-2xl font-bold mb-2">Prem Krishan Jain</p>
                <p className="text-indigo-200">Primary Point of Contact</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Phone Numbers</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 font-medium">+91 9167230303</p>
                  <p className="text-gray-700 font-medium">+91 9892522814</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Email Addresses</h3>
                </div>
                <div className="space-y-3">
                  <a 
                    href="mailto:info@edishaindia.in" 
                    className="block text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    info@edishaindia.in
                  </a>
                  <a 
                    href="mailto:Info@fundvisercapital.in" 
                    className="block text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    Info@fundvisercapital.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;