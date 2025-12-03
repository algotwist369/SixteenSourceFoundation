import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOurStory from '../../hooks/useOurStory';
import { HiUpload, HiPlus, HiTrash } from 'react-icons/hi';

const CreateOurStory = () => {
    const navigate = useNavigate();
    const { addOurStory, uploadVideo, loading, error } = useOurStory();

    const [formData, setFormData] = useState({
        title: '',
        ourJourney: '',
        ourMission: '',
        ourStrategy: [''], // Start with one empty strategy
        number: '',
        video: ''
    });
    const [videoFile, setVideoFile] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    // Strategy Array Handlers
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

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let videoPath = '';
            if (videoFile) {
                const uploadData = new FormData();
                uploadData.append('video', videoFile);
                const uploadRes = await uploadVideo(uploadData);
                videoPath = uploadRes.video;
            }

            // Filter out empty strategies
            const filteredStrategies = formData.ourStrategy.filter(s => s.trim() !== '');

            const storyData = {
                ...formData,
                ourStrategy: filteredStrategies,
                video: videoPath
            };

            await addOurStory(storyData);
            navigate('/admin');
        } catch (err) {
            console.error("Failed to create story", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Story</h2>

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
                        <label className="block text-gray-700 text-sm font-bold mb-2">Video Upload</label>
                        <div className="mt-2">
                            <label className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors inline-flex items-center">
                                <HiUpload className="mr-2" />
                                {videoFile ? videoFile.name : 'Select Video File'}
                                <input type="file" className="hidden" accept="video/*" onChange={handleVideoChange} />
                            </label>
                        </div>
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
                            {loading ? 'Creating...' : 'Create Story'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateOurStory;
