import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { FaHandsHelping, FaDonate, FaBullhorn, FaUsers } from "react-icons/fa";

const GetInvolved = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your interest! We'll contact you soon.");
        setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
    };

    const ways = [
        {
            icon: <FaHandsHelping className="text-5xl text-green-600" />,
            title: "Volunteer",
            description: "Join our team of dedicated volunteers and contribute your time and skills to make a direct impact.",
            actions: ["Field work", "Event organization", "Teaching & mentoring", "Administrative support"]
        },
        {
            icon: <FaDonate className="text-5xl text-green-600" />,
            title: "Donate",
            description: "Your financial support helps us expand our programs and reach more communities in need.",
            actions: ["One-time donation", "Monthly giving", "Corporate sponsorship", "In-kind donations"]
        },
        {
            icon: <FaBullhorn className="text-5xl text-green-600" />,
            title: "Spread Awareness",
            description: "Help us amplify our message by sharing our work on social media and within your network.",
            actions: ["Share on social media", "Host awareness events", "Write about us", "Tell your friends"]
        },
        {
            icon: <FaUsers className="text-5xl text-green-600" />,
            title: "Partner With Us",
            description: "Organizations can collaborate with us for CSR initiatives and community development projects.",
            actions: ["Corporate partnerships", "Educational institutions", "Government collaborations", "NGO networks"]
        }
    ];

    const benefits = [
        "Make a real difference in people's lives",
        "Develop new skills and experiences",
        "Meet like-minded individuals",
        "Receive volunteer certificates",
        "Be part of a growing community",
        "Personal growth and fulfillment"
    ];

    return (
        <div>
            <PageHeader
                title="Get Involved"
                subtitle="Be the change you wish to see in the world"
                image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=400&fit=crop"
            />

            {/* Ways to Help */}
            <Section>
                <Heading
                    title="Ways You Can Help"
                    subtitle="Choose how you'd like to make a difference"
                />
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                    {ways.map((way, index) => (
                        <Card key={index}>
                            <div className="flex justify-center mb-4">{way.icon}</div>
                            <h3 className="text-2xl font-bold text-center mb-3">{way.title}</h3>
                            <p className="text-gray-600 text-center mb-4">
                                {way.description}
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {way.actions.map((action, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        {action}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Why Volunteer */}
            <Section bgColor="bg-gray-50">
                <Heading
                    title="Why Volunteer With Us?"
                    subtitle="The benefits of being part of our mission"
                />
                <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                            <span className="text-green-600 text-2xl mr-3">✓</span>
                            <p className="text-gray-700">{benefit}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Volunteer Form */}
            <Section>
                <Heading
                    title="Join Our Team"
                    subtitle="Fill out the form and we'll get in touch with you"
                />
                <Card className="max-w-2xl mx-auto mt-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                        <InputField
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            required
                        />
                        <InputField
                            label="Phone Number"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                        />
                        <div className="mb-4">
                            <label
                                htmlFor="interest"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                I'm interested in
                            </label>
                            <select
                                id="interest"
                                name="interest"
                                value={formData.interest}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 
                                    rounded-lg shadow-sm focus:outline-none 
                                    focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select an option</option>
                                <option value="volunteer">Volunteering</option>
                                <option value="donate">Making a Donation</option>
                                <option value="partner">Partnership</option>
                                <option value="awareness">Spreading Awareness</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Message (Optional)
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Tell us more about your interests and availability..."
                                className="w-full px-4 py-2 border border-gray-300 
                                    rounded-lg shadow-sm focus:outline-none 
                                    focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <Button type="submit" variant="primary" size="lg" className="w-full">
                            Submit Application
                        </Button>
                    </form>
                </Card>
            </Section>

            {/* Call to Action */}
            <Section bgColor="bg-green-600">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Every Action Counts</h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        Whether you have time, resources, or just a voice - you can help us create change.
                        Start your journey with us today!
                    </p>
                </div>
            </Section>
        </div>
    );
};

export default GetInvolved;
