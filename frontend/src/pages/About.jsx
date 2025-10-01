import React from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import { FaHeart, FaHandsHelping, FaGlobe, FaUsers } from "react-icons/fa";

const About = () => {
    const values = [
        {
            icon: <FaHeart className="text-4xl text-green-600" />,
            title: "Compassion",
            description: "We believe in leading with empathy and kindness in every action."
        },
        {
            icon: <FaHandsHelping className="text-4xl text-green-600" />,
            title: "Collaboration",
            description: "Together we achieve more. We value partnerships and teamwork."
        },
        {
            icon: <FaGlobe className="text-4xl text-green-600" />,
            title: "Impact",
            description: "Creating sustainable and measurable change in communities."
        },
        {
            icon: <FaUsers className="text-4xl text-green-600" />,
            title: "Inclusivity",
            description: "Every voice matters. We serve and include everyone equally."
        }
    ];

    const team = [
        {
            name: "Rajesh Kumar",
            role: "Founder & Director",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
        },
        {
            name: "Priya Sharma",
            role: "Program Manager",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
        },
        {
            name: "Amit Patel",
            role: "Community Outreach",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
        },
        {
            name: "Sneha Gupta",
            role: "Finance Director",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
        }
    ];

    return (
        <div>
            <PageHeader
                title="About Sixteensource Foundation"
                subtitle="Empowering communities through education, healthcare, and sustainable development"
                image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=400&fit=crop"
            />

            {/* Mission & Vision */}
            <Section>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To empower underprivileged communities by providing access to quality education,
                            healthcare, and livelihood opportunities. We strive to create sustainable impact
                            through grassroots interventions and community-driven programs.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Our Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                            A world where every individual has equal opportunities to thrive, regardless of
                            their socio-economic background. We envision communities that are self-reliant,
                            healthy, educated, and empowered to shape their own futures.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Core Values */}
            <Section bgColor="bg-gray-50">
                <Heading title="Our Core Values" subtitle="The principles that guide our work" />
                <div className="grid md:grid-cols-4 gap-8 mt-10">
                    {values.map((value, index) => (
                        <Card key={index} className="text-center">
                            <div className="flex justify-center mb-4">{value.icon}</div>
                            <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                            <p className="text-gray-600 text-sm">
                                {value.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Our Story */}
            <Section>
                <Heading title="Our Story" subtitle="How we started and where we're going" />
                <div className="max-w-4xl mx-auto text-gray-700 space-y-4 leading-relaxed">
                    <p>
                        Sixteensource Foundation was born out of a simple belief: that every individual deserves
                        a chance to live with dignity and opportunity. Founded in 2010 by a group of passionate
                        social workers, we started with a small literacy program in a single village.
                    </p>
                    <p>
                        Over the years, we've grown into a comprehensive development organization working across
                        education, healthcare, women empowerment, and sustainable livelihoods. Today, we serve
                        over 50 communities, impacting thousands of lives every year.
                    </p>
                    <p>
                        Our journey has been made possible by the dedication of our volunteers, the generosity of
                        our donors, and most importantly, the trust and participation of the communities we serve.
                    </p>
                </div>
            </Section>

            {/* Team */}
            <Section bgColor="bg-gray-50">
                <Heading title="Meet Our Team" subtitle="The passionate people driving change" />
                <div className="grid md:grid-cols-4 gap-8 mt-10">
                    {team.map((member, index) => (
                        <Card key={index} className="text-center">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h4 className="text-lg font-semibold">{member.name}</h4>
                            <p className="text-green-600 text-sm">{member.role}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default About;
