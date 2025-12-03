import React, { useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import { FaHeart, FaGraduationCap, FaHeartbeat, FaHome, FaCheckCircle } from "react-icons/fa";
import DonateSection from "../components/home/DonateSection";

const Donate = () => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const causes = [
        {
            icon: <FaGraduationCap className="text-4xl text-green-600" />,
            title: "Education Fund",
            description: "Help us provide quality education to underprivileged children",
            impact: "₹5,000 educates a child for a year"
        },
        {
            icon: <FaHeartbeat className="text-4xl text-green-600" />,
            title: "Healthcare Support",
            description: "Support medical camps and healthcare programs",
            impact: "₹2,000 funds a medical camp"
        },
        {
            icon: <FaHome className="text-4xl text-green-600" />,
            title: "Shelter & Relief",
            description: "Build homes and provide disaster relief",
            impact: "₹50,000 builds a home"
        },
        {
            icon: <FaHeart className="text-4xl text-green-600" />,
            title: "General Fund",
            description: "Support all our programs where needed most",
            impact: "Any amount makes a difference"
        }
    ];

    const benefits = [
        "80G Tax Exemption Certificate",
        "Regular updates on impact",
        "Transparency in fund utilization",
        "Recognition on our donor wall",
        "Invitation to annual events"
    ];

    const handleDonate = () => {
        const amount = selectedAmount || customAmount;
        if (!amount || amount <= 0) {
            alert("Please select or enter a valid donation amount");
            return;
        }
        alert(`Thank you for your donation of ₹${amount}! Redirecting to payment gateway...`);
    };

    return (
        <div>
            <PageHeader
                // title="Make a Donation"
                // subtitle="Your generosity changes lives. Every rupee counts."
                image="/assets/sbanner.jpg"
            />

            {/* Donation Form */}
            <Section>
                <DonateSection />

            </Section>

            {/* Where Your Money Goes */}
            <Section bgColor="bg-gray-50">
                <Heading
                    title="Support a Cause"
                    subtitle="Choose where your donation makes the most impact"
                />
                <div className="grid md:grid-cols-2 gap-6 mt-10">
                    {causes.map((cause, index) => (
                        <Card key={index}>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">{cause.icon}</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{cause.title}</h3>
                                    <p className="text-gray-600 mb-2">
                                        {cause.description}
                                    </p>
                                    <p className="text-green-600 font-semibold text-sm">
                                        {cause.impact}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Donor Benefits */}
            <Section>
                <Heading
                    title="Donor Benefits"
                    subtitle="What you receive when you donate"
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10 max-w-5xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="text-center">
                            <FaCheckCircle className="text-3xl text-green-500 mx-auto mb-3" />
                            <p className="text-gray-700 text-sm">{benefit}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Other Ways to Give */}
            <Section bgColor="bg-gray-50">
                <Heading
                    title="Other Ways to Support"
                    subtitle="Can't donate online? Here are alternatives"
                />
                <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
                    <Card>
                        <h3 className="text-lg font-bold mb-3">Bank Transfer</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            <strong>Bank:</strong> State Bank of India
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <strong>Account:</strong> 123456789012
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>IFSC:</strong> SBIN0001234
                        </p>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-bold mb-3">UPI Payment</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Scan the QR code or use our UPI ID
                        </p>
                        <p className="text-green-600 font-semibold">
                            donate@sixteensource
                        </p>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-bold mb-3">In-Kind Donations</h3>
                        <p className="text-sm text-gray-600">
                            Books, clothes, food, medicines, and other materials are always welcome.
                            Contact us for details.
                        </p>
                    </Card>
                </div>
            </Section>

            {/* Transparency */}
            <Section bgColor="bg-green-600">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">100% Transparent</h2>
                    <p className="text-lg mb-4 max-w-3xl mx-auto">
                        We believe in complete transparency. Every donation is tracked and reported.
                        Annual financial reports are publicly available on our website.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                            <h3 className="text-4xl font-bold mb-2">85%</h3>
                            <p className="text-lg">Directly to Programs</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                            <h3 className="text-4xl font-bold mb-2">10%</h3>
                            <p className="text-lg">Operations</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                            <h3 className="text-4xl font-bold mb-2">5%</h3>
                            <p className="text-lg">Future Growth</p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Donate;
