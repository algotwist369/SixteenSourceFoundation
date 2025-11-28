import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import caseStudiesData from "../../data/caseStudies.json";

const CaseStudy = memo(() => {
    const { caseStudies } = caseStudiesData;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const caseStudy = caseStudies[currentIndex] || caseStudies[0];

    // Auto-sliding functionality
    useEffect(() => {
        if (caseStudies.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1
            );
        }, 6000); // Change slide every 6 seconds

        return () => clearInterval(interval);
    }, [caseStudies.length, isPaused]);

    // Handle navigation dot click
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (!caseStudy || caseStudies.length === 0) {
        return null;
    }

    return (
        <section
            className="py-16 sm:py-20 px-4 sm:px-6 bg-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-11/12 mx-auto">
                <div className="grid lg:grid-cols-2 gap-0 lg:h-[650px] items-stretch overflow-hidden rounded-xl shadow-2xl relative">
                    {/* Content Section - Dark Blue Background */}
                    <div className="bg-gradient-to-br from-[#10B7F0] via-slate-900 to-[#BFDD72] p-8 sm:p-12 lg:p-16 flex flex-col justify-between order-2 lg:order-1 transition-opacity duration-500">

                        <div>
                            {/* CASE STUDY Label */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1 h-10 bg-red-600 rounded"></div>
                                <span className="text-red-400 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                                    Case Study
                                </span>
                                <span className="text-gray-300 text-xs sm:text-sm font-semibold">
                                    {caseStudy.number}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-opacity duration-500">
                                {caseStudy.title}
                            </h3>

                            {/* Content */}
                            <div className="text-white/90 leading-relaxed space-y-4 max-h-[380px] overflow-y-auto pr-3" style={{ scrollbarWidth: 'thin', scrollbarColor: '#60A5FA #1E3A8A' }}>
                                {caseStudy.content.split('\n\n').map((paragraph, index) => (
                                    paragraph.trim() && (
                                        <p key={index} className="text-sm sm:text-base transition-opacity duration-500">
                                            {paragraph.trim()}
                                        </p>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Know More Button */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <Link to="/impact">
                                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                    Know More
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-[400px] lg:h-full order-1 lg:order-2 overflow-hidden">
                        <img
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            className="w-full h-full object-cover transition-opacity duration-500"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    </div>
                </div>

                {/* Navigation Dots */}
                {caseStudies.length > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {caseStudies.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
                                        ? 'bg-green-600 w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to case study ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
});

CaseStudy.displayName = "CaseStudy";

export default CaseStudy;

