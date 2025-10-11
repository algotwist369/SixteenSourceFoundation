import React, { useState, useEffect } from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { Link } from "react-router-dom";
import programsData from "../data/programs.json";
import organizationData from "../data/organization.json";
import pageHeaders from "../data/pageHeaders.json";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById(`counter-${end}`);
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [end]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime = null;
        const animate = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * end);
            
            setCount(currentCount);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return (
        <span id={`counter-${end}`} className="text-3xl font-bold text-green-600 mb-2">
            {count.toLocaleString()}{suffix}
        </span>
    );
};

const OurInitiative = () => {
    const { programs } = programsData;
    const { stats } = organizationData;

    return (
        <div>
            <PageHeader
                title="Our Initiative"
                subtitle="Creating lasting impact through focused interventions"
                image={pageHeaders.ourInitiative}
            />

            {/* Hero Stats Section */}
            <Section bgColor="bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
                <div className="text-center max-w-[99rem] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Our Impact at a Glance
                    </h2>
                    <p className="text-lg text-gray-600 mb-12">
                        Creating sustainable change across India through focused initiatives
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <AnimatedCounter end={programs.length} duration={2000} />
                            <div className="text-gray-700 font-medium">Initiatives</div>
                        </div>
                        <div className="text-center bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <AnimatedCounter end={parseInt(stats.communities)} duration={2500} />
                            <div className="text-gray-700 font-medium">Communities</div>
                        </div>
                        <div className="text-center bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <AnimatedCounter end={parseInt(stats.livesImpacted.replace(/[^\d]/g, ''))} duration={3000} suffix="+" />
                            <div className="text-gray-700 font-medium">Lives Impacted</div>
                        </div>
                        <div className="text-center bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <AnimatedCounter end={8} duration={1500} />
                            <div className="text-gray-700 font-medium">States</div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Initiatives Grid */}
            <Section bgColor="bg-gray-50">
                <Heading
                    title="Our Initiatives"
                    subtitle="Comprehensive programs creating lasting change"
                />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {programs.map((program) => (
                        <Card key={program.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{program.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    {program.shortDescription}
                                </p>
                                
                                <div className="flex justify-between items-center">
                                    <div className="text-sm">
                                        <span className="font-semibold text-green-600">
                                            {program.impact.number} {program.impact.text}
                                        </span>
                                    </div>
                                    <Link to={`/programs/${program.slug}`}>
                                        <Button variant="outline" size="sm">
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Call to Action */}
            <Section>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Support Our Mission</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Your contribution helps us expand our reach and create lasting impact in communities across India.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/donate">
                            <Button variant="primary" size="lg">
                                Donate Now
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" size="lg">
                                Get Involved
                            </Button>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default OurInitiative;
