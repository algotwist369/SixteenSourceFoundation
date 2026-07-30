import React, {
    memo,
    useEffect,
    useRef,
    useState
} from "react";

import { Link } from "react-router-dom";

import Button from "../common/Button";
import { getAllOurStories } from "../../admin/services/ourStory";
import { getYouTubeEmbedUrl } from "../../utils/youtube";


/* =========================================================
   EXPANDABLE TEXT COMPONENT
========================================================= */

const ExpandableText = memo(({
    text,
    lines = 3,
    fallback = "Details will be shared soon."
}) => {
    const [expanded, setExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);

    const textRef = useRef(null);

    const content = text?.trim() || fallback;

    useEffect(() => {
        if (expanded) return;

        const checkOverflow = () => {
            const element = textRef.current;

            if (!element) return;

            const hasOverflow =
                element.scrollHeight > element.clientHeight + 1;

            setCanExpand(hasOverflow);
        };

        const animationFrame =
            window.requestAnimationFrame(checkOverflow);

        window.addEventListener("resize", checkOverflow);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", checkOverflow);
        };
    }, [content, lines, expanded]);

    const toggleExpanded = () => {
        setExpanded((previousState) => !previousState);
    };

    return (
        <div>
            <p
                ref={textRef}
                className="text-sm leading-7 text-slate-600"
                style={
                    expanded
                        ? undefined
                        : {
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: lines,
                            overflow: "hidden"
                        }
                }
            >
                {content}
            </p>

            {(canExpand || expanded) && (
                <button
                    type="button"
                    onClick={toggleExpanded}
                    aria-expanded={expanded}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-700"
                >
                    {expanded ? "Read Less" : "Read More"}

                    <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""
                            }`}
                    >
                        <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
});

ExpandableText.displayName = "ExpandableText";


/* =========================================================
   EXPANDABLE STRATEGY COMPONENT
========================================================= */

const ExpandableStrategy = memo(({
    points = [],
    defaultVisible = 2
}) => {
    const [expanded, setExpanded] = useState(false);

    if (!points.length) {
        return (
            <p className="text-sm leading-7 text-slate-600">
                Strategy details will be shared soon.
            </p>
        );
    }

    const visiblePoints = expanded
        ? points
        : points.slice(0, defaultVisible);

    const hasMorePoints = points.length > defaultVisible;

    return (
        <div>
            <p className="mb-3 text-sm leading-7 text-slate-600">
                We work with a holistic approach focusing on:
            </p>

            <ul className="space-y-3">
                {visiblePoints.map((point, index) => (
                    <li
                        key={`${point}-${index}`}
                        className="flex items-start gap-3"
                    >
                        <span className="mt-[10px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />

                        <span className="text-sm leading-7 text-slate-600">
                            {point}
                        </span>
                    </li>
                ))}
            </ul>

            {hasMorePoints && (
                <button
                    type="button"
                    onClick={() => {
                        setExpanded((previousState) => !previousState);
                    }}
                    aria-expanded={expanded}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-700"
                >
                    {expanded ? "Read Less" : "Read More"}

                    <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""
                            }`}
                    >
                        <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
});

ExpandableStrategy.displayName = "ExpandableStrategy";


/* =========================================================
   IMPACT STAT CARD
========================================================= */

const ImpactStat = memo(({
    value,
    label,
    description
}) => {
    return (
        <div className="flex min-w-0 flex-col items-center px-2 text-center">
            <p className="text-xl font-bold leading-none text-slate-900 sm:text-2xl">
                {value}
            </p>

            <p className="mt-2 text-[10px] font-bold uppercase leading-4 tracking-wide text-slate-600 sm:text-xs">
                {label}
            </p>

            {description && (
                <p className="mt-1 hidden text-[10px] leading-4 text-slate-400 sm:block">
                    {description}
                </p>
            )}
        </div>
    );
});

ImpactStat.displayName = "ImpactStat";


/* =========================================================
   MAIN OUR STORY COMPONENT
========================================================= */

