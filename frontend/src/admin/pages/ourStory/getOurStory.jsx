import React, { useRef, memo, useCallback } from 'react';
import useOurStory from '../../hooks/useOurStory';
import { Link } from 'react-router-dom';
import { HiPencil, HiTrash, HiVideoCamera } from 'react-icons/hi';
import { SERVER_URL } from '../../../env';

const GetOurStory = memo(() => {
    const { ourStories, loading, error, removeOurStory, fetchOurStories, pagination } = useOurStory();
    const hasFetched = useRef(false);

    React.useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchOurStories();
    }, [fetchOurStories]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this story?')) {
            await removeOurStory(id);
        }
    }, [removeOurStory]);

    const handlePageChange = (newPage) => {
        fetchOurStories(newPage, pagination.limit);
    };

    if (loading && ourStories.length === 0) {
        return <div className="text-center py-10">Loading stories...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Our Stories</h2>
                <Link
                    to="/admin/our-story/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Story
                </Link>
            </div>

            {ourStories.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No stories found. Add one!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ourStories.map((story) => (
                        <div key={story._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                            <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                                {story.video ? (
                                    <video
                                        src={`${SERVER_URL}/${story.video}`}
                                        className="w-full h-full object-cover"
                                        controls
                                    />
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center">
                                        <HiVideoCamera className="w-12 h-12 mb-2" />
                                        <span>No Video</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{story.title}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        #{story.number}
                                    </span>
                                </div>

                                <div className="mb-4 flex-grow">
                                    <h4 className="font-semibold text-sm text-gray-700 mt-2">Mission:</h4>
                                    <p className="text-gray-600 text-sm line-clamp-2">{story.ourMission}</p>

                                    <h4 className="font-semibold text-sm text-gray-700 mt-2">Journey:</h4>
                                    <p className="text-gray-600 text-sm line-clamp-2">{story.ourJourney}</p>
                                </div>

                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex space-x-3">
                                        <Link
                                            to={`/admin/our-story/edit/${story._id}`}
                                            className="text-blue-600 hover:text-blue-800 flex items-center"
                                        >
                                            <HiPencil className="w-5 h-5 mr-1" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(story._id)}
                                            className="text-red-600 hover:text-red-800 flex items-center"
                                        >
                                            <HiTrash className="w-5 h-5 mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
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
        </div>
    );
});

GetOurStory.displayName = 'GetOurStory';

export default GetOurStory;
