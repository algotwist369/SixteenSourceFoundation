import React, { useState } from 'react';
import useFAQ from '../../hooks/useFAQ';
import { useNavigate } from 'react-router-dom';

const CreateFAQ = () => {
    const { addFaq, loading, error } = useFAQ();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        question: '',
        answer: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        try {
            await addFaq(formData);
            setSuccessMessage('FAQ created successfully!');
            setFormData({ question: '', answer: '' });
            setTimeout(() => {
                navigate('/admin/faq'); // Assuming there is a list page, or just stay here
            }, 2000);
        } catch (err) {
            console.error("Failed to create FAQ", err);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New FAQ</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="question" className="block text-gray-700 font-medium mb-2">
                        Question
                    </label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the question"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="answer" className="block text-gray-700 font-medium mb-2">
                        Answer
                    </label>
                    <textarea
                        id="answer"
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the answer"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? 'Creating...' : 'Create FAQ'}
                </button>
            </form>
        </div>
    );
};

export default CreateFAQ;