import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import eventsData from "../data/eventsData.json";

const Events = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const { pageHeader, content, upcoming, past } = eventsData;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div>
            <PageHeader
                title={pageHeader.title}
                subtitle={pageHeader.subtitle}
                image={pageHeader.image}
            />

            <Section>
                <Heading
                    title={content.title}
                    subtitle={content.subtitle}
                />

                {/* Event Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${
                                activeTab === 'upcoming'
                                    ? 'bg-green-600 text-white'
                                    : 'text-gray-600 hover:text-green-600'
                            }`}
                        >
                            Upcoming Events
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${
                                activeTab === 'past'
                                    ? 'bg-green-600 text-white'
                                    : 'text-gray-600 hover:text-green-600'
                            }`}
                        >
                            Past Events
                        </button>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(activeTab === 'upcoming' ? upcoming : past).map((event) => (
                        <Card key={event.id} className="p-0 overflow-hidden">
                            <div className="relative">
                                <img
                                    src={event.image}
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
                                    📍 {event.location}
                                </p>
                                <p className="text-gray-700 text-sm mb-4">
                                    {event.description}
                                </p>
                                {activeTab === 'upcoming' && (
                                    <Button variant="primary" size="sm" className="w-full">
                                        Register Interest
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {(activeTab === 'upcoming' ? upcoming : past).length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No {activeTab} events at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </Section>

            <Section bgColor="bg-gray-50">
                <Heading
                    title="Event Updates"
                    subtitle="Stay informed about our upcoming activities"
                />
                <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
                    <Card>
                        <h3 className="text-lg font-bold mb-3">📧 Newsletter</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Subscribe to our newsletter for regular updates about events, programs, and impact stories.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <Button variant="primary" size="sm">
                                Subscribe
                            </Button>
                        </div>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-bold mb-3">📱 Follow Us</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Follow us on social media for real-time updates about our events and community activities.
                        </p>
                        <div className="flex space-x-3">
                            <Button variant="outline" size="sm">Facebook</Button>
                            <Button variant="outline" size="sm">Instagram</Button>
                            <Button variant="outline" size="sm">Twitter</Button>
                        </div>
                    </Card>
                </div>
            </Section>
        </div>
    );
};

export default Events;
