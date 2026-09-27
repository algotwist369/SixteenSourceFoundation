import React, { useState, useEffect } from "react";
import Section from "../components/common/Section";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import {
    FaGraduationCap,
    FaHandsHelping,
    FaBalanceScale,
    FaMapMarkerAlt,
    FaFileAlt,
    FaCheckCircle,
    FaUsers,
    FaArrowRight
} from "react-icons/fa";
import { getAllOurStories } from "../admin/services/ourStory";
import { getAllTeams } from "../admin/services/team";
import { SERVER_URL } from "../env";
import { getYouTubeEmbedUrl } from "../utils/youtube";
import organizationData from "../data/organization.json";

const About = () => {
    const [story, setStory] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);

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
            }
        };

        fetchData();
    }, []);

    const visionPoints = [
        {
            icon: <FaGraduationCap className="text-3xl text-emerald-600" />,
            title: "Skill Development",
            description: "Build practical skills that create livelihood opportunities and long-term confidence."
        },
        {
            icon: <FaBalanceScale className="text-3xl text-emerald-600" />,
            title: "Social Justice",
            description: "Champion equity, dignity, and fair access for communities facing social and economic barriers."
        },
        {
            icon: <FaHandsHelping className="text-3xl text-emerald-600" />,
            title: "Restored Dignity",
            description: "Support people in reclaiming independence, purpose, and a stronger sense of self-worth."
        }
    ];

    const trainingCourses = [
        "Beautician Training",
        "Advanced Beautician Course",
        "Mehndi Artist Training",
        "Makeup Artist Training",
        "Life Skills with Leadership Development",
        "Tailoring Training",
        "Aari work Training"
    ];

    const programBenefits = [
        "Industrial Visits",
        "Market Visits",
        "Job Placement Assistance",
        "Professional Certification"
    ];

    const legalDocuments = [
        "CSR-1 Registration",
        "NGO Darpan Registration",
        "12A Registration",
        "80G Registration",
        "Audit Report",
        "Registration Certificate",
        "Annual Report"
    ];
    const whatsappNumber = organizationData.contact.phone.replace(/\D/g, "");

    return (
        <div className="bg-slate-50 text-slate-800">
            <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-slate-100">
                <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
                    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
                        <div>
                            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
                                About us
                            </span>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                {story?.title || "Our Mission"}
                            </h1>
                            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                                {story?.ourMission || "We work to strengthen vulnerable communities through skill-building, leadership, and sustainable opportunities that create lasting dignity and self-reliance."}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-700">
                                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                                    <FaMapMarkerAlt className="text-green-600" />
                                    <span className="font-medium">Coverage: Vadala to Panvel</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                                    <FaUsers className="text-green-600" />
                                    <span className="font-medium">Community-centered support</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                            <div className="space-y-5">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Our purpose</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Empowering people to thrive with dignity.</h2>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-green-50 p-4">
                                        <p className="text-2xl font-bold text-slate-900">3</p>
                                        <p className="mt-1 text-sm text-slate-600">Core impact areas</p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-100 p-4">
                                        <p className="text-2xl font-bold text-slate-900">7+</p>
                                        <p className="mt-1 text-sm text-slate-600">Training pathways</p>
                                    </div>
                                </div>

                                <ul className="space-y-3 text-slate-600">
                                    {visionPoints.map((point) => (
                                        <li key={point.title} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                                            <span className="mt-1 rounded-full bg-white p-2 shadow-sm">{point.icon}</span>
                                            <span>{point.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Section bgColor="bg-white">
                <div className="max-w-6xl mx-auto">
                    <Heading
                        title="Our Vision"
                        subtitle="Enabling poor rural households and communities to be self-reliant and sustainable"
                    />
                    <div className="grid md:grid-cols-3 gap-6 mt-10">
                        {visionPoints.map((point, index) => (
                            <Card key={index} className="h-full border border-slate-200 bg-slate-50/60 p-6 text-left hover:shadow-lg transition-all duration-300">
                                <div className="mb-4 inline-flex rounded-2xl bg-white p-3 shadow-sm">{point.icon}</div>
                                <h3 className="text-xl font-semibold text-slate-900">{point.title}</h3>
                                <p className="mt-3 text-base leading-7 text-slate-600">{point.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </Section>

            <Section bgColor="bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900">Our Journey</h2>
                        <div className="mt-2 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                            <span>{story?.title || "Our story"}</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                            <span>NGO</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
                        <div className="space-y-6">
                            <div className="rounded-[26px] border border-slate-200 bg-[#f7f7f4] p-7 shadow-sm lg:p-8">
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="inline-flex items-center rounded-full bg-[#f2f4ef] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-700 border border-slate-200">
                                        Our Story
                                    </span>
                                </div>

                                <p className="text-base leading-8 text-slate-700">
                                    {story?.ourJourney || "We believe lasting change happens when communities are equipped with skills, opportunities, and confidence to move forward. Over time, we have built a trusted pathway for women and families to access practical training, mentoring, and meaningful support."}
                                </p>
                            </div>

                            {story?.ourStrategy && story.ourStrategy.length > 0 && (
                                <div className="rounded-[26px] border border-slate-200 bg-[#f7f7f4] p-7 shadow-sm lg:p-8">
                                    <h3 className="mb-4 text-xl font-bold text-slate-900">Our Strategy</h3>
                                    <ul className="space-y-4 text-slate-700">
                                        {story.ourStrategy.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-[15px] leading-7">
                                                <span className="mt-2 h-2 w-2 rounded-full bg-green-600 shrink-0"></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {story?.video && (() => {
                            const embedUrl = getYouTubeEmbedUrl(story.video);
                            const isYouTube = embedUrl && embedUrl.includes("youtube.com/embed/");

                            return (
                                <div className="rounded-[26px] border border-slate-200 bg-[#f7f7f4] p-3 shadow-sm">
                                    <div className="mb-3 flex items-center justify-between px-2 pt-1">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Video</span>
                                    </div>
                                    <div className="relative overflow-hidden rounded-[20px] bg-slate-200 aspect-video">
                                        {isYouTube ? (
                                            <iframe
                                                src={embedUrl}
                                                className="h-full w-full"
                                                title="Our story video"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <video
                                                src={story.video.startsWith("http") ? story.video : `${SERVER_URL}/${story.video}`}
                                                className="h-full w-full object-cover"
                                                controls
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </Section>

            <Section bgColor="bg-white">
                <div className="max-w-6xl mx-auto">
                    <Heading
                        title="Beauty & Wellness Training Program"
                        subtitle="Our flagship program designed to build employability and confidence"
                    />

                    <Card className="mt-8 border border-slate-200 bg-slate-50/70 p-0 overflow-hidden">
                        <div className="grid lg:grid-cols-[1.4fr_1fr]">
                            <div className="p-8 lg:p-10">
                                <p className="text-lg leading-8 text-slate-600">
                                    We provide quality training in beauty and wellness, enabling participants to secure employment or establish their own businesses. Our goal is to help them achieve economic independence and social dignity.
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-green-700">
                                    <FaArrowRight />
                                    Program focus
                                </div>
                            </div>

                            <div className="bg-green-600 p-8 text-white lg:p-10">
                                <h3 className="text-xl font-semibold">What participants gain</h3>
                                <ul className="mt-6 space-y-3 text-green-50">
                                    {programBenefits.map((benefit, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <FaCheckCircle className="text-white" />
                                            <span className="text-white">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 border-t border-slate-200 p-8 lg:p-10">
                            <div>
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                                    <FaCheckCircle className="text-green-600" />
                                    Training courses offered
                                </h4>
                                <ul className="space-y-3 text-slate-600">
                                    {trainingCourses.map((course, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                            <span>{course}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                                    <FaCheckCircle className="text-green-600" />
                                    Expected outcomes
                                </h4>
                                <ul className="space-y-3 text-slate-600">
                                    {programBenefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>
            </Section>

            {teamMembers.length > 0 && (
                <Section bgColor="bg-slate-50">
                    <div className="max-w-6xl mx-auto">
                        <Heading
                            title="Management Committee"
                            subtitle="Dedicated leaders guiding our work and community outreach"
                        />
                        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {teamMembers.map((member, index) => (
                                <Card key={index} className="border border-slate-200 bg-white p-5 text-center hover:shadow-lg transition-all duration-300">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={member.photo?.startsWith("http") ? member.photo : `${SERVER_URL}/${member.photo?.startsWith("/") ? member.photo.substring(1) : member.photo}`}
                                            alt={member.name}
                                            className="h-28 w-28 rounded-full object-cover border-4 border-green-100 shadow-sm"
                                        />
                                        <h4 className="mt-4 text-lg font-semibold text-slate-900">{member.name}</h4>
                                        <p className="mt-1 text-sm font-medium text-green-700">{member.designation}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            <Section bgColor="bg-white">
                <div className="max-w-6xl mx-auto">
                    <Heading
                        title="Contact & Legal Documents"
                        subtitle="Contact us to request copies of our registration and compliance documents."
                    />

                    <div className="mt-10 grid lg:grid-cols-2 gap-6">
                        <Card className="border border-slate-200 bg-slate-50/60 p-6 hover:shadow-lg transition-shadow">
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white-100 text-green-700">
                                    <FaMapMarkerAlt className="text-4xl" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">Registered Address</h4>
                                    <p className="mt-3 text-slate-600 leading-7">
                                        Dr. Hedgewar Vidyalaya, Building No. 106, behind New MHADA Colony, PMGP, Mankhurd West, Mumbai - 400043, Maharashtra
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div id="legal-documents" className="scroll-mt-20">
                            <Card className="border border-slate-200 bg-slate-50/60 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white-100 text-green-700">
                                        <FaFileAlt className="text-4xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-900">Registration & Reports</h4>
                                        <ul className="mt-3 space-y-2">
                                            {legalDocuments.map((document) => (
                                                <li key={document}>
                                                    <a
                                                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Sixteensource Foundation, I would like to request a copy of the ${document}. Could you please share it with me?`)}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center justify-between gap-3 text-slate-700 hover:text-green-700"
                                                    >
                                                        <span>{document}</span>
                                                        <span className="shrink-0 text-sm font-medium text-green-700">Request on WhatsApp</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default About;
