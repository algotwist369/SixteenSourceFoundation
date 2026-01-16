import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { fetchEvent } from "../admin/services/event_api";
import { SERVER_URL } from "../env";
import pageHeaders from "../data/pageHeaders.json";
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaStar,
    FaUsers
} from "react-icons/fa";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const didFetchRef = useRef(false);

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const getMainImage = (ev) => {
        const img = ev?.img_gallery?.[0];
        return img
            ? img.startsWith("http")
                ? img
                : `${SERVER_URL}/${img}`
            : pageHeaders.events;
    };

    const getGalleryImages = (ev) =>
        Array.isArray(ev?.img_gallery)
            ? ev.img_gallery.map((img) =>
                  img.startsWith("http") ? img : `${SERVER_URL}/${img}`
              )
            : [];

    useEffect(() => {
        if (didFetchRef.current) return;
        didFetchRef.current = true;

        const loadEvent = async () => {
            try {
                setLoading(true);
                const { data } = await fetchEvent(id);
                setEvent(data.data);
            } catch {
                setError("Failed to load event details");
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [id]);

    if (loading)
        return (
            <div className="py-24 text-center text-gray-500 text-lg">
                Loading event details...
            </div>
        );

    if (error)
        return (
            <div className="py-24 text-center">
                <p className="text-red-500 text-lg">{error}</p>
                <Link to="/events">
                    <Button className="mt-4">Back to Events</Button>
                </Link>
            </div>
        );

    if (!event) return null;

    const galleryImages = getGalleryImages(event);

    return (
        <div>
            <PageHeader
                title={event.title}
                subtitle={event.location || event.organizer}
                image={getMainImage(event)}
            />

            <Section>
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Back */}
                    <Link to="/events">
                        <Button variant="outline" size="sm">
                            ← Back to Events
                        </Button>
                    </Link>

                    {/* Title */}
                    <Heading title={event.title} subtitle={event.organizer} />

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4">
                        {event.date && (
                            <span className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
                                <FaCalendarAlt />
                                {formatDate(event.date)}
                            </span>
                        )}
                        {event.location && (
                            <span className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
                                <FaMapMarkerAlt />
                                {event.location}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <Card className="p-6 bg-gray-50">
                        <p className="text-gray-700 leading-relaxed">
                            {event.description}
                        </p>
                    </Card>

                    {/* Highlights */}
                    {event.points?.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <FaStar className="text-yellow-500" />
                                Highlights
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {event.points.map((point, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                                    >
                                        {point}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Audience */}
                    {event.audience?.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <FaUsers className="text-indigo-500" />
                                Who Should Attend
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {event.audience.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-indigo-50 text-indigo-700 rounded-xl px-4 py-3"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery */}
                    {galleryImages.length > 1 && (
                        <div>
                            <Heading
                                title="Event Gallery"
                                subtitle="Moments from the event"
                            />
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                                {galleryImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="overflow-hidden rounded-xl shadow-sm group"
                                    >
                                        <img
                                            src={img}
                                            alt="Event"
                                            className="w-full h-56 object-cover group-hover:scale-110 transition duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    );
};

export default EventDetails;
