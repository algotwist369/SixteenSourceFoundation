import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents, deleteEvent } from "../admin/services/event_api";
import { SERVER_URL } from "../env";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState("");
    const navigate = useNavigate();
    const didFetchRef = useRef(false);

    const getEvents = async () => {
        try {
            setLoading(true);
            const { data } = await fetchEvents({
                page,
                limit: 6,
                status: statusFilter || undefined,
                sortBy: "date",
                order: "asc",
            });
            setEvents(data.data || []);
            setTotalPages(data.pages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (didFetchRef.current && page === 1 && statusFilter === "") return;
        didFetchRef.current = true;
        getEvents();
    }, [page, statusFilter]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        try {
            await deleteEvent(id);
            getEvents();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/event/edit/${id}`);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Events</h1>

            <div className="mb-4 flex justify-between items-center">
                <div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="">All</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => navigate("/admin/event/create")}
                >
                    Add Event
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="bg-white shadow-md rounded-md p-4">
                        <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                        <p className="text-gray-600 mb-2">{event.organizer}</p>
                        <p className="text-gray-700 mb-2">
                            {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-800 mb-2">{event.location}</p>
                        {event.img_gallery && event.img_gallery.length > 0 && (
                            <div className="flex space-x-2 overflow-x-auto mb-2">
                                {event.img_gallery.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img && img.startsWith("http") ? img : `${SERVER_URL}/${img}`}
                                        alt="gallery"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                ))}
                            </div>
                        )}
                        <p className="text-gray-600 mb-2">
                            Status: <span className="font-semibold">{event.status}</span>
                        </p>

                        <div className="flex space-x-2 mt-2">
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => handleEdit(event._id)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                onClick={() => handleDelete(event._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-3 py-1 bg-gray-100 rounded">{page}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EventList;
