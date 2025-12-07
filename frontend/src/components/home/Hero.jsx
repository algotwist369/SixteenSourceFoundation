import React, { useState, useEffect, useRef, useCallback } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { getAllHeroSlides } from "../../admin/services/hero";
import { SERVER_URL } from "../../env";

const FALLBACK_IMAGE =
    "https://via.placeholder.com/1600x900?text=Hero+Banner+Unavailable";

const Hero = () => {
    const [slides, setSlides] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    const normalizeSlides = useCallback((list) => {
        if (!Array.isArray(list)) return [];

        return list.map((slide, idx) => {
            const rawImage = slide?.image;
            let image = FALLBACK_IMAGE;

            if (typeof rawImage === "string" && rawImage.trim() !== "") {
                image = rawImage.startsWith("http")
                    ? rawImage
                    : `${SERVER_URL.replace(/\/+$/, "")}/${rawImage.replace(/^\/+/, "")}`;
            }

            return {
                id: slide?._id || slide?.id || idx,
                title: slide?.title || "",
                subtitle: slide?.subtitle || "",
                image,
            };
        });
    }, []);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchSlides = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getAllHeroSlides();

                const rawList = Array.isArray(response?.data)
                    ? response.data
                    : Array.isArray(response)
                        ? response
                        : Array.isArray(response?.data?.data)
                            ? response.data.data
                            : [];

                const normalized = normalizeSlides(rawList);

                setSlides(normalized);
                setCurrent(0);
            } catch (err) {
                console.error("Error fetching hero slides:", err);
                setError(
                    err?.response?.data?.message ||
                    "Unable to load hero slides right now. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, [normalizeSlides]);

    // Auto slide every 5s (pause on hover, only if more than 1 slide)
    useEffect(() => {
        if (isHovered || slides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => {
                if (slides.length <= 1) return prev; // extra guard
                return (prev + 1) % slides.length;
            });
        }, 5000);

        return () => clearInterval(timer);
    }, [isHovered, slides.length]);

    const nextSlide = () => {
        if (slides.length <= 1) return;
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        if (slides.length <= 1) return;
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Loading state
    if (loading && slides.length === 0) {
        return (
            <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center bg-gray-100">
                <p className="text-gray-600">Loading hero...</p>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center bg-gray-100">
                <p className="text-red-600 text-center px-4 max-w-md">{error}</p>
            </section>
        );
    }

    // Empty state
    if (slides.length === 0) {
        return (
            <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center bg-gray-100">
                <p className="text-gray-600">No hero slides available.</p>
            </section>
        );
    }

    return (
        <section
            className="relative overflow-hidden group w-full min-h-[30vh] sm:min-h-[85vh] md:min-h-[100vh]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Hero carousel"
        >
            {slides.map((slide, index) => {
                const isActive = index === current;

                return (
                    <div
                        key={slide.id ?? index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                            }`}
                        aria-hidden={!isActive}
                    >
                        {/* Background Image */}
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title || "Hero slide"}
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = FALLBACK_IMAGE;
                                }}
                                className={`absolute inset-0 w-full h-full object-fit md:object-cover transition-transform duration-[8000ms] ease-out ${isActive ? "scale-110" : "scale-100"
                                    }`}
                            />

                            {/* Optional dark overlay for better text contrast */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
                        </div>

                        {/* Text & Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 z-20">
                            {slide.title && (
                                <h1
                                    className={`text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl transition-all duration-700 ${isActive
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-5"
                                        }`}
                                >
                                    {slide.title}
                                </h1>
                            )}

                            {slide.subtitle && (
                                <p
                                    className={`text-base sm:text-lg md:text-2xl text-gray-100 max-w-3xl mb-8 drop-shadow-lg transition-all duration-700 delay-150 ${isActive
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-5"
                                        }`}
                                >
                                    {slide.subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Prev Button */}
            {slides.length > 1 && (
                <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    aria-label="Previous slide"
                >
                    <IoChevronBack size={24} />
                </button>
            )}

            {/* Next Button */}
            {slides.length > 1 && (
                <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    aria-label="Next slide"
                >
                    <IoChevronForward size={24} />
                </button>
            )}

            {/* Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
                    {slides.map((_, index) => {
                        const isActive = index === current;
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrent(index)}
                                className={`transition-all duration-300 rounded-full ${isActive
                                        ? "bg-white w-8 h-3"
                                        : "bg-white/50 w-3 h-3 hover:bg-white/75"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={isActive ? "true" : "false"}
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default Hero;
