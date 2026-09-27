import React, { useEffect } from "react";
import Section from "../components/common/Section";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import { FaHeart, FaGraduationCap, FaFileAlt, FaChartLine, FaUsers, FaCertificate } from "react-icons/fa";
import DonateSection from "../components/home/DonateSection";
import SuccessStories from "../components/home/SuccessStories";
import organizationData from "../data/organization.json";

const Donate = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const causes = [
        {
            icon: <FaGraduationCap className="text-4xl text-green-600" />,
            title: "Beauty & Wellness Training",
            description: "Support beautician, advanced beautician, mehndi, and makeup artist training for women and girls.",
            impact: "Help learners build practical skills for employment and self-employment."
        },
        {
            icon: <FaHeart className="text-4xl text-green-600" />,
            title: "Tailoring & Aari Work",
            description: "Contribute to hands-on tailoring and Aari-work training pathways.",
            impact: "Support practical skills development and livelihood opportunities."
        },
        {
            icon: <FaGraduationCap className="text-4xl text-green-600" />,
            title: "Life Skills & Leadership",
            description: "Help include life-skills and leadership development alongside vocational training.",
            impact: "Contribute to learners' confidence and readiness for work."
        }
    ];

    const benefits = [
        {
            icon: <FaFileAlt />,
            title: "Donation Receipt",
            description: "We will provide an official receipt for your contribution."
        },
        {
            icon: <FaChartLine />,
            title: "Fund Utilisation Updates",
            description: "We share updates on how your support is utilised."
        },
        {
            icon: <FaUsers />,
            title: "Impact Updates",
            description: "We keep you informed about our program impact."
        },
        {
            icon: <FaCertificate />,
            title: "80G Tax Benefit (if applicable)",
            description: "Donations may be eligible for an 80G tax benefit, where applicable."
        }
    ];


    return (
        <div>
            {/* Donation Form */}
            <Section>
                <DonateSection />

            </Section>

            {/* Where Your Money Goes */}
            <Section bgColor="bg-gray-50">
                <Heading
                    title="Support Skills & Livelihoods"
                    subtitle="Your contribution can support the training pathways currently offered by Sixteensource Foundation."
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
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10 max-w-7xl mx-auto">
                    {benefits.map((benefit) => (
                        <Card key={benefit.title} className="h-full border border-green-100 p-5 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-50 text-2xl text-white">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold leading-snug text-gray-900">{benefit.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">{benefit.description}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Transparency */}
            <Section bgColor="bg-green-600">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Transparent Giving</h2>
                    <p className="text-lg max-w-3xl mx-auto">
                        Contact us for information about how donations support our training activities and to request available financial and registration documents.
                    </p>
                    <a
                        href={`mailto:${organizationData.contact.email}?subject=${encodeURIComponent("Donation and document enquiry")}`}
                        className="inline-flex mt-6 rounded border border-white px-5 py-3 font-semibold text-white hover:bg-white hover:text-green-700 transition-colors"
                    >
                        Contact the Foundation
                    </a>
                </div>
            </Section>

            <SuccessStories
                title="Donor & Beneficiary Testimonials"
                subtitle="Hear directly from people who support and take part in our work."
            />
        </div>
    );
};

export default Donate;
