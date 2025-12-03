import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHero from '../../hooks/useHero';
import { HiUpload } from 'react-icons/hi';

const CreateHero = () => {
    const navigate = useNavigate();
    const { addHeroSlide, uploadImage, loading, error } = useHero();

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: ''
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imagePath = '';
            if (photoFile) {
                const uploadData = new FormData();
                uploadData.append('image', photoFile);
                const uploadRes = await uploadImage(uploadData);
                imagePath = uploadRes.image;
            } else {
                alert("Image is required for hero slides");
                return;
            }

            const heroData = {
                ...formData,
                image: imagePath
            };

            await addHeroSlide(heroData);
            navigate('/admin');
        } catch (err) {
            console.error("Failed to create hero slide", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Hero Slide</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title (Optional)</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Subtitle (Optional)</label>
                            <textarea
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                rows="3"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Hero Image (Required)</label>
                        <div className="flex items-center space-x-4">
                            <div className="w-full h-48 bg-gray-100 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                        No Image Selected
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors inline-flex items-center">
                                <HiUpload className="mr-2" />
                                Upload Image
                                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} required />
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
                            {loading ? 'Creating...' : 'Create Slide'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateHero;
