import React, { useEffect } from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import {
    FaGraduationCap,
    FaHandsHelping,
    FaBalanceScale,
    FaMapMarkerAlt,
    FaFileAlt,
    FaCheckCircle
} from "react-icons/fa";
import { getAllOurStories } from "../admin/services/ourStory";
import { getAllTeams } from "../admin/services/team";
import { SERVER_URL } from "../env";
import organizationData from "../data/organization.json";

const About = () => {
    const [story, setStory] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const [storyRes, teamRes] = await Promise.all([
                    getAllOurStories(1, 1),
                    getAllTeams()
                ]);

                if (storyRes.data && storyRes.data.length > 0) {
                    setStory(storyRes.data[0]);
                }

                if (teamRes.data) {
                    setTeamMembers(teamRes.data);
                }
            } catch (error) {
                console.error("Error fetching about page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const visionPoints = [
        {
            icon: <FaGraduationCap className="text-5xl text-green-600 mx-auto mb-4" />,
            title: "Skill Development",
            description: "Enhancing skills for better livelihood opportunities"
        },
        {
            icon: <FaBalanceScale className="text-5xl text-green-600 mx-auto mb-4" />,
            title: "Social Justice",
            description: "Promoting fairness and equality for all"
        },
        {
            icon: <FaHandsHelping className="text-5xl text-green-600 mx-auto mb-4" />,
            title: "Restored Dignity",
            description: "Empowering individuals to regain control over their lives"
        }
    ];

    const trainingCourses = [
        "Beautician Training",
        "Advanced Beautician Course",
        "Mehndi Artist Training",
        "Makeup Artist Training",
        "Life Skills with Leadership Development"
    ];

    const programBenefits = [
        "Industrial Visits",
        "Market Visits",
        "Job Placement Assistance",
        "Professional Certification"
    ];


    const legalRegistrations = [
        "Registered under 1860 Act",
        "Registered under 1950 Act",
        "PAN Card Available"
    ];

    return (
        <div>
            <PageHeader
                title="About Sixteen Source Foundation"
                subtitle="Empowering rural communities towards self-reliance and sustainable development"
                image="/assets/GalleryImg/13.jpeg"
            />

            {/* Mission Statement */}
            <Section>
                <div className="max-w-4xl mx-auto">
                    <Heading title={story?.title || "Our Mission"} />
                    <p className="text-gray-700 leading-relaxed text-lg mt-6">
                        {story?.ourMission || ""}
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-gray-700">
                        <FaMapMarkerAlt className="text-green-600" />
                        <span className="font-semibold">Coverage Area:</span>
                        <span>Vadala to Panvel</span>
                    </div>
                </div>
            </Section>

            {/* Vision */}
            <Section bgColor="bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <Heading
                        title="Our Vision"
                        subtitle="Enabling poor rural households and communities to be self-reliant and sustainable"
                    />
                    <div className="grid md:grid-cols-3 gap-8 mt-10">
                        {visionPoints.map((point, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                {point.icon}
                                <h4 className="text-lg font-bold mb-2">{point.title}</h4>
                                <p className="text-gray-600">{point.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Our Journey Section (Dynamic) */}
            <Section>
                <div className="max-w-5xl mx-auto">
                    <Heading
                        title="Our Journey"
                        subtitle={story?.title || "Transforming lives and building stronger communities"}
                    />

                    <div className="grid md:grid-cols-2 gap-12 mt-10 items-center">
                        <div className="space-y-6">
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {story?.ourJourney || ""}
                            </p>
                            {story?.ourStrategy && story.ourStrategy.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="font-bold text-xl text-gray-800">Our Strategy</h4>
                                    <ul className="space-y-3">
                                        {story.ourStrategy.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {story?.video && (
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                <video
                                    src={story.video.startsWith('http') ? story.video : `${SERVER_URL}/${story.video}`}
                                    className="w-full h-full object-cover"
                                    controls
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* Main Program */}
            <Section>
                <div className="max-w-5xl mx-auto">
                    <Heading
                        title="Beauty & Wellness Training Program"
                        subtitle="Our flagship program for skill development and employment"
                    />

                    <Card className="mt-8">
                        <div className="border-l-4 border-green-600 pl-6">
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We provide quality training in beauty and wellness, enabling participants
                                to secure employment or establish their own businesses. Our goal is to help
                                them achieve economic independence and social dignity.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <FaCheckCircle className="text-green-600" />
                                        Training Courses Offered
                                    </h4>
                                    <ul className="space-y-2 text-gray-700">
                                        {trainingCourses.map((course, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-green-600 mt-1">•</span>
                                                <span>{course}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <FaCheckCircle className="text-green-600" />
                                        Program Benefits
                                    </h4>
                                    <ul className="space-y-2 text-gray-700">
                                        {programBenefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-green-600 mt-1">•</span>
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </Section>

            {/* Management Committee */}
            {teamMembers.length > 0 && (
                <Section bgColor="bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <Heading
                            title="Management Committee"
                            subtitle="Dedicated leaders driving our mission"
                        />
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                            {teamMembers.map((member, index) => (
                                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={`${SERVER_URL}${member.photo}`}
                                            alt={member.name}
                                            className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-gray-200"
                                        />
                                        <h4 className="font-bold text-gray-800 mb-1">{member.name}</h4>
                                        <p className="text-green-600 font-medium text-sm">{member.designation}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            {/* Contact Information */}
            <Section>
                <div className="max-w-5xl mx-auto">
                    <Heading
                        title="Contact & Registration Details"
                        subtitle="Legally registered and committed to transparency"
                    />
                    <div className="grid md:grid-cols-2 gap-8 mt-10">
                        <Card className="hover:shadow-lg transition-shadow">
                            <div className="flex gap-4">
                                <FaMapMarkerAlt className="text-green-600 text-2xl flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg mb-3">Registered Address</h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        PMGP Colony, Mankhurd West<br />
                                        Mumbai - 400043<br />
                                        Maharashtra, India
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <div className="flex gap-4">
                                <FaFileAlt className="text-green-600 text-2xl flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg mb-3">Legal Registration</h4>
                                    <ul className="text-gray-700 space-y-2">
                                        {legalRegistrations.map((registration, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                                                {registration}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default About;
