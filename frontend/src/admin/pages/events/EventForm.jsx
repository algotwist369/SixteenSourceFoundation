import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { createEvent, updateEvent, fetchEvent, uploadEventGallery } from "../../services/event_api";
import { getImageUrl } from "../../../utils/image";
import { HiX } from "react-icons/hi";

const EventForm = ({ eventId, onSuccess }) => {
    const params = useParams();
    const routeEventId = params?.id;
    const currentEventId = eventId || routeEventId || null;

    const [formData, setFormData] = useState({
        title: "",
        organizer: "",
        description: "",
        points: [],
        audience: [],
        img_gallery: [],
        date: "",
        location: "",
        status: "upcoming",
    });
    const [pointsText, setPointsText] = useState("");
    const [audienceText, setAudienceText] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const didFetchRef = useRef(false);

    useEffect(() => {
        return () => previews.forEach(url => URL.revokeObjectURL(url));
    }, [previews]);

    useEffect(() => {
        if (!currentEventId || didFetchRef.current) return;
        didFetchRef.current = true;

        fetchEvent(currentEventId).then((res) => {
            const ev = res.data.data || {};
            setFormData({
                title: ev.title || "",
                organizer: ev.organizer || "",
                description: ev.description || "",
                points: Array.isArray(ev.points) ? ev.points : [],
                audience: Array.isArray(ev.audience) ? ev.audience : [],
                img_gallery: Array.isArray(ev.img_gallery) ? ev.img_gallery : [],
                date: ev.date || "",
                location: ev.location || "",
                status: ev.status || "upcoming",
            });
            setPointsText(Array.isArray(ev.points) ? ev.points.join("\n") : "");
            setAudienceText(Array.isArray(ev.audience) ? ev.audience.join("\n") : "");
        });
    }, [currentEventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        setImageFiles(files);
        
        // Revoke old previews
        previews.forEach(url => URL.revokeObjectURL(url));
        
        // Create new previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    const removeImage = (index) => {
        const newImages = imageFiles.filter((_, i) => i !== index);
        setImageFiles(newImages);
        
        const newPreviews = previews.filter((_, i) => i !== index);
        URL.revokeObjectURL(previews[index]);
        setPreviews(newPreviews);
    };

    const removeExistingImage = (index) => {
        setFormData(prev => ({
            ...prev,
            img_gallery: prev.img_gallery.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const pointsArray = pointsText
                .split("\n")
                .map((v) => v.trim())
                .filter(Boolean);
            const audienceArray = audienceText
                .split("\n")
                .map((v) => v.trim())
                .filter(Boolean);

            let payload = {
                ...formData,
                points: pointsArray.length ? pointsArray : undefined,
                audience: audienceArray.length ? audienceArray : undefined,
            };

            if (imageFiles.length > 0) {
                const res = await uploadEventGallery(imageFiles);
                const uploaded = (res.data && res.data.data) || [];
                const existing = Array.isArray(formData.img_gallery) ? formData.img_gallery : [];
                payload = { ...payload, img_gallery: [...existing, ...uploaded] };
            }

            if (currentEventId) await updateEvent(currentEventId, payload);
            else await createEvent(payload);

            alert("Event saved successfully");
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error(err);
            alert("Error saving event");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">{currentEventId ? "Edit" : "Add"} Event</h2>

            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border px-3 py-2 rounded mb-3"
                required
            />

            <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                placeholder="Organizer"
                className="w-full border px-3 py-2 rounded mb-3"
                required
            />

            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border px-3 py-2 rounded mb-3"
                required
            />

            <textarea
                name="points"
                value={pointsText}
                onChange={(e) => setPointsText(e.target.value)}
                placeholder="Highlights (one per line)"
                className="w-full border px-3 py-2 rounded mb-3"
            />

            <textarea
                name="audience"
                value={audienceText}
                onChange={(e) => setAudienceText(e.target.value)}
                placeholder="Audience (one per line)"
                className="w-full border px-3 py-2 rounded mb-3"
            />

            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border px-3 py-2 rounded mb-3"
            />

            <input
                type="date"
                name="date"
                value={formData.date ? formData.date.split("T")[0] : ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mb-3"
            />

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mb-3"
            >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
            </select>

            <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full border px-3 py-2 rounded mb-3"
            />

            {/* Existing Images */}
            {formData.img_gallery.length > 0 && (
                <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Existing Images:</p>
                    <div className="grid grid-cols-4 gap-2">
                        {formData.img_gallery.map((img, i) => (
                            <div key={i} className="relative group">
                                <img
                                    src={getImageUrl(img)}
                                    alt="gallery"
                                    className="w-full h-20 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(i)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <HiX className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* New Previews */}
            {previews.length > 0 && (
                <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">New Images to Upload:</p>
                    <div className="grid grid-cols-4 gap-2">
                        {previews.map((src, i) => (
                            <div key={i} className="relative group">
                                <img
                                    src={src}
                                    alt="preview"
                                    className="w-full h-20 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <HiX className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Save Event
            </button>
        </form>
    );
};

export default EventForm;
