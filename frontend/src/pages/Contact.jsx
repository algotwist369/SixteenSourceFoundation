import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
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
            details: ["123 NGO Street", "New Delhi, 110001", "India"]
        },
        {
            icon: <FaPhone className="text-3xl text-green-600" />,
            title: "Call Us",
            details: ["+91 98765 43210", "+91 98765 43211", "Mon-Sat: 9am-6pm"]
        },
        {
            icon: <FaEnvelope className="text-3xl text-green-600" />,
            title: "Email Us",
            details: ["info@sixteensource.org", "volunteer@sixteensource.org", "We reply within 24 hours"]
        },
        {
            icon: <FaClock className="text-3xl text-green-600" />,
            title: "Office Hours",
            details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm", "Sunday: Closed"]
        }
    ];

  return (
    <div>
            <PageHeader
                title="Contact Us"
                subtitle="We'd love to hear from you. Let's connect!"
                image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=400&fit=crop"
            />

            {/* Contact Information */}
            <Section>
                <Heading
                    title="Get In Touch"
                    subtitle="Reach out to us through any of these channels"
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {contactInfo.map((info, index) => (
                        <Card key={index} className="text-center">
                            <div className="flex justify-center mb-4">{info.icon}</div>
                            <h3 className="text-lg font-bold mb-3">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                                <p key={idx} className="text-gray-600 text-sm">
                                    {detail}
                                </p>
                            ))}
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Contact Form */}
            <Section bgColor="bg-gray-50">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Form */}
                    <div>
                        <Heading
                            title="Send Us a Message"
                            subtitle="Fill out the form and we'll respond soon"
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
                                placeholder="Tell us more..."
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
                            subtitle="Our office location"
                            align="left"
                        />
                        <Card className="mt-6">
                            {/* Google Maps Embed */}
                            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                                <iframe
                                    title="Office Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0266552668436!2d77.2088744!3d28.6280638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d9e2b53%3A0x8e6b2be8d6a3b7e9!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div className="space-y-3 text-gray-700">
                                <p className="font-semibold">Sixteensource Foundation</p>
                                <p className="text-sm">123 NGO Street, New Delhi, 110001, India</p>
                                <p className="text-sm">Phone: +91 98765 43210</p>
                                <p className="text-sm">Email: info@sixteensource.org</p>
                            </div>
                        </Card>

                        {/* FAQ */}
                        <Card className="mt-6">
                            <h3 className="text-lg font-bold mb-3">Quick Questions?</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><strong>Q: How can I volunteer?</strong></p>
                                <p>Visit our Get Involved page or fill out the contact form above.</p>
                                <p><strong>Q: Are donations tax-deductible?</strong></p>
                                <p>Yes, we provide 80G tax exemption certificates.</p>
                                <p><strong>Q: Can I visit your office?</strong></p>
                                <p>Yes! Please call ahead to schedule a visit.</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </Section>

            {/* CTA Section */}
            <Section bgColor="bg-green-600">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Have a Partnership Idea?</h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        We're always looking for organizations and individuals who share our vision.
                        Let's collaborate to create bigger impact!
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        className="bg-white text-green-600 hover:bg-gray-100"
                    >
                        Schedule a Meeting
                    </Button>
                </div>
            </Section>
    </div>
    );
};

export default Contact;
