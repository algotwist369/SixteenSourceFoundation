import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCaseStudy from '../../hooks/useCaseStudy';
import { HiUpload } from 'react-icons/hi';

const CreateCaseStudy = () => {
    const navigate = useNavigate();
    const { addCaseStudy, uploadImage, loading, error } = useCaseStudy();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        number: '',
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
            }

            const caseStudyData = {
                ...formData,
                image: imagePath
            };

            await addCaseStudy(caseStudyData);
            navigate('/admin');
        } catch (err) {
            console.error("Failed to create case study", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Case Study</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Case Study Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="6"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Case Study Number/ID</label>
                            <input
                                type="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Case Study Image</label>
                        <div className="flex items-center space-x-4">
                            <div className="w-32 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors flex items-center">
                                <HiUpload className="mr-2" />
                                Upload Image
                                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
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
                            {loading ? 'Creating...' : 'Create Case Study'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCaseStudy;
