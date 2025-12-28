import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useOurStory from '../../hooks/useOurStory';
import { HiPlus, HiTrash } from 'react-icons/hi';

const UpdateOurStory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { editOurStory, fetchOurStoryById, loading, error } = useOurStory();

    const [formData, setFormData] = useState({
        title: '',
        ourJourney: '',
        ourMission: '',
        ourStrategy: [''],
        number: '',
        video: ''
    });
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const loadStory = async () => {
            try {
                const story = await fetchOurStoryById(id);
                setFormData({
                    title: story.title || '',
                    ourJourney: story.ourJourney || '',
                    ourMission: story.ourMission || '',
                    ourStrategy: story.ourStrategy && story.ourStrategy.length > 0 ? story.ourStrategy : [''],
                    number: story.number || '',
                    video: story.video || ''
                });
            } catch (err) {
                setFetchError('Failed to load story. Please try again.');
                console.error("Failed to fetch story", err);
            }
        };

        loadStory();
    }, [id, fetchOurStoryById]);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleStrategyChange = (index, value) => {
        const newStrategies = [...formData.ourStrategy];
        newStrategies[index] = value;
        setFormData({ ...formData, ourStrategy: newStrategies });
    };

    const addStrategy = () => {
        setFormData({ ...formData, ourStrategy: [...formData.ourStrategy, ''] });
    };

    const removeStrategy = (index) => {
        const newStrategies = formData.ourStrategy.filter((_, i) => i !== index);
        setFormData({ ...formData, ourStrategy: newStrategies });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const filteredStrategies = formData.ourStrategy.filter(s => s.trim() !== '');

            const storyData = {
                ...formData,
                ourStrategy: filteredStrategies
            };

            await editOurStory(id, storyData);
            navigate('/admin');
        } catch (err) {
            console.error("Failed to update story", err);
        }
    };

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

    const embedUrl = getYouTubeEmbedUrl(formData.video);

    if (fetchError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {fetchError}
                    </div>
                    <button
                        onClick={() => navigate('/admin')}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (loading && !formData.title) {
        return <div className="text-center py-10">Loading story...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Story</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Story Number</label>
                            <input
                                type="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Our Journey</label>
                            <textarea
                                name="ourJourney"
                                value={formData.ourJourney}
                                onChange={handleChange}
                                rows="4"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Our Mission</label>
                            <textarea
                                name="ourMission"
                                value={formData.ourMission}
                                onChange={handleChange}
                                rows="4"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Our Strategy</label>
                            {formData.ourStrategy.map((strategy, index) => (
                                <div key={index} className="flex mb-2">
                                    <input
                                        type="text"
                                        value={strategy}
                                        onChange={(e) => handleStrategyChange(index, e.target.value)}
                                        placeholder={`Strategy point ${index + 1}`}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeStrategy(index)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                                        disabled={formData.ourStrategy.length === 1}
                                    >
                                        <HiTrash />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addStrategy}
                                className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
                            >
                                <HiPlus className="mr-2" /> Add Strategy Point
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">YouTube Video URL</label>
                        <input
                            type="url"
                            name="video"
                            value={formData.video}
                            onChange={handleChange}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {embedUrl && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                                <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden border">
                                    <iframe
                                        src={embedUrl}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => navigate('/admin')}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Updating...' : 'Update Story'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateOurStory;
