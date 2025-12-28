import React, { useState, useEffect } from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for contacting us! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt className="text-3xl text-green-600" />,
            title: "Visit Us",
            details: ["Room no.386, building no.12", "West, tail gali, PMG COLONY", "Mankhurd, Mumbai, Maharashtra 400088"]
        },
        {
            icon: <FaEnvelope className="text-3xl text-green-600" />,
            title: "Email Us",
            details: ["sixteensource.ngo24@gmail.com", "", "We reply within 48 hours"]
        },
        {
            icon: <FaClock className="text-3xl text-green-600" />,
            title: "Office Hours",
            details: ["Monday - Saturday", "10:00 AM - 6:00 PM", "Sunday: Closed"]
        }
    ];

    return (
        <div>
            {/* Contact Information */}
            <Section>
                <Heading
                    title="Get In Touch"
                    subtitle="Reach out to us for any inquiries about our programs and initiatives"
                />
                <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
                    {contactInfo.map((info, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <div className="flex justify-center mb-4">{info.icon}</div>
                            <h3 className="text-lg font-bold mb-3">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                                detail && <p key={idx} className="text-gray-600 text-sm">
                                    {detail}
                                </p>
                            ))}
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Contact Form */}
            <Section bgColor="bg-gray-50">
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Form */}
                    <div>
                        <Heading
                            title="Send Us a Message"
                            subtitle="Fill out the form and we'll respond as soon as possible"
                            align="left"
                        />
                        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                            <InputField
                                label="Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                            <InputField
                                label="Your Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                required
                            />
                            <InputField
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="What is this regarding?"
                                required
                            />
                            <div className="mb-4">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Tell us more about your inquiry..."
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 
                                    rounded-lg shadow-sm focus:outline-none 
                                    focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <Button type="submit" variant="primary" size="lg" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Map & Info */}
                    <div>
                        <Heading
                            title="Find Us Here"
                            subtitle="Our office location in Mumbai"
                            align="left"
                        />
                        <Card className="mt-6">
                            {/* Google Maps Embed */}
                            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                                <iframe
                                    title="Office Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.3080690833267!2d72.9394897!3d19.050188100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c70018e70ef5%3A0x649b83097185e6fd!2sSixteen%20Source%20Foundation!5e0!3m2!1sen!2sin!4v1766926994237!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div className="space-y-3 text-gray-700">
                                <p className="font-semibold text-lg">Sixteen Source Foundation</p>
                                <div className="text-sm space-y-1">
                                    <p className="flex items-start gap-2">
                                        <FaMapMarkerAlt className="text-green-600 mt-1 flex-shrink-0" />
                                        <span>Room no.386, building no.12, West, tail gali,<br />PMG COLONY, Mankhurd, Mumbai, Maharashtra 400088</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaEnvelope className="text-green-600 flex-shrink-0" />
                                        <span>sixteensource.ngo24@gmail.com</span>
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Section>

            {/* CTA Section */}
            <Section>
                <div className="max-w-4xl mx-auto text-center">
                    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-none shadow-lg">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Want to Partner With Us?</h2>
                        <p className="text-lg mb-6 text-gray-700">
                            We welcome collaborations with organizations and individuals who share our vision
                            of empowering rural communities. Let's work together to create lasting change!
                        </p>
                        <p className="text-gray-600 mb-6">
                            For partnership inquiries, donations, or volunteer opportunities, please reach out to us
                            at <a href="mailto:sixteensource.ngo24@gmail.com" className="text-green-600 font-semibold hover:underline">
                                sixteensource.ngo24@gmail.com
                            </a>
                        </p>
                    </Card>
                </div>
            </Section>
        </div>
    );
};

export default Contact;
