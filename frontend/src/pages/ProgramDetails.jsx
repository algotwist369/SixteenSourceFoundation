import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import ProgramCard from "../components/programs/ProgramCard";
import programsData from "../data/programs.json";
import { 
    FaBook, FaHeartbeat, FaUserGraduate, FaSeedling, FaHome, FaWater,
    FaArrowLeft, FaCheckCircle, FaHandsHelping, FaDonate, FaBullhorn 
} from "react-icons/fa";

const iconMap = {
    FaBook: FaBook,
    FaHeartbeat: FaHeartbeat,
    FaUserGraduate: FaUserGraduate,
    FaSeedling: FaSeedling,
    FaHome: FaHome,
    FaWater: FaWater
};

const ProgramDetails = () => {
    const { slug } = useParams();
    const { programs } = programsData;
    
    const program = programs.find(p => p.slug === slug);
    
    // If program not found, redirect to programs page
    if (!program) {
        return <Navigate to="/programs" replace />;
    }

    const IconComponent = iconMap[program.icon] || FaBook;
    
    // Get related programs (exclude current program)
    const relatedPrograms = programs
        .filter(p => p.id !== program.id)
        .slice(0, 3);

    const getInvolvedOptions = [
        {
            icon: <FaDonate className="text-3xl text-green-600" />,
            title: "Donate",
            description: "Support this program with a financial contribution",
            action: "Donate Now",
            link: "/donate"
        },
        {
            icon: <FaHandsHelping className="text-3xl text-green-600" />,
            title: "Volunteer",
            description: "Join our team and contribute your time and skills",
            action: "Apply Now",
            link: "/get-involved"
        },
        {
            icon: <FaBullhorn className="text-3xl text-green-600" />,
            title: "Spread Awareness",
            description: "Share this program with your network",
            action: "Share",
            link: "#"
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 lg:px-24">
                    <Link 
                        to="/programs" 
                        className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
                    >
                        <FaArrowLeft /> Back to Programs
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl">
                            <IconComponent className="text-4xl text-white" />
                        </div>
                        <div className="bg-green-600 px-6 py-2 rounded-full">
                            <p className="text-white font-bold">{program.impact.number}</p>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl max-w-3xl">
                        {program.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow-lg">
                        {program.shortDescription}
                    </p>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <Section bgColor="bg-green-600">
                <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {program.stats.map((stat, idx) => (
                        <div key={idx} className="text-center text-white">
                            <p className="text-4xl font-bold mb-2">{stat.value}</p>
                            <p className="text-lg">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Program Overview */}
            <Section>
                <div className="max-w-4xl mx-auto">
                    <Heading
                        title="About This Program"
                        subtitle="Making a difference through targeted interventions"
                    />
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            {program.description}
                        </p>
                        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                            <p className="text-green-800 font-semibold text-lg">
                                Impact: {program.impact.text}
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* What We Do */}
            <Section bgColor="bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <Heading
                        title="What We Do"
                        subtitle="Our comprehensive approach to this program"
                    />
                    <div className="grid md:grid-cols-2 gap-6 mt-10">
                        {program.features.map((feature, idx) => (
                            <div 
                                key={idx}
                                className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow"
                            >
                                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                                    <FaCheckCircle className="text-green-600 text-xl" />
                                </div>
                                <div>
                                    <p className="text-gray-800 font-medium">{feature}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Impact Stories */}
            <Section>
                <div className="max-w-4xl mx-auto">
                    <Heading
                        title="Impact Stories"
                        subtitle="Real people, real change"
                    />
                    <div className="grid md:grid-cols-2 gap-8 mt-10">
                        <Card>
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop"
                                    alt="Beneficiary"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-lg">Priya Sharma</h4>
                                    <p className="text-sm text-gray-600">Program Beneficiary</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic mb-4">
                                "This program has completely transformed my life and my family's future. 
                                I'm now able to support my children's education and have hope for tomorrow."
                            </p>
                            <div className="bg-green-50 p-3 rounded-lg">
                                <p className="text-green-700 font-semibold text-sm">
                                    Beneficiary since 2022
                                </p>
                            </div>
                        </Card>
                        <Card>
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
                                    alt="Volunteer"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-lg">Rajesh Kumar</h4>
                                    <p className="text-sm text-gray-600">Volunteer Coordinator</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic mb-4">
                                "Working with this program has been incredibly rewarding. Seeing the positive 
                                changes in the community motivates me every day."
                            </p>
                            <div className="bg-green-50 p-3 rounded-lg">
                                <p className="text-green-700 font-semibold text-sm">
                                    Volunteer since 2020
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </Section>

            {/* How You Can Help */}
            <Section bgColor="bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <Heading
                        title="Get Involved"
                        subtitle="Ways you can support this program"
                    />
                    <div className="grid md:grid-cols-3 gap-8 mt-10">
                        {getInvolvedOptions.map((option, idx) => (
                            <Card key={idx} className="text-center">
                                <div className="flex justify-center mb-4">
                                    {option.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                                <p className="text-gray-600 mb-6">
                                    {option.description}
                                </p>
                                <Link to={option.link}>
                                    <Button 
                                        variant="primary" 
                                        size="md" 
                                        className="w-full"
                                    >
                                        {option.action}
                                    </Button>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Related Programs */}
            {relatedPrograms.length > 0 && (
                <Section>
                    <div className="max-w-6xl mx-auto">
                        <Heading
                            title="Other Programs"
                            subtitle="Explore more ways we're creating impact"
                        />
                        <div className="grid md:grid-cols-3 gap-8 mt-10">
                            {relatedPrograms.map((relatedProgram) => (
                                <ProgramCard key={relatedProgram.id} program={relatedProgram} />
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link to="/programs">
                                <Button variant="outline" size="lg">
                                    View All Programs
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Section>
            )}

            {/* CTA Section */}
            <Section bgColor="bg-gradient-to-r from-green-500 to-green-600">
                <div className="text-center text-white max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-lg mb-8">
                        Your support can help us expand this program and reach more people in need.
                        Join us in creating lasting change.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/donate">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-white text-green-600 hover:bg-gray-100"
                            >
                                Support This Program
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-white text-white hover:bg-green-700"
                            >
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ProgramDetails;

