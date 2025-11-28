import React, { memo } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import organizationData from "../../data/organization.json";

const OurStory = memo(() => {
    const { name, tagline, mission, vision, established, stats } = organizationData;
    const yearsOfImpact = new Date().getFullYear() - parseInt(established);

    // YouTube video ID
    const youtubeVideoId = "bRrSjQSE8mA";
    const embedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;

    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-[99rem] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Story
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Transforming lives and building stronger communities since {established}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:h-[700px]">
                    {/* YouTube Video Section */}
                    <div className="order-2 lg:order-1 flex flex-col h-full">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl border-4 border-green-100 flex-shrink-0">
                            <iframe
                                src={embedUrl}
                                title="Our Story Video"
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                        
                        {/* Buttons below video */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                            <Link to="/donate" className="flex-1">
                                <Button variant="primary" size="lg" className="w-full">
                                    Support Our Mission
                                </Button>
                            </Link>
                            <Link to="/volunteer" className="flex-1">
                                <Button variant="outline" size="lg" className="w-full">
                                    Join Us
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="order-1 lg:order-2 h-full">
                        <div className="bg-white rounded-lg p-6 sm:p-8 shadow-md h-full flex flex-col">
                            <div className="space-y-6 flex-grow overflow-y-auto">
                                {/* Tagline */}
                                <div className="pb-4 border-b border-gray-200">
                                    <p className="text-lg sm:text-xl text-green-700 font-semibold">
                                        {tagline}
                                    </p>
                                </div>

                                {/* Our Journey */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        Our Journey
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Established in {established}, we have been transforming lives and building stronger communities for over {yearsOfImpact} years. Through our dedicated programs in education, healthcare, skill development, and community empowerment, we have reached {stats.communities}+ communities and impacted {stats.livesImpacted} lives across India.
                                    </p>
                                </div>

                                {/* Our Mission */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        Our Mission
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {mission}
                                    </p>
                                </div>

                                {/* Our Strategy */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        Our Strategy
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        We work with a holistic approach focusing on:
                                    </p>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold mt-1">•</span>
                                            <span>Community-driven development programs that create sustainable impact</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold mt-1">•</span>
                                            <span>Skill development and vocational training to enhance livelihood opportunities</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold mt-1">•</span>
                                            <span>Partnerships with communities, government, and corporates for greater reach</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold mt-1">•</span>
                                            <span>Transparent operations and measurable impact reporting</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Know More Button */}
                            <div className="pt-6 mt-6 border-t border-gray-200">
                                <Link to="/about">
                                    <Button variant="primary" size="lg" className="w-full">
                                        Know More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

OurStory.displayName = "OurStory";

export default OurStory;

