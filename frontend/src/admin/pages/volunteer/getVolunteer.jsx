import React, { useRef, memo, useCallback, useState } from 'react';
import useVolunteer from '../../hooks/useVolunteer';
import { Link } from 'react-router-dom';
import { HiTrash, HiUser, HiMail, HiPhone, HiLocationMarker, HiAcademicCap } from 'react-icons/hi';

const GetVolunteer = memo(() => {
    const { volunteers, loading, error, removeVolunteer, fetchVolunteers, pagination } = useVolunteer();
    const hasFetched = useRef(false);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);

    React.useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchVolunteers();
    }, [fetchVolunteers]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this volunteer?')) {
            await removeVolunteer(id);
        }
    }, [removeVolunteer]);

    const handlePageChange = (newPage) => {
        fetchVolunteers(newPage, pagination.limit);
    };

    if (loading && volunteers.length === 0) {
        return <div className="text-center py-10">Loading volunteers...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Volunteers</h2>
                <Link
                    to="/admin/volunteer/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Volunteer
                </Link>
            </div>

            {volunteers.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No volunteers found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {volunteers.map((volunteer) => (
                        <div key={volunteer._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full p-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <HiUser className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{volunteer.name}</h3>
                                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-600">
                                        {volunteer.gender}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4 flex-grow">
                                <div className="flex items-center text-gray-600 text-sm">
                                    <HiMail className="w-4 h-4 mr-2" />
                                    <a href={`mailto:${volunteer.email}`} className="hover:text-blue-600">{volunteer.email}</a>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <HiPhone className="w-4 h-4 mr-2" />
                                    <a href={`tel:${volunteer.phone}`} className="hover:text-blue-600">{volunteer.phone}</a>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <HiLocationMarker className="w-4 h-4 mr-2" />
                                    <span>{volunteer.address}</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <HiAcademicCap className="w-4 h-4 mr-2" />
                                    <span>{volunteer.education}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                <p className="text-gray-700 text-sm italic line-clamp-3">"{volunteer.message}"</p>
                                {volunteer.message.length > 100 && (
                                    <button
                                        onClick={() => setSelectedVolunteer(volunteer)}
                                        className="text-blue-600 text-xs mt-1 hover:underline"
                                    >
                                        Read More
                                    </button>
                                )}
                            </div>

                            <div className="flex justify-end mt-auto pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleDelete(volunteer._id)}
                                    className="text-red-600 hover:text-red-800 flex items-center"
                                >
                                    <HiTrash className="w-5 h-5 mr-1" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className={`px-4 py-2 rounded ${pagination.page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-gray-700">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className={`px-4 py-2 rounded ${pagination.page === pagination.totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Message Modal */}
            {selectedVolunteer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-lg w-full p-6">
                        <h3 className="text-xl font-bold mb-4">Message from {selectedVolunteer.name}</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{selectedVolunteer.message}</p>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setSelectedVolunteer(null)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

GetVolunteer.displayName = 'GetVolunteer';

export default GetVolunteer;
