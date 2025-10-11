import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import programsData from "../../data/programs.json";

const FeaturedPrograms = () => {
    const { programs } = programsData;
    const featuredPrograms = programs.slice(0, 6); // Show first 6 programs

    return (
        <section className="bg-gray-50 py-16 px-6">
            <div className="max-w-[99rem] mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Our Initiative
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Transform lives and build stronger communities through our impactful initiatives.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPrograms.map((program) => (
                            <Link 
                                key={program.id} 
                                to={`/programs/${program.slug}`}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={program.image}
                                            alt={program.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                                            {program.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 flex-grow">
                                            {program.shortDescription}
                                        </p>
                                        <div className="bg-green-50 p-3 rounded-lg mb-4">
                                            <p className="text-green-700 font-semibold text-sm text-center">
                                                {program.impact.number} {program.impact.text}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                                            <span>Learn More</span>
                                            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link to="/our-initiative">
                        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg">
                            Explore All Initiatives
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPrograms;

