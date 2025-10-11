import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Button from "../components/common/Button";
import programsData from "../data/programs.json";
import { 
    FaBook, FaHeartbeat, FaUserGraduate, FaSeedling, FaHome, FaWater,
    FaArrowLeft, FaCheckCircle, FaDonate, FaRupeeSign, FaUsers, 
    FaMapMarkerAlt, FaClock, FaHeart, FaStar, FaCertificate, FaChartBar,
    FaHandsHelping, FaTrophy
} from "react-icons/fa";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "", className = "text-4xl font-bold text-green-600" }) => {
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
        <span id={`counter-${end}`} className={className}>
            {count.toLocaleString()}{suffix}
        </span>
    );
};

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
    
    if (!program) {
        return <Navigate to="/programs" replace />;
    }

    const IconComponent = iconMap[program.icon] || FaBook;
    
    // Get related programs (exclude current program)
    const relatedPrograms = programs
        .filter(p => p.id !== program.id)
        .slice(0, 3);

    // Impact metrics
    const impactMetrics = [
        {
            icon: <FaUsers className="text-2xl text-green-600" />,
            label: "Direct Beneficiaries",
            value: parseInt(program.impact.number) * 5,
            suffix: "+"
        },
        {
            icon: <FaMapMarkerAlt className="text-2xl text-green-600" />,
            label: "Communities Served",
            value: Math.ceil(parseInt(program.impact.number) / 10),
            suffix: ""
        },
        {
            icon: <FaClock className="text-2xl text-green-600" />,
            label: "Years Active",
            value: 4,
            suffix: "+"
        },
        {
            icon: <FaTrophy className="text-2xl text-green-600" />,
            label: "Success Rate",
            value: 98,
            suffix: "%"
        }
    ];

    return (
        <div className="bg-white">
            {/* Professional Hero Section */}
            <div className="relative h-96 w-full overflow-hidden">
                <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <Link 
                            to="/our-initiative" 
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
                        >
                            <FaArrowLeft className="text-sm" />
                            <span className="text-sm">Back to Initiatives</span>
                        </Link>
                        
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            {program.title}
                        </h1>
                        
                        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {program.shortDescription}
                        </p>
                        
                        <Link to="/donate">
                            <Button 
                                className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <FaDonate className="mr-3" />
                                Donate Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Impact Metrics */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-[99rem] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Program Impact</h2>
                        <p className="text-gray-600">Measurable results and community transformation</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {impactMetrics.map((metric, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4">
                                    {metric.icon}
                                </div>
                                <AnimatedCounter 
                                    end={metric.value} 
                                    duration={2000 + idx * 400} 
                                    suffix={metric.suffix}
                                    className="text-3xl font-bold text-gray-900"
                                />
                                <p className="text-gray-600 text-sm mt-2">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Program */}
            <div className="py-16 bg-white">
                <div className="max-w-[99rem] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Initiative</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                {program.description}
                            </p>
                            
                            <div className="bg-green-50 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                                <ul className="space-y-2">
                                    {program.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-8">
                            <div className="text-center mb-6">
                                <IconComponent className="text-4xl text-green-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Program Statistics</h3>
                            </div>
                            
                            <div className="space-y-4">
                                {program.stats.map((stat, index) => (
                                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                                        <span className="text-gray-700 font-medium">{stat.label}</span>
                                        <span className="text-green-600 font-bold">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How Donations Create Impact */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-[99rem] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How Your Support Creates Impact</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Every contribution is strategically used to maximize impact and create lasting change in communities
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaRupeeSign className="text-2xl text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Donation</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Every rupee is allocated with complete transparency and accountability
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaChartBar className="text-2xl text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Strategic Allocation</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Funds are distributed based on impact assessment and community needs
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaHandsHelping className="text-2xl text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Implementation</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Our experienced team implements programs with local communities
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaHeart className="text-2xl text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Measurable Impact</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Every donation creates measurable, lasting change in people's lives
                            </p>
                        </div>
                    </div>
                    
                    {/* Donation Breakdown */}
                    <div className="bg-white rounded-xl p-8 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Transparency in Action</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-green-600 mb-2">85%</div>
                                <div className="text-gray-700 font-semibold mb-2">Direct Program Impact</div>
                                <p className="text-gray-600 text-sm">Materials, training, direct support to beneficiaries</p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-blue-600 mb-2">12%</div>
                                <div className="text-gray-700 font-semibold mb-2">Operational Excellence</div>
                                <p className="text-gray-600 text-sm">Staff, logistics, monitoring and evaluation</p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-purple-600 mb-2">3%</div>
                                <div className="text-gray-700 font-semibold mb-2">Administrative</div>
                                <p className="text-gray-600 text-sm">Office expenses, communication, reporting</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Stories */}
            <div className="py-16 bg-white">
                <div className="max-w-[99rem] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Success Stories</h2>
                        <p className="text-gray-600">Real impact from program participants and beneficiaries</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 rounded-xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&h=60&fit=crop&crop=face"
                                    alt="Priya Sharma"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-xl">Priya Sharma</h4>
                                    <p className="text-gray-500">Program Beneficiary</p>
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                                "This program has completely transformed my life and my family's future. 
                                I'm now able to support my children's education and have hope for tomorrow."
                            </p>
                            <div className="bg-green-100 rounded-lg p-4">
                                <p className="text-green-700 font-medium">
                                    <FaHeart className="inline mr-2" />
                                    5 family members' lives improved
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop&crop=face"
                                    alt="Rajesh Kumar"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-xl">Rajesh Kumar</h4>
                                    <p className="text-gray-500">Community Leader</p>
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                                "Working with this program has been incredibly rewarding. Seeing the positive 
                                changes in our community motivates everyone to do more."
                            </p>
                            <div className="bg-green-100 rounded-lg p-4">
                                <p className="text-green-700 font-medium">
                                    <FaHandsHelping className="inline mr-2" />
                                    200+ lives touched in community
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-16 bg-green-600">
                <div className="max-w-[99rem] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Support This Initiative
                            </h2>
                            <p className="text-white/90 text-lg mb-8 leading-relaxed">
                                Your contribution helps us expand our reach and create lasting impact in communities across India.
                            </p>
                            
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div className="text-center">
                                    <FaCertificate className="text-3xl text-white mx-auto mb-2" />
                                    <p className="text-white/80 text-sm">80G Tax Benefits</p>
                                </div>
                                <div className="text-center">
                                    <FaRupeeSign className="text-3xl text-white mx-auto mb-2" />
                                    <p className="text-white/80 text-sm">100% Transparent</p>
                                </div>
                                <div className="text-center">
                                    <FaHeart className="text-3xl text-white mx-auto mb-2" />
                                    <p className="text-white/80 text-sm">Direct Impact</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <Link to="/donate">
                                <Button
                                    size="lg"
                                    className="bg-white text-green-600 hover:bg-gray-100 px-10 py-4 text-xl font-semibold"
                                >
                                    <FaDonate className="mr-3" />
                                    Donate Now
                                </Button>
                            </Link>
                            <p className="text-white/80 text-sm mt-4">
                                Join thousands of supporters making a difference
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Programs */}
            {relatedPrograms.length > 0 && (
                <div className="py-16 bg-gray-50">
                    <div className="max-w-[99rem] mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Other Initiatives</h2>
                            <p className="text-gray-600">Explore more ways we're creating impact across communities</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedPrograms.map((relatedProgram) => (
                                <Link key={relatedProgram.id} to={`/programs/${relatedProgram.slug}`}>
                                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={relatedProgram.image}
                                                alt={relatedProgram.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{relatedProgram.title}</h3>
                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {relatedProgram.shortDescription}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-green-600 font-semibold">
                                                    {relatedProgram.impact.number} {relatedProgram.impact.text}
                                                </span>
                                                <span className="text-green-600 text-sm">Learn More →</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        
                        <div className="text-center mt-10">
                            <Link to="/our-initiative">
                                <Button variant="outline" size="lg">
                                    View All Initiatives
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgramDetails;