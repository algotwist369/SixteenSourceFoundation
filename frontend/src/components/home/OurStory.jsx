import React, { memo, useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { getAllOurStories } from "../../admin/services/ourStory";
import { SERVER_URL } from "../../env";
import organizationData from "../../data/organization.json";

const OurStory = memo(() => {
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    const tagline = story?.ourMission?.slice(0, 120);
    const { established, stats } = organizationData;
    const yearsOfImpact = new Date().getFullYear() - parseInt(established, 10);

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        let videoId = '';
        if (url.includes('v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('shorts/')) {
            videoId = url.split('shorts/')[1].split('?')[0];
        } else if (url.includes('embed/')) {
            videoId = url.split('embed/')[1].split('?')[0];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchStories = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getAllOurStories(1, 1);
                const rawList = Array.isArray(response?.data)
                    ? response.data
                    : Array.isArray(response)
                        ? response
                        : Array.isArray(response?.data?.data)
                            ? response.data.data
                            : [];

                const first = rawList[0] || null;

                if (first) {
                    setStory({
                        title: first.title || "Our Story",
                        ourJourney: first.ourJourney || "",
                        ourMission: first.ourMission || "",
                        ourStrategy: Array.isArray(first.ourStrategy) ? first.ourStrategy : [],
                        video: first.video || null,
                        number: first.number
                    });
                } else {
                    setStory(null);
                }
            } catch (err) {
                setError(err?.response?.data?.message || "Unable to load our story right now.");
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    const journeyText = story?.ourJourney || "";

    const missionText = story?.ourMission || "";
    const strategyPoints = story?.ourStrategy || [];

    const embedUrl = getYouTubeEmbedUrl(story?.video);

    const videoContent = embedUrl
        ? (
            <iframe
                src={embedUrl}
                className="absolute top-0 left-0 w-full h-full"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        ) : null;

    if (loading) {
        return (
            <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
                <div className="max-w-[99rem] mx-auto text-center text-gray-600">
                    Loading our story...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
                <div className="max-w-[99rem] mx-auto text-center text-red-600">
                    {error}
                </div>
            </section>
        );
    }

    if (!story) return null;

    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-[99rem] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {story.title}
                    </h2>
                    {tagline && (
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            {tagline}
                        </p>
                    )}
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:h-[700px]">
                    {/* YouTube Video Section */}
                    <div className="order-2 lg:order-1 flex flex-col h-full">
                        {videoContent && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl border-4 border-green-100 flex-shrink-0">
                                {videoContent}
                            </div>
                        )}

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
                                    {tagline && (
                                        <p className="text-lg sm:text-xl text-green-700 font-semibold">
                                            {tagline}
                                        </p>
                                    )}
                                </div>

                                {/* Our Journey */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        Our Journey
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {journeyText}
                                        {stats?.communities && stats?.livesImpacted && (
                                            <> Through our dedicated programs in education, healthcare, skill development, and community empowerment, we have reached {stats.communities}+ communities and impacted {stats.livesImpacted} lives across India.</>
                                        )}
                                    </p>
                                </div>

                                {/* Our Mission */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        Our Mission
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {missionText || "Our mission details will be shared soon."}
                                    </p>
                                </div>

                                {/* Our Strategy */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        Our Strategy
                                    </h3>
                                    {strategyPoints.length > 0 ? (
                                        <>
                                            <p className="text-gray-700 leading-relaxed mb-3">
                                                We work with a holistic approach focusing on:
                                            </p>
                                            <ul className="space-y-2 text-gray-700">
                                                {strategyPoints.map((point, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-green-600 font-bold mt-1">•</span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <p className="text-gray-700 leading-relaxed">
                                            Strategy details will be shared soon.
                                        </p>
                                    )}
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

