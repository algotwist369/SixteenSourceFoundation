import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTeam from '../../hooks/useTeam';
import { HiUpload, HiPlus, HiTrash } from 'react-icons/hi';
import { getImageUrl } from '../../../utils/image';

const UpdateTeam = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { teams, editTeam, uploadPhoto, loading, error } = useTeam();

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        number: '',
        photo: '',
        position: 999
    });
    const [details, setDetails] = useState([{ label: '', value: '' }]);
    const [photoFile, setPhotoFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const teamMember = teams.find(t => t._id === id);
        if (teamMember) {
            setFormData({
                name: teamMember.name || '',
                role: teamMember.role || '',
                email: teamMember.email || '',
                number: teamMember.number || '',
                photo: teamMember.photo || '',
                position: teamMember.position || 0
            });
            if (teamMember.details && teamMember.details.length > 0) {
                setDetails(teamMember.details);
            } else {
                setDetails([{ label: '', value: '' }]);
            }
            if (teamMember.photo) {
                setPreview(getImageUrl(teamMember.photo));
            }
        }
    }, [id, teams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'position' ? parseInt(value) || 0 : value });
    };

    const handleDetailChange = (index, field, value) => {
        const newDetails = [...details];
        newDetails[index][field] = value;
        setDetails(newDetails);
    };

    const addDetail = () => {
        setDetails([...details, { label: '', value: '' }]);
    };

    const removeDetail = (index) => {
        setDetails(details.filter((_, i) => i !== index));
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
            let photoPath = formData.photo;
            if (photoFile) {
                const uploadData = new FormData();
                uploadData.append('photo', photoFile);
                const uploadRes = await uploadPhoto(uploadData);
                photoPath = uploadRes.photo;
            }

            // Filter out empty details
            const filteredDetails = details.filter(d => d.label.trim() !== '' && d.value.trim() !== '');

            await editTeam(id, { ...formData, photo: photoPath, details: filteredDetails });
            navigate('/admin');
        } catch (err) {
            console.error("Failed to update team member", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Team Member</h2>

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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                            <input
                                type="text"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Display Position (Lower shows first)</label>
                            <input
                                type="number"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Photo</label>
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                        No Photo
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors flex items-center">
                                <HiUpload className="mr-2" />
                                Change Photo
                                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                            </label>
                        </div>
                    </div>

                    <div className="mb-6 border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <label className="block text-gray-700 text-sm font-bold">Custom Details</label>
                            <button
                                type="button"
                                onClick={addDetail}
                                className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-bold"
                            >
                                <HiPlus className="mr-1" /> Add Detail
                            </button>
                        </div>
                        {details.map((detail, index) => (
                            <div key={index} className="flex gap-4 mb-3 items-start">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Label (e.g. Experience)"
                                        value={detail.label}
                                        onChange={(e) => handleDetailChange(index, 'label', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="flex-[2]">
                                    <input
                                        type="text"
                                        placeholder="Value (e.g. 5+ Years)"
                                        value={detail.value}
                                        onChange={(e) => handleDetailChange(index, 'value', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeDetail(index)}
                                    className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded"
                                >
                                    <HiTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-end pt-6 border-t">
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
                            {loading ? 'Updating...' : 'Update Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTeam;