const OurStory = memo(() => {
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hasFetched = useRef(false);

    /*
     * Update these values whenever your impact numbers change.
     */
    const impactStats = [
        {
            value: "125+",
            label: "Lives Impacted",
            description: "Total beneficiaries"
        },
        {
            value: "100+",
            label: "Last Year Impact",
            description: "Lives impacted last year"
        },
        {
            value: "70+",
            label: "Self-Employment & Jobs",
            description: "Livelihood opportunities"
        }
    ];

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

                const firstStory = rawList[0] || null;

                if (!firstStory) {
                    setStory(null);
                    return;
                }

                setStory({
                    title: firstStory.title || "Our Story",

                    ourJourney:
                        firstStory.ourJourney || "",

                    ourMission:
                        firstStory.ourMission || "",

                    ourStrategy:
                        Array.isArray(firstStory.ourStrategy)
                            ? firstStory.ourStrategy
                            : [],

                    video:
                        firstStory.video || null
                });
            } catch (err) {
                setError(
                    err?.response?.data?.message ||
                    "Unable to load our story right now."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);


    /* =====================================================
       LOADING STATE
    ===================================================== */

    if (loading) {
        return (
            <section className="bg-slate-50 px-4 py-16 sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center justify-center gap-3 text-slate-600">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-orange-500" />

                        <span className="text-sm font-medium">
                            Loading our story...
                        </span>
                    </div>
                </div>
            </section>
        );
    }


    /* =====================================================
       ERROR STATE
    ===================================================== */

    if (error) {
        return (
            <section className="bg-slate-50 px-4 py-16 sm:px-6">
                <div className="mx-auto max-w-6xl rounded-2xl border border-red-100 bg-red-50 p-5 text-center text-sm text-red-600">
                    {error}
                </div>
            </section>
        );
    }


    if (!story) return null;


    /* =====================================================
       STORY DATA
    ===================================================== */

    const journeyText = story.ourJourney || "";

    const missionText = story.ourMission || "";

    const strategyPoints = story.ourStrategy || [];

    const embedUrl = getYouTubeEmbedUrl(story.video);

    const tagline = missionText
        ? `${missionText.slice(0, 150)}${missionText.length > 150 ? "..." : ""
        }`
        : "Creating meaningful opportunities and sustainable impact for communities.";


    return (
        <section className="relative overflow-hidden bg-slate-50 px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-orange-100/60 blur-3xl" />

            <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />


            <div className="relative mx-auto max-w-6xl">
                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
                    <span className="mb-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
                        Our Foundation
                    </span>

                    <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        {story.title}
                    </h2>


                </div>


                {/* =================================================
                    BOTH SECTIONS HAVE SAME DESKTOP HEIGHT

                    Minimum height: 580px
                    Responsive height: 72vh
                    Maximum height: 700px
                ================================================= */}

                <div className="grid gap-6 lg:h-[clamp(580px,72vh,700px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-8">
                    {/* =============================================
                        LEFT VIDEO SECTION
                    ============================================= */}

                    <div className="order-2 flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 lg:order-1 lg:h-full">
                        {/* Video */}
                        <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden bg-slate-950 lg:min-h-0 lg:flex-1 lg:aspect-auto">
                            {embedUrl ? (
                                <iframe
                                    src={embedUrl}
                                    className="absolute inset-0 h-full w-full"
                                    title="Our story video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
                                    <div className="px-5 text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                className="ml-1 h-7 w-7 text-white"
                                            >
                                                <path d="M8 5.14v13.72c0 .78.86 1.26 1.53.85l10.77-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z" />
                                            </svg>
                                        </div>

                                        <p className="text-sm font-medium text-white">
                                            Our story video
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Video will be available soon
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Impact Stats and Buttons */}
                        <div className="flex-shrink-0 p-4 sm:p-5">
                            {/* Impact Heading */}
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">
                                        Our Impact
                                    </p>
                                </div>
                            </div>


                            {/* Statistics */}
                            <div className="mb-4 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-100 bg-slate-50 px-1 py-4 sm:px-2">
                                {impactStats.map((stat) => (
                                    <ImpactStat
                                        key={stat.label}
                                        value={stat.value}
                                        label={stat.label}
                                    // description={stat.description}
                                    />
                                ))}
                            </div>


                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/donate"
                                    className="flex-1"
                                >
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="w-full"
                                    >
                                        Support Our Mission
                                    </Button>
                                </Link>

                                <Link
                                    to="/volunteer"
                                    className="flex-1"
                                >
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full"
                                    >
                                        Join Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>


                    {/* =============================================
                        RIGHT CONTENT SECTION
                    ============================================= */}

                    <div className="order-1 flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-6 lg:order-2 lg:h-full lg:p-7">
                        {/* Scrollable Content */}
                        <div className="min-h-0 space-y-4 lg:flex-1 lg:overflow-y-auto lg:pr-2">
                            {/* =====================================
                                OUR JOURNEY
                            ===================================== */}

                            <p className="p-1">The sixteen source foundation is a non-profit organization dedicated to providing, support and resources to underprivile</p>
                            <article className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-colors duration-200 hover:border-orange-100 hover:bg-orange-50/30 sm:p-5">
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                                        01
                                    </span>

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            Our Journey
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            How our mission began
                                        </p>
                                    </div>
                                </div>

                                <ExpandableText
                                    text={journeyText}
                                    lines={4}
                                    fallback="Our journey details will be shared soon."
                                />
                            </article>


                            {/* =====================================
                                OUR MISSION
                            ===================================== */}

                            <article className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-colors duration-200 hover:border-emerald-100 hover:bg-emerald-50/30 sm:p-5">
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                                        02
                                    </span>

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            Our Mission
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            The change we aim to create
                                        </p>
                                    </div>
                                </div>

                                <ExpandableText
                                    text={missionText}
                                    lines={3}
                                    fallback="Our mission details will be shared soon."
                                />
                            </article>


                            {/* =====================================
                                OUR STRATEGY
                            ===================================== */}

                            <article className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-colors duration-200 hover:border-blue-100 hover:bg-blue-50/30 sm:p-5">
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                        03
                                    </span>

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            Our Strategy
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            How we deliver meaningful impact
                                        </p>
                                    </div>
                                </div>

                                <ExpandableStrategy
                                    points={strategyPoints}
                                    defaultVisible={2}
                                />
                            </article>
                        </div>


                        {/* Fixed Bottom Button */}
                        <div className="mt-5 flex-shrink-0 border-t border-slate-200 pt-5">
                            <Link
                                to="/about"
                                className="block"
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                >
                                    Discover Our Complete Story
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

OurStory.displayName = "OurStory";

export default OurStory;