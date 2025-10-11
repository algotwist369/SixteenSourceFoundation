import React from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Card from "../components/common/Card";
import organizationData from "../data/organization.json";

const Team = () => {
    const { team } = organizationData;

    return (
        <div>
            <PageHeader
                title="Our Team"
                subtitle="Meet the dedicated individuals driving positive change"
                image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop"
            />

            <Section>
                <Heading
                    title="Leadership Team"
                    subtitle="Experienced professionals committed to our mission"
                />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                    {team.map((member) => (
                        <Card key={member.name} className="text-center">
                            <div className="mb-6">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                            <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {member.bio}
                            </p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section bgColor="bg-gray-50">
                <Heading
                    title="Join Our Team"
                    subtitle="Be part of something meaningful"
                />
                <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
                    <Card className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">👥</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Field Staff</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Work directly with communities to implement our programs and create lasting impact.
                        </p>
                        <button className="text-green-600 font-semibold text-sm hover:text-green-700">
                            View Openings →
                        </button>
                    </Card>
                    <Card className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">💼</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Office Positions</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Support our operations through administrative, communications, and management roles.
                        </p>
                        <button className="text-green-600 font-semibold text-sm hover:text-green-700">
                            View Openings →
                        </button>
                    </Card>
                    <Card className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🎓</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Internships</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Gain valuable experience while contributing to meaningful social change initiatives.
                        </p>
                        <button className="text-green-600 font-semibold text-sm hover:text-green-700">
                            Apply Now →
                        </button>
                    </Card>
                </div>
            </Section>

            <Section>
                <div className="text-center max-w-4xl mx-auto">
                    <Heading
                        title="Our Values"
                        subtitle="What drives us every day"
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h4 className="font-bold text-lg mb-2">Passion</h4>
                            <p className="text-gray-600 text-sm">
                                We're driven by a deep commitment to creating positive change in communities.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h4 className="font-bold text-lg mb-2">Integrity</h4>
                            <p className="text-gray-600 text-sm">
                                We maintain the highest ethical standards in all our operations and interactions.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h4 className="font-bold text-lg mb-2">Collaboration</h4>
                            <p className="text-gray-600 text-sm">
                                We believe in the power of working together with communities and partners.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Team;


