import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCourse from '../../hooks/useCourse';
import { HiUpload, HiPlus, HiX } from 'react-icons/hi';

const CreateCourse = () => {
    const navigate = useNavigate();
    const { addCourse, uploadImage, loading, error } = useCourse();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        number: '',
        isNewCourse: false,
        image: ''
    });
    const [topics, setTopics] = useState(['']);
    const [benefits, setBenefits] = useState(['']);
    const [photoFile, setPhotoFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleArrayChange = (index, value, setter, array) => {
        const newArray = [...array];
        newArray[index] = value;
        setter(newArray);
    };

    const addArrayItem = (setter, array) => {
        setter([...array, '']);
    };

    const removeArrayItem = (index, setter, array) => {
        const newArray = array.filter((_, i) => i !== index);
        setter(newArray);
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

            const courseData = {
                ...formData,
                image: imagePath,
                topics: topics.filter(t => t.trim() !== ''),
                benefits: benefits.filter(b => b.trim() !== '')
            };

            await addCourse(courseData);
            navigate('/admin');
        } catch (err) {
            console.error("Failed to create course", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Course</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Course Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
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
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="e.g. 8 Weeks"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Course Number/ID</label>
                            <input
                                type="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isNewCourse"
                                checked={formData.isNewCourse}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-gray-700 text-sm font-bold">Mark as New Course</label>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Course Image</label>
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

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Topics Covered</label>
                        {topics.map((topic, index) => (
                            <div key={index} className="flex mb-2">
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => handleArrayChange(index, e.target.value, setTopics, topics)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                    placeholder={`Topic ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem(index, setTopics, topics)}
                                    className="text-red-500 hover:text-red-700"
                                    disabled={topics.length === 1}
                                >
                                    <HiX className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem(setTopics, topics)}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1"
                        >
                            <HiPlus className="w-4 h-4 mr-1" /> Add Topic
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Benefits</label>
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex mb-2">
                                <input
                                    type="text"
                                    value={benefit}
                                    onChange={(e) => handleArrayChange(index, e.target.value, setBenefits, benefits)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                    placeholder={`Benefit ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem(index, setBenefits, benefits)}
                                    className="text-red-500 hover:text-red-700"
                                    disabled={benefits.length === 1}
                                >
                                    <HiX className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem(setBenefits, benefits)}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1"
                        >
                            <HiPlus className="w-4 h-4 mr-1" /> Add Benefit
                        </button>
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
                            {loading ? 'Creating...' : 'Create Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;
