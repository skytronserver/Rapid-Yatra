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
      to_name: "HEMRE Position System",
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
    <div className="bg-gradient-to-br from-orange-50 via-white to-red-50">
      <ToastContainer />
      <Navbar page={"contact"} />
      <div className="font-sans text-base text-orange-700 sm:px-10 pb-14">
        <div className="text-base text-gray-700">
          <div className="mx-auto w-full ">
            <div className="mx-2 pt-12 text-center md:mx-auto md:w-2/3 md:pb-12">
              <h1 className="mb-4 text-3xl font-black sm:text-5xl xl:text-6xl">
                Contact us
              </h1>
              <div className="text-lg sm:text-xl xl:text-xl">
                <div className="text-gray-500">
                  <p className="mb-4">
                    Ready to take the next step? Reach out to our team for more
                    information or to discuss your project requirements. At
                    HEMRE Position System, we are excited to partner with you on your journey
                    to a smarter, more connected world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mb-20 flex w-full max-w-screen-lg flex-col overflow-hidden rounded-xl text-gray-700 md:flex-row md:border md:shadow-lg bg-white">
          <form className="mx-auto w-full max-w-xl border-gray-200 px-10 py-8 md:px-8">
            <div className="mb-4">
              <label className="text mb-2 block font-medium" htmlFor="email">
                Your e-mail:
              </label>
              <input
                className={`w-full rounded border ${
                  emailError ? "border-red-600" : "border-orange-300"
                }  px-3 py-2 outline-none ring-orange-500 focus:ring rounded-lg`}
                id="email"
                type="email"
                required=""
                value={email}
                onChange={(e) => handleForm("email", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="text mb-2 block font-medium" htmlFor="subject">
                Subject:
              </label>
              <input
                className={`w-full rounded border ${
                  subjectError ? "border-red-600" : "border-orange-300"
                }  px-3 py-2 outline-none ring-orange-500 focus:ring rounded-lg`}
                id="subject"
                type="text"
                required=""
                value={subject}
                onChange={(e) => handleForm("subject", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="text mb-2 block font-medium" htmlFor="message">
                Message:
              </label>
              <textarea
                className={`h-52 w-full rounded border ${
                  messageError ? "border-red-600" : "border-orange-300"
                } px-3 py-2 outline-none ring-orange-500 focus:ring  rounded-lg`}
                id="message"
                required=""
                onChange={(e) => handleForm("message", e.target.value)}
                value={message}
              ></textarea>
            </div>
            <div className="flex items-center">
              <div className="flex-1"></div>
              <div
                onClick={sendEmail}
                className="rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-4 py-3 text-center font-bold text-white hover:from-orange-700 hover:to-red-700 cursor-pointer transition-all duration-200"
              >
                Send message
              </div>
            </div>
          </form>

          <div className="mt-10 bg-gradient-to-br from-orange-600 to-red-600 px-10 py-8 text-gray-100 md:mt-0 md:ml-auto">
            <div className="">
              <p className="mb-4 font-medium border-b pb-2">REACH US</p>
              <p className="mb-4">Office Address:</p>
              <p className="mb-1">HEMRE Position System Pvt. Ltd.</p>
              <p className="mb-1">G-26, TARA DEEP APARTMENT</p>
              <p className="mb-1">Wazirabad Marg, Sector 52</p>
              <p className="mb-4">Gurugram, Haryana - 122003</p>

              <hr className="my-2 h-0 border-t border-r-0 border-b-0 border-l-0 border-gray-300" />
              <p className="mb-4">Monday – Friday: 09:00 – 18:00</p>
              <p className="mb-4">Saturday: 08:00 - 15:00</p>
              <p className="mb-4">Sunday: Closed</p>
              <p className="mb-4">
                Email:{" "}
                <a href="mailto:services@rapidyatra.com" className="font-semibold underline">
                  services@rapidyatra.com
                </a>
              </p>
              <p className="mb-4">
                Phone:{" "}
                <a href="tel:+918511124315" className="font-semibold underline">
                  +91 8511124315
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
