import { useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const testimonials = [
    {
        id: 1,
        name: "Aisha Khan",
        story:
            "Before joining, I had zero computer knowledge. Today I work as a data entry operator. This NGO changed my life.",
        video: "/videos/v1.mp4",
        achievement: "Data Entry Operator",
    },
    {
        id: 2,
        name: "Rohit Verma",
        story:
            "I learned digital marketing and now I am freelancing full‑time. Amazing training and great mentors!",
        video: "/videos/v2.mp4",
        achievement: "Full-time Freelancer",
    },
    {
        id: 3,
        name: "Sonal Gupta",
        story:
            "From homemaker to earning independently, tailoring skills empowered me to support my family.",
        video: "/videos/v3.mp4",
        achievement: "Independent Entrepreneur",
    },
    {
        id: 3,
        name: "Sonal Gupta",
        story:
            "From homemaker to earning independently, tailoring skills empowered me to support my family.",
        video: "/videos/v4.mp4",
        achievement: "Independent Entrepreneur",
    },
    {
        id: 3,
        name: "Sonal Gupta",
        story:
            "From homemaker to earning independently, tailoring skills empowered me to support my family.",
        video: "/videos/v5.mp4",
        achievement: "Independent Entrepreneur",
    },
];
export default function SuccessStories() {
    const [index, setIndex] = useState(0);


    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % testimonials.length);
    };


    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };


    const active = testimonials[index];


    return (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20" id="success-stories">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Real people, real transformations. Hear how our programs changed lives.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Video */}
                    <div className="flex justify-center md:justify-end">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-3 shadow-2xl max-w-[420px] w-full">
                            <video
                                src={active.video}
                                controls
                                className="w-full h-[500px] object-cover rounded-xl"
                            ></video>
                        </div>
                    </div>

                    {/* Content */}
                    <div
                        key={active.id + "_content"}
                        className="flex flex-col gap-6 transition-opacity duration-500 text-center md:text-left"
                    >
                        <div className="relative">
                            <FaQuoteLeft className="text-green-500 text-4xl mb-4 opacity-30" />
                            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light italic">
                                {active.story}
                            </p>
                            {/* <FaQuoteRight className="text-green-500 text-4xl mt-4 ml-auto opacity-30" /> */}
                        </div>

                        <div className="border-l-4 border-green-500 pl-6 py-2">
                            <h4 className="text-2xl font-bold text-gray-900 mb-1">{active.name}</h4>
                            <p className="text-lg text-green-600 font-semibold">{active.achievement}</p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-4 justify-center md:justify-start mt-4">
                            <button
                                onClick={prevSlide}
                                aria-label="Previous story"
                                className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                            >
                                <IoChevronBack size={20} className="text-gray-700 group-hover:text-green-600" />
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Next story"
                                className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                            >
                                <IoChevronForward size={20} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center mt-12 gap-3">
                    {testimonials.map((t, i) => (
                        <button
                            key={t.id + "_" + i}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to story ${i + 1}`}
                            className={`transition-all duration-300 rounded-full ${i === index
                                    ? "w-12 h-3 bg-green-500"
                                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
}