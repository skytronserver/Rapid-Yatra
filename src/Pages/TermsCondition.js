import React from "react";
import { HiOutlineChevronDown, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import Navbar from "../Components/Navbar";

const Section = ({ title, updated, children }) => (
  <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 sm:mb-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
        {title}
      </h2>
      {updated && (
        <span className="mt-3 sm:mt-0 text-xs sm:text-sm font-medium text-gray-400 tracking-wide">
          {updated}
        </span>
      )}
    </header>
    <div className="space-y-5 sm:space-y-7 text-gray-700 text-sm sm:text-base">
      {children}
    </div>
  </section>
);

const AccordionItem = ({ label, items, text }) => (
  <details className="group border border-gray-300 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-colors" open>
    <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800 select-none">
      <span>{label}</span>
      <HiOutlineChevronDown className="transform group-open:rotate-180 transition-transform duration-300 w-6 h-6 text-gray-600" />
    </summary>
    {items ? (
      <ul className="mt-3 list-disc list-inside text-gray-600 space-y-2 ml-2 text-sm sm:text-base">
        {items.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    ) : (
      <p className="mt-3 text-gray-600 whitespace-pre-line">{text}</p>
    )}
  </details>
);

const TermsCondition = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />

    <div className="max-w-4xl mx-auto py-16 sm:py-20 space-y-16 px-4 sm:px-0">
      {/* Rapid Yatra Terms & Conditions */}
      <Section title="Rapid Yatra App - Terms & Conditions" updated="Last Updated: 21.08.2025">
        <p className="text-gray-700 leading-relaxed">
          Welcome to Rapid Yatra, a digital service provided by HEMRE Position System Pvt. Ltd., located at G-26, Tara Deep Apartment, Wazirabad Marg, Sector 52, Gurugram, Haryana - 122003. These Terms and Conditions ("Terms") govern your access to and use of the Rapid Yatra mobile application ("App"). By using the App, you agree to comply with and be bound by these Terms. If you do not agree to any part, please do not use the App.
        </p>
        {[
          {
            label: "1. Acceptance of Terms",
            text: "By installing or using the Rapid Yatra App, you accept these Terms. These Terms create a legally binding agreement between you and HEMRE Position System Pvt. Ltd."
          },
          {
            label: "2. Eligibility",
            text: "You must be 18 years or older to use this App. By using the App, you confirm that you meet this requirement."
          },
          {
            label: "3. User Accounts",
            text: "Certain features may require you to register an account. You are responsible for maintaining the confidentiality of your account credentials and agree to notify us of any unauthorized use."
          },
          {
            label: "4. Authorized Usage",
            text: "You agree to use the App only for purposes permitted by law and these Terms. Unauthorized access, duplication, or reverse engineering of the App is strictly prohibited."
          },
          {
            label: "5. Ownership and Intellectual Property",
            text: "All content, trademarks, and software used in this App are the property of HEMRE Position System Pvt. Ltd. or its licensors. No rights are granted except as expressly stated."
          },
          {
            label: "6. Privacy",
            text: "Your use of the App is subject to our Privacy Policy, which governs how we collect, use, and safeguard your data."
          },
          {
            label: "7. Service Availability",
            text: "We strive to keep the App running smoothly but do not guarantee uninterrupted access. We reserve the right to suspend or modify the App at any time without notice."
          },
          {
            label: "8. Limitation of Liability",
            text: "HEMRE Position System Pvt. Ltd. shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the App."
          },
          {
            label: "9. Termination",
            text: "We may terminate your access to the App without prior notice if you violate these Terms or applicable laws."
          },
          {
            label: "10. Governing Law",
            text: "These Terms shall be governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Gurugram, Haryana."
          },
          {
            label: "11. Amendments",
            text: "We may modify these Terms from time to time. Continued use of the App after such changes constitutes your acceptance."
          },
          {
            label: "12. Contact Information",
            text: "For any questions, please contact us:\n📧 Email: services@rapidyatra.com"
          }
        ].map(({ label, text }) => (
          <AccordionItem key={label} label={label} text={text} />
        ))}
      </Section>

      {/* Rapid Yatra Privacy Policy */}
      <Section title="Rapid Yatra App - Privacy Policy" updated="Last Updated: 21.08.2025">
        <p className="text-gray-700 leading-relaxed">
          At HEMRE Position System Pvt. Ltd., we value your trust. This Privacy Policy outlines how we collect, use, and protect your information when you use the Rapid Yatra mobile application.
        </p>
        {[
          {
            label: "1. What Information We Collect",
            items: [
              "Personal identifiers like name, phone number, and email address.",
              "Technical details such as device ID, IP address, and operating system.",
              "Location information (if permissions are granted)."
            ]
          },
          {
            label: "2. Purpose of Collection",
            items: [
              "Deliver and improve our services.",
              "Communicate updates or service notifications.",
              "Ensure security and compliance with legal obligations."
            ]
          },
          {
            label: "3. Information Sharing",
            items: [
              "Third-party service providers under strict confidentiality.",
              "Government authorities as required by law."
            ]
          },
          {
            label: "4. Data Security",
            text: "We apply appropriate technical and organizational measures to protect your data against unauthorized access or misuse."
          },
          {
            label: "5. Your Choices",
            text: "You can review or request deletion of your personal data by contacting services@rapidyatra.com. However, some data may be retained as required by law."
          },
          {
            label: "6. Retention Policy",
            text: "We retain personal data only as long as needed for service provision or legal compliance."
          },
          {
            label: "7. Children’s Data",
            text: "The App is not intended for users under the age of 18. We do not knowingly collect information from children."
          },
          {
            label: "8. Policy Updates",
            text: "We may update this Privacy Policy periodically. Updates will be communicated via the App or through email."
          },
          {
            label: "9. Contact Us",
            text: "If you have any questions or concerns about this policy, contact:\n📧 Email: services@rapidyatra.com"
          }
        ].map(({ label, items, text }) => (
          <AccordionItem key={label} label={label} items={items} text={text} />
        ))}
      </Section>

      {/* Licensing */}
      <Section title="Licensing">
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cupiditate cum nostrum dolore pariatur debitis at nemo necessitatibus optio sequi ipsum officia quidem ab, id dolorem ratione minus molestias provident laudantium amet quaerat! Aut cumque officiis ratione aperiam incidunt atque quis quod. Ipsum similique consequatur soluta dolores atque repellat a vero. Labore deserunt, minus nostrum odit quod optio unde rem dignissimos, delectus vel facere culpa nihil excepturi mollitia.
        </p>
      </Section>
    </div>
  </div>
);

export default TermsCondition;
