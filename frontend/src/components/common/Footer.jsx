import React from "react";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import navigationData from "../../data/navigation.json";
import organizationData from "../../data/organization.json";

const Footer = () => {
  const { footerLinks } = navigationData;
  const { name, mission, contact } = organizationData;

  const socialLinks = [
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/sixteen.sourcefoundation/",
      name: "Instagram",
    },
    {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/sixteen16.2025",
      name: "Facebook",
    },
    {
      icon: <FaYoutube />,
      url: contact?.socialMedia?.youtube || "#",
      name: "YouTube",
    },
    {
      icon: <FaLinkedinIn />,
      url: contact?.socialMedia?.linkedin || "#",
      name: "LinkedIn",
    },
    {
      icon: <FaXTwitter />,
      url: contact?.socialMedia?.twitter || "#",
      name: "X",
    },
  ];

  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">

      {/* Main Footer */}
      <div className="max-w-[99rem] mx-auto px-5 sm:px-8 lg:px-10 py-10 lg:py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* ================= ABOUT ================= */}
          <div className="lg:pr-8 pb-8 sm:pb-0">

            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
              {name}
            </h3>

            <div className="w-16 h-1 bg-green-500 mb-4 rounded-full"></div>

            <p className="text-sm leading-6 text-gray-600 max-w-md">
              {mission?.length > 220
                ? `${mission.substring(0, 220)}...`
                : mission}
            </p>

          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="lg:px-8 lg:border-l lg:border-gray-300 pt-8 sm:pt-0">

            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">

              {footerLinks?.quickLinks?.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-green-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* ================= CONTACT ================= */}
          <div className="lg:px-8 lg:border-l lg:border-gray-300 pt-8 sm:pt-0">

            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm">

              {/* Address */}
              <div className="flex items-start gap-3">

                <FaMapMarkerAlt className="text-green-500 mt-1 flex-shrink-0" />

                <p className="text-gray-600 leading-5">
                  Dr. Hedgewar Vidyalaya, Building No. 106,
                  behind New MHADA Colony, PMGP,
                  Mankhurd West, Mumbai - 400043,
                  Maharashtra
                </p>

              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">

                <FaPhoneAlt className="text-green-500 flex-shrink-0" />

                <a
                  href={`tel:${contact?.phone}`}
                  className="text-gray-600 hover:text-green-500 transition-colors"
                >
                  {contact?.phone}
                </a>

              </div>

              {/* Email */}
              <div className="flex items-start gap-3">

                <FaEnvelope className="text-green-500 mt-1 flex-shrink-0" />

                <a
                  href={`mailto:${contact?.email}`}
                  className="text-gray-600 hover:text-green-500 transition-colors break-all"
                >
                  {contact?.email}
                </a>

              </div>

              {/* Website */}
              <div className="flex items-start gap-3">

                <FaGlobe className="text-green-500 mt-1 flex-shrink-0" />

                <a
                  href="https://www.sixteensourcefoundation.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-green-500 transition-colors break-all"
                >
                  www.sixteensourcefoundation.org
                </a>

              </div>

            </div>

          </div>

          {/* ================= FOLLOW US ================= */}
          <div className="lg:pl-8 lg:border-l lg:border-gray-300 pt-8 sm:pt-0">

            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              Follow Us
            </h3>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-7">

              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                  className="
                    w-9 h-9
                    rounded-full
                    bg-gray-200
                    flex items-center justify-center
                    text-gray-600
                    hover:bg-green-500
                    hover:text-white
                    transition-all
                    duration-200
                  "
                >
                  {item.icon}
                </a>
              ))}

            </div>

            {/* Registration */}
            <div>

              <h4 className="text-base font-bold text-gray-800 mb-3">
                Legal & Compliance
              </h4>

              <div className="space-y-2 text-sm text-gray-600">
                <p>Registration and report copies are available on request.</p>
                <Link to="/about#legal-documents" className="inline-block font-medium text-green-700 hover:text-green-800">
                  View document requests
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-300 bg-gray-200">

        <div
          className="
            max-w-[99rem]
            mx-auto
            px-5 sm:px-8 lg:px-10
            py-4
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-3
            text-sm
          "
        >

          {/* Copyright */}
          <p className="text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} {name}. All Rights Reserved.
          </p>

          {/* Policies */}
          <div className="flex items-center gap-3">

            <Link
              to="/privacy-policy"
              className="text-gray-600 hover:text-green-500 transition-colors"
            >
              Privacy Policy
            </Link>

            <span className="text-gray-400">|</span>

            <Link
              to="/terms-and-conditions"
              className="text-gray-600 hover:text-green-500 transition-colors"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;