import { useEffect, useRef, useState } from "react";
import { getAllSuccessStories } from "../../admin/services/successStories";
import { SERVER_URL } from "../../env";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function SuccessStories() {
    const [testimonials, setTestimonials] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchStories = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getAllSuccessStories(1, 6);
                const rawList = Array.isArray(response?.data)
                    ? response.data
                    : Array.isArray(response)
                        ? response
                        : Array.isArray(response?.data?.data)
                            ? response.data.data
                            : [];

                const normalized = rawList.map((item, idx) => {
                    const video = item?.video
                        ? (item.video.startsWith("http") ? item.video : `${SERVER_URL}/${item.video}`)
                        : null;

                    return {
                        id: item?._id || item?.id || idx,
                        name: item?.title || item?.name || "Anonymous",
                        story: item?.description || item?.story || "Story coming soon.",
                        video,
                        achievement: item?.designation || item?.achievement || ""
                    };
                });

                setTestimonials(normalized);
                setIndex(0);
            } catch (err) {
                setError(err?.response?.data?.message || "Unable to load success stories right now.");
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    useEffect(() => {
        if (testimonials.length === 0) return;
        if (index > testimonials.length - 1) {
            setIndex(0);
        }
    }, [testimonials.length, index]);

    const hasMultiple = testimonials.length > 1;

    const nextSlide = () => {
        if (!hasMultiple) return;
        setIndex((prev) => (prev + 1) % testimonials.length);
    };


    const prevSlide = () => {
        if (!hasMultiple) return;
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };


    const active = testimonials[index];

    if (loading && testimonials.length === 0) {
        return (
            <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20" id="success-stories">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
                    Loading success stories...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20" id="success-stories">
                <div className="max-w-7xl mx-auto px-4 text-center text-red-600">
                    {error}
                </div>
            </section>
        );
    }

    if (!active) {
        return null;
    }


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
                                src={active.video || ""}
                                controls
                                className="w-full h-[500px] object-cover rounded-xl"
                                poster={!active.video ? "https://via.placeholder.com/800x600?text=Success+Story" : undefined}
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
                            <p className="text-lg text-green-600 font-semibold">{active.achievement || "Success Story"}</p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-4 justify-center md:justify-start mt-4">
                            <button
                                onClick={prevSlide}
                                aria-label="Previous story"
                                className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!hasMultiple}
                            >
                                <IoChevronBack size={20} className="text-gray-700 group-hover:text-green-600" />
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Next story"
                                className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!hasMultiple}
                            >
                                <IoChevronForward size={20} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dots Navigation */}
                {hasMultiple && (
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
                )}
            </div>
        </section>
    );
}