import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import navigationData from "../../data/navigation.json";
import organizationData from "../../data/organization.json";

const Footer = () => {
  const { footerLinks } = navigationData;
  const { name, mission, contact } = organizationData;

  const socialLinks = [
    { icon: <FaFacebookF />, url: contact.socialMedia.facebook, name: "Facebook" },
    { icon: <FaTwitter />, url: contact.socialMedia.twitter, name: "Twitter" },
    { icon: <FaInstagram />, url: contact.socialMedia.instagram, name: "Instagram" },
    { icon: <FaLinkedin />, url: contact.socialMedia.linkedin, name: "LinkedIn" },
    { icon: <FaYoutube />, url: contact.socialMedia.youtube, name: "YouTube" },
  ];

  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">
      <div className="max-w-[99rem] mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{name}</h3>
          <p className="text-sm">
            {mission.substring(0, 150)}...
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {footerLinks.quickLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-green-500">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get Involved</h3>
          <ul className="space-y-2 text-sm">
            {footerLinks.getInvolved.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-green-500">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">{contact.address.street}, {contact.address.area}</p>
          <p className="text-sm">{contact.address.city} - {contact.address.pincode}</p>
          <p className="text-sm">Email: {contact.email}</p>
          <p className="text-sm">Phone: {contact.phone}</p>
          <div className="flex space-x-3 mt-3 text-lg">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-500"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-200 text-center py-4 text-sm">
        © {new Date().getFullYear()} {name}. All rights reserved. | Registered NGO
      </div>
    </footer>
  );
};

export default Footer;
