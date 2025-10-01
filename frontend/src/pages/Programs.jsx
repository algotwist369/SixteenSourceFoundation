import React from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import ProgramCard from "../components/programs/ProgramCard";
import { Link } from "react-router-dom";
import programsData from "../data/programs.json";

const Programs = () => {
    const { programs } = programsData;
    
    // Featured programs (first 3)
    const featuredPrograms = programs.slice(0, 3);
    
    // Other programs
    const otherPrograms = programs.slice(3);

    return (
        <div>
            <PageHeader
                title="Our Programs"
                subtitle="Creating lasting impact through focused interventions"
                image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=400&fit=crop"
            />

            {/* Overview Section */}
            <Section>
                <div className="text-center max-w-4xl mx-auto">
                    <Heading
                        title="Transforming Lives Through Action"
                        subtitle="Our comprehensive programs address the root causes of poverty and inequality"
                    />
                    <p className="text-gray-600 leading-relaxed">
                        At Sixteensource Foundation, we believe in holistic development. Our programs span education, 
                        healthcare, women empowerment, sustainable agriculture, housing, and sanitation. Each initiative 
                        is designed to create sustainable change and empower communities to build better futures.
                    </p>
                </div>

                {/* Impact Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
                        <p className="text-3xl font-bold text-blue-600">6</p>
                        <p className="text-sm text-gray-600 mt-1">Active Programs</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                        <p className="text-3xl font-bold text-green-600">50+</p>
                        <p className="text-sm text-gray-600 mt-1">Communities</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                        <p className="text-3xl font-bold text-green-600">25K+</p>
                        <p className="text-sm text-gray-600 mt-1">Lives Impacted</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl text-center">
                        <p className="text-3xl font-bold text-pink-600">8</p>
                        <p className="text-sm text-gray-600 mt-1">States</p>
                    </div>
                </div>
            </Section>

            {/* Featured Programs */}
            <Section bgColor="bg-gray-50">
                <Heading
                    title="Featured Programs"
                    subtitle="Our flagship initiatives making the biggest impact"
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {featuredPrograms.map((program) => (
                        <ProgramCard key={program.id} program={program} featured={true} />
                    ))}
                </div>
            </Section>

            {/* Other Programs */}
            <Section>
                <Heading
                    title="Additional Programs"
                    subtitle="More ways we're creating sustainable change"
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {otherPrograms.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))}
                </div>
            </Section>

            {/* How We Work */}
            <Section bgColor="bg-gray-50">
                <Heading
                    title="Our Approach"
                    subtitle="How we ensure sustainable impact"
                />
                <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🎯</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Identify Needs</h3>
                        <p className="text-gray-600 text-sm">
                            We conduct thorough community assessments to understand real needs and priorities.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🤝</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Collaborate</h3>
                        <p className="text-gray-600 text-sm">
                            We partner with communities, local leaders, and stakeholders for inclusive solutions.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📊</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Measure Impact</h3>
                        <p className="text-gray-600 text-sm">
                            We track outcomes and continuously improve our programs based on data and feedback.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Success Stories Preview */}
            <Section>
                <Heading
                    title="Stories of Change"
                    subtitle="Real impact from our programs"
                />
                <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=300&fit=crop"
                            alt="Success Story"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h4 className="text-lg font-bold mb-2">From Student to Teacher</h4>
                            <p className="text-gray-600 text-sm mb-3">
                                "The scholarship program helped me complete my education. Now I'm teaching 
                                in the same village school where I studied."
                            </p>
                            <p className="text-green-600 font-semibold text-sm">- Priya, Education Program</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=300&fit=crop"
                            alt="Success Story"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h4 className="text-lg font-bold mb-2">Building Dreams</h4>
                            <p className="text-gray-600 text-sm mb-3">
                                "The tailoring training gave me skills to start my own business. I now employ 
                                5 other women from my community."
                            </p>
                            <p className="text-green-600 font-semibold text-sm">- Meera, Women Empowerment</p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <Link to="/impact">
                        <Button variant="outline" size="lg">
                            View All Success Stories
                        </Button>
                    </Link>
                </div>
            </Section>

            {/* Call to Action */}
            <Section bgColor="bg-gradient-to-r from-green-500 to-green-600">
                <div className="text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Our Programs</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Your contribution helps us expand our reach and impact more lives.
                        Every donation makes a difference in someone's life.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/donate">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-white text-green-600 hover:bg-gray-100"
                            >
                                Donate Now
                            </Button>
                        </Link>
                        <Link to="/get-involved">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-white text-white hover:bg-green-700"
                            >
                                Volunteer With Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Programs;
