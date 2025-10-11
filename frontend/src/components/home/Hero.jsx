import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import heroData from "../../data/hero.json";

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const { slides } = heroData;

    // Auto slide every 5s (pause on hover)
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHovered, slides.length]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section
            className="relative w-full h-[90vh] sm:h-[85vh] md:h-[100vh] overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Hero carousel"
        >
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                    aria-hidden={index !== current}
                >
                    {/* Full Image */}
                    <div className="relative w-full h-full">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            loading="lazy"
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${
                                index === current ? "scale-110" : "scale-100"
                            }`}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80"></div>
                    </div>

                    {/* Text & Buttons */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-20">
                        <h1
                            className={`text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl transition-all duration-700 ${
                                index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                        >
                            {slide.title}
                        </h1>
                        <p
                            className={`text-lg md:text-2xl text-gray-100 max-w-3xl mb-8 drop-shadow-lg transition-all duration-700 delay-200 ${
                                index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                        >
                            {slide.subtitle}
                        </p>
                        <div
                            className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-400 ${
                                index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                        >
                            <Link to="/donate">
                                <Button variant="primary" size="lg">
                                    Donate Now
                                </Button>
                            </Link>
                            <Link to="/volunteer">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                                >
                                    Become a Volunteer
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Prev Button */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Previous slide"
            >
                <IoChevronBack size={24} />
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Next slide"
            >
                <IoChevronForward size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`transition-all duration-300 rounded-full ${
                            index === current
                                ? "bg-white w-8 h-3"
                                : "bg-white/50 w-3 h-3 hover:bg-white/75"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === current}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
