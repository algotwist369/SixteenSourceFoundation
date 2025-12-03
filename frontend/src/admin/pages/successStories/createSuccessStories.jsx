import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSuccessStories from '../../hooks/useSuccessStories';
import { HiUpload } from 'react-icons/hi';

const CreateSuccessStories = () => {
    const navigate = useNavigate();
    const { addSuccessStory, uploadVideo, loading, error } = useSuccessStories();

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        description: '',
        video: ''
    });
    const [videoFile, setVideoFile] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
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

            const storyData = {
                ...formData,
                video: videoPath
            };

            await addSuccessStory(storyData);
            navigate('/admin');
        } catch (err) {
            console.error("Failed to create success story", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Success Story</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
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

export default CreateSuccessStories;
