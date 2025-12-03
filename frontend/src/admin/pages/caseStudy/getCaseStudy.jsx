import React, { useRef, memo, useCallback } from 'react';
import useCaseStudy from '../../hooks/useCaseStudy';
import { Link } from 'react-router-dom';
import { HiPencil, HiTrash, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { SERVER_URL } from '../../../env';

const GetCaseStudy = memo(() => {
    const { caseStudies, loading, error, pagination, removeCaseStudy, fetchCaseStudies } = useCaseStudy();
    const hasFetched = useRef(false);

    React.useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchCaseStudies();
    }, [fetchCaseStudies]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this case study?')) {
            await removeCaseStudy(id);
        }
    }, [removeCaseStudy]);

    const handlePageChange = useCallback((newPage) => {
        fetchCaseStudies(newPage, pagination.limit);
    }, [fetchCaseStudies, pagination.limit]);

    if (loading && caseStudies.length === 0) {
        return <div className="text-center py-10">Loading case studies...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Case Studies</h2>
                <Link
                    to="/admin/case-study/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create New
                </Link>
            </div>

            {caseStudies.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No case studies found. Create one!</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {caseStudies.map((caseStudy) => (
                            <div key={caseStudy._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                                <div className="relative h-48">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={caseStudy.image ? `${SERVER_URL}/${caseStudy.image}` : 'https://via.placeholder.com/300x200'}
                                        alt={caseStudy.title}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{caseStudy.title}</h3>
                                        {caseStudy.number && (
                                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                                #{caseStudy.number}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{caseStudy.content}</p>

                                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                                        <div className="flex space-x-3">
                                            <Link
                                                to={`/admin/case-study/edit/${caseStudy._id}`}
                                                className="text-blue-600 hover:text-blue-800 flex items-center"
                                            >
                                                <HiPencil className="w-5 h-5 mr-1" /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(caseStudy._id)}
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

                    {/* Pagination Controls */}
                    {pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center mt-8 space-x-2">
                            <button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 1}
                                className={`flex items-center px-4 py-2 rounded ${pagination.page === 1
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                <HiChevronLeft className="w-5 h-5 mr-1" />
                                Previous
                            </button>

                            <div className="flex space-x-1">
                                {[...Array(pagination.totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`px-4 py-2 rounded ${pagination.page === pageNumber
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages}
                                className={`flex items-center px-4 py-2 rounded ${pagination.page === pagination.totalPages
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                Next
                                <HiChevronRight className="w-5 h-5 ml-1" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
});

GetCaseStudy.displayName = 'GetCaseStudy';

export default GetCaseStudy;
