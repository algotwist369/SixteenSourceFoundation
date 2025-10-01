import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { FaCheckCircle, FaHeart, FaClock, FaUsers, FaGift } from "react-icons/fa";

const Volunteer = () => {
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        
        // Address
        address: "",
        city: "",
        state: "",
        pincode: "",
        
        // Volunteer Information
        volunteerType: "",
        programInterest: [],
        availability: [],
        experience: "",
        skills: "",
        
        // Additional Information
        motivation: "",
        hearAbout: "",
        emergencyContact: "",
        emergencyPhone: "",
        
        // Agreements
        agreeTerms: false,
        agreeBackground: false
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleCheckboxGroup = (e) => {
        const { name, value, checked } = e.target;
        const currentArray = formData[name];
        
        if (checked) {
            setFormData({
                ...formData,
                [name]: [...currentArray, value]
            });
        } else {
            setFormData({
                ...formData,
                [name]: currentArray.filter(item => item !== value)
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Volunteer Form Data:", formData);
        setSubmitted(true);
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const benefits = [
        {
            icon: <FaHeart className="text-3xl text-green-600" />,
            title: "Make a Real Impact",
            description: "Directly contribute to changing lives in your community"
        },
        {
            icon: <FaUsers className="text-3xl text-green-600" />,
            title: "Meet Like-Minded People",
            description: "Connect with passionate individuals who share your values"
        },
        {
            icon: <FaGift className="text-3xl text-green-600" />,
            title: "Develop New Skills",
            description: "Gain valuable experience and professional development"
        },
        {
            icon: <FaClock className="text-3xl text-green-600" />,
            title: "Flexible Schedule",
            description: "Choose volunteer opportunities that fit your availability"
        }
    ];

    const programs = [
        { value: "education", label: "Education for All" },
        { value: "healthcare", label: "Healthcare Camps" },
        { value: "women", label: "Women Empowerment" },
        { value: "agriculture", label: "Sustainable Agriculture" },
        { value: "housing", label: "Shelter & Housing" },
        { value: "water", label: "Clean Water & Sanitation" }
    ];

    const availabilityOptions = [
        { value: "weekdays", label: "Weekdays" },
        { value: "weekends", label: "Weekends" },
        { value: "mornings", label: "Mornings" },
        { value: "afternoons", label: "Afternoons" },
        { value: "evenings", label: "Evenings" }
    ];

    if (submitted) {
        return (
            <div>
                <PageHeader
                    title="Application Submitted!"
                    subtitle="Thank you for your interest in volunteering with us"
                    image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=400&fit=crop"
                />
                <Section>
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-12">
                            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Application Successfully Submitted!
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                                Thank you for your interest in volunteering with Sixteensource Foundation. 
                                We have received your application and our team will review it carefully.
                            </p>
                            <div className="bg-white rounded-xl p-6 mb-6 text-left">
                                <h3 className="font-bold text-lg mb-3">What Happens Next?</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Our team will review your application within 3-5 business days
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        You'll receive an email confirmation at {formData.email}
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        If selected, we'll contact you for an orientation session
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Check your spam folder if you don't receive our email
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    onClick={() => setSubmitted(false)}
                                >
                                    Submit Another Application
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="lg"
                                    onClick={() => window.location.href = '/'}
                                >
                                    Return to Home
                                </Button>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title="Become a Volunteer"
                subtitle="Join our team and make a difference in your community"
                image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=400&fit=crop"
            />

            {/* Why Volunteer */}
            <Section>
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Heading
                        title="Why Volunteer With Us?"
                        subtitle="Be part of something meaningful"
                    />
                    <p className="text-gray-600 leading-relaxed">
                        Volunteering with Sixteensource Foundation is more than just giving your time—it's about 
                        being part of a community dedicated to creating lasting change. Join hundreds of volunteers 
                        who are making a real difference every day.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {benefits.map((benefit, idx) => (
                        <Card key={idx} className="text-center">
                            <div className="flex justify-center mb-4">{benefit.icon}</div>
                            <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Volunteer Application Form */}
            <Section bgColor="bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <Heading
                        title="Volunteer Application Form"
                        subtitle="Please fill out all required fields"
                    />

                    <Card className="mt-10">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                                    Personal Information
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <InputField
                                        label="First Name *"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter your first name"
                                        required
                                    />
                                    <InputField
                                        label="Last Name *"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter your last name"
                                        required
                                    />
                                    <InputField
                                        label="Email Address *"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                    <InputField
                                        label="Phone Number *"
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                    <InputField
                                        label="Date of Birth *"
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Gender *
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Address Information */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                                    Address Information
                                </h3>
                                <div className="grid md:grid-cols-1 gap-6">
                                    <InputField
                                        label="Street Address *"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="House number, street name"
                                        required
                                    />
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <InputField
                                            label="City *"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            required
                                        />
                                        <InputField
                                            label="State *"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="State"
                                            required
                                        />
                                        <InputField
                                            label="Pin Code *"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            placeholder="110001"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Volunteer Preferences */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                                    Volunteer Preferences
                                </h3>
                                
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Type of Volunteering *
                                    </label>
                                    <select
                                        name="volunteerType"
                                        value={formData.volunteerType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="">Select volunteer type</option>
                                        <option value="field">Field Work (On-ground activities)</option>
                                        <option value="remote">Remote/Virtual Volunteering</option>
                                        <option value="both">Both Field and Remote</option>
                                        <option value="event">Event-based (Occasional)</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Program Interests * (Select all that apply)
                                    </label>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {programs.map((program) => (
                                            <label key={program.value} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="programInterest"
                                                    value={program.value}
                                                    checked={formData.programInterest.includes(program.value)}
                                                    onChange={handleCheckboxGroup}
                                                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-gray-700">{program.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Availability * (Select all that apply)
                                    </label>
                                    <div className="grid md:grid-cols-3 gap-3">
                                        {availabilityOptions.map((option) => (
                                            <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="availability"
                                                    value={option.value}
                                                    checked={formData.availability.includes(option.value)}
                                                    onChange={handleCheckboxGroup}
                                                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-gray-700">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Experience and Skills */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                                    Experience & Skills
                                </h3>
                                
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Previous Volunteering Experience
                                    </label>
                                    <textarea
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Tell us about any previous volunteering or community service experience..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Skills & Expertise *
                                    </label>
                                    <textarea
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="List your skills (e.g., teaching, medical knowledge, social media, event management, etc.)"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Why do you want to volunteer with us? *
                                    </label>
                                    <textarea
                                        name="motivation"
                                        value={formData.motivation}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Share your motivation and what you hope to achieve through volunteering..."
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                                    Emergency Contact
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Emergency Contact Name *"
                                        name="emergencyContact"
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        placeholder="Full name"
                                        required
                                    />
                                    <InputField
                                        label="Emergency Contact Phone *"
                                        type="tel"
                                        name="emergencyPhone"
                                        value={formData.emergencyPhone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                                    Additional Information
                                </h3>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        How did you hear about us? *
                                    </label>
                                    <select
                                        name="hearAbout"
                                        value={formData.hearAbout}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="social-media">Social Media</option>
                                        <option value="friend">Friend/Family</option>
                                        <option value="website">Website</option>
                                        <option value="event">Event</option>
                                        <option value="newspaper">Newspaper/Magazine</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                                    Terms & Conditions
                                </h3>
                                <div className="space-y-4">
                                    <label className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            name="agreeTerms"
                                            checked={formData.agreeTerms}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-gray-700 text-sm">
                                            I agree to the terms and conditions and understand that volunteering is unpaid. 
                                            I commit to fulfilling my volunteer duties responsibly. *
                                        </span>
                                    </label>
                                    <label className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            name="agreeBackground"
                                            checked={formData.agreeBackground}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-gray-700 text-sm">
                                            I consent to a background verification check if required for my volunteer role. *
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button 
                                    type="submit" 
                                    variant="primary" 
                                    size="lg" 
                                    className="w-full"
                                >
                                    Submit Application
                                </Button>
                                <p className="text-center text-sm text-gray-500 mt-4">
                                    * Required fields
                                </p>
                            </div>
                        </form>
                    </Card>
                </div>
            </Section>

            {/* Contact Section */}
            <Section bgColor="bg-green-600">
                <div className="text-center text-white max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
                    <p className="text-lg mb-6">
                        If you have any questions about volunteering or need help with your application, 
                        our team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="mailto:volunteer@sixteensource.org">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-white text-green-600 hover:bg-gray-100"
                            >
                                Email Us
                            </Button>
                        </a>
                        <a href="tel:+919876543210">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-white text-white hover:bg-green-700"
                            >
                                Call Us
                            </Button>
                        </a>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Volunteer;

