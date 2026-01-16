import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import eventsData from "../data/eventsData.json";
import pageHeaders from "../data/pageHeaders.json";
import { fetchEvents } from "../admin/services/event_api";
import { SERVER_URL } from "../env";

const Events = () => {
    const { pageHeader, content } = eventsData;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const didFetchRef = useRef(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getImageSrc = (event) => {
        const img = event.img_gallery && event.img_gallery[0];
        if (!img) return pageHeaders.events;
        return img.startsWith("http") ? img : `${SERVER_URL}/${img}`;
    };

    useEffect(() => {
        if (didFetchRef.current) return;
        didFetchRef.current = true;

        const loadEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch all events (we'll filter for upcoming dates on the frontend)
                const { data } = await fetchEvents({
                    page: 1,
                    limit: 100, // Get more events to filter client-side
                    sortBy: "date",
                    order: "asc"
                });
                
                console.log("All events response:", data);
                console.log("Total events received:", data.data?.length || 0);
                
                // For now, show all events to verify they render correctly
                // TODO: Re-enable filtering once we confirm rendering works
                let eventsToShow = data.data || [];
                
                // Filter for events with future dates (upcoming events)
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time to start of day
                console.log("Today's date (for comparison):", today.toISOString());
                
                const upcomingEvents = eventsToShow.filter(event => {
                    if (!event.date) {
                        console.log("Event missing date:", event.title);
                        return false;
                    }
                    const eventDate = new Date(event.date);
                    eventDate.setHours(0, 0, 0, 0);
                    const isUpcoming = eventDate >= today;
                    console.log(`Event: ${event.title}, Date: ${eventDate.toISOString()}, Is Upcoming: ${isUpcoming}`);
                    return isUpcoming; // Include events from today onwards
                });
                
                console.log(`Filtered ${upcomingEvents.length} upcoming events from ${eventsToShow.length} total events`);
                console.log("Upcoming events:", upcomingEvents);
                
                // Use filtered events, or all events if filtering returns empty (for debugging)
                const finalEvents = upcomingEvents.length > 0 ? upcomingEvents : eventsToShow;
                console.log("Final events to display:", finalEvents.length, finalEvents);
                
                setEvents(finalEvents);
            } catch (err) {
                console.error("Error loading events:", err);
                setError("Failed to load events");
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    return (
        <div>
            <Section>
                <Heading
                    title={content.title}
                    subtitle={content.subtitle}
                />

                {loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Loading events...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-12">
                        <p className="text-red-500 text-lg">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => {
                            const id = event._id || event.id;
                            return (
                                <Link
                                    key={id}
                                    to={`/events/${id}`}
                                    className="block"
                                >
                                    <Card className="p-0 overflow-hidden">
                                        <div className="relative">
                                            <img
                                                src={getImageSrc(event)}
                                                alt={event.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {formatDate(event.date)}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                            {event.time && (
                                                <p className="text-gray-600 text-sm mb-1">
                                                    ⏰ {event.time}
                                                </p>
                                            )}
                                            <p className="text-gray-600 text-sm mb-3">
                                                {event.location}
                                            </p>
                                            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                                {event.description}
                                            </p>
                                        </div>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {!loading && !error && events.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No upcoming events at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </Section>
        </div>
    );
};

export default Events;
