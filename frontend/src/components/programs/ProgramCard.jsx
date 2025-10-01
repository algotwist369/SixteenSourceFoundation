import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaHeartbeat, FaUserGraduate, FaSeedling, FaHome, FaWater, FaArrowRight } from "react-icons/fa";

const iconMap = {
    FaBook: FaBook,
    FaHeartbeat: FaHeartbeat,
    FaUserGraduate: FaUserGraduate,
    FaSeedling: FaSeedling,
    FaHome: FaHome,
    FaWater: FaWater
};

const ProgramCard = ({ program, featured = false }) => {
    const IconComponent = iconMap[program.icon] || FaBook;

    if (featured) {
        return (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {program.impact.number}
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <IconComponent className="text-2xl text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{program.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        {program.description}
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                        <p className="text-green-700 font-semibold text-center">
                            {program.impact.text}
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {program.stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <p className="text-2xl font-bold text-green-600">{stat.value}</p>
                                <p className="text-xs text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                        {program.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="text-green-600 mr-2 mt-1">✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <Link to={`/programs/${program.slug}`}>
                        <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2">
                            Learn More <FaArrowRight />
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                            <IconComponent className="text-xl text-green-600" />
                        </div>
                        <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {program.impact.number}
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {program.shortDescription}
                </p>
                <ul className="space-y-1 text-xs text-gray-600 mb-4">
                    {program.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                            <span className="text-green-600 mr-2">✓</span>
                            {feature}
                        </li>
                    ))}
                </ul>
                <Link to={`/programs/${program.slug}`}>
                    <button className="w-full border-2 border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-semibold text-sm flex items-center justify-center gap-2">
                        View Details <FaArrowRight className="text-xs" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProgramCard;

