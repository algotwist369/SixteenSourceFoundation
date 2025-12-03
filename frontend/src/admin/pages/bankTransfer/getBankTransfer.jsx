import React, { useRef, memo, useCallback, useState } from 'react';
import useBankTransfer from '../../hooks/useBankTransfer';
import { Link } from 'react-router-dom';
import { HiPencil, HiTrash, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { SERVER_URL } from '../../../env';

const GetBankTransfer = memo(() => {
    const { bankTransfers, loading, error, removeBankTransfer, fetchBankTransfers, pagination } = useBankTransfer();
    const hasFetched = useRef(false);
    const [selectedImage, setSelectedImage] = useState(null);

    React.useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchBankTransfers(1, 10);
    }, [fetchBankTransfers]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this bank transfer?')) {
            await removeBankTransfer(id);
        }
    }, [removeBankTransfer]);

    const handlePageChange = useCallback((newPage) => {
        fetchBankTransfers(newPage, pagination.limit);
    }, [fetchBankTransfers, pagination.limit]);

    const handleImageClick = useCallback((imageUrl) => {
        setSelectedImage(imageUrl);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedImage(null);
    }, []);

    if (loading && bankTransfers.length === 0) {
        return <div className="text-center py-10">Loading bank transfers...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            {/* Stats Card */}
            <div className="mb-6 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg   p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-100 text-sm">Total Bank Accounts</p>
                        <h3 className="text-3xl font-bold">{pagination.total || 0}</h3>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-full p-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    </div>
                </div>
            </div>

            {bankTransfers.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <p className="mt-4 text-gray-500 text-lg">No bank transfers found. Add one!</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bankTransfers.map((bank) => (
                            <div key={bank._id} className="bg-white rounded-xl  overflow-hidden  transition-all duration-300 transform hover:-translate-y-1">
                                {/* QR Code Section */}
                                {bank.qrCodeImage && (
                                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                                        <img
                                            className="w-full h-full object-contain p-4 cursor-pointer"
                                            src={`${SERVER_URL}/${bank.qrCodeImage}`}
                                            alt="QR Code"
                                            loading="lazy"
                                            onClick={() => handleImageClick(`${SERVER_URL}/${bank.qrCodeImage}`)}
                                        />
                                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            QR Available
                                        </div>
                                    </div>
                                )}

                                {/* Bank Details */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{bank.bankName}</h3>
                                        <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                            {bank.accountType || 'N/A'}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="font-medium">{bank.accoountHolderName || 'N/A'}</span>
                                        </div>

                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            <span className="font-mono">{bank.accountNumber || 'N/A'}</span>
                                        </div>

                                        {bank.ifscCode && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                <span className="font-mono text-xs">{bank.ifscCode}</span>
                                            </div>
                                        )}

                                        {bank.upiId && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-xs">{bank.upiId}</span>
                                            </div>
                                        )}

                                        {bank.branch && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-xs">{bank.branch}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex space-x-3">
                                            <Link
                                                to={`/admin/bank-transfer/edit/${bank._id}`}
                                                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                                            >
                                                <HiPencil className="w-5 h-5 mr-1" />
                                                <span className="text-sm font-medium">Edit</span>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(bank._id)}
                                                className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                                            >
                                                <HiTrash className="w-5 h-5 mr-1" />
                                                <span className="text-sm font-medium">Delete</span>
                                            </button>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(bank.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg  ">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <button
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={pagination.page === pagination.totalPages}
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(pagination.page * pagination.limit, pagination.total)}
                                        </span> of{' '}
                                        <span className="font-medium">{pagination.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md  -sm" aria-label="Pagination">
                                        <button
                                            onClick={() => handlePageChange(pagination.page - 1)}
                                            disabled={pagination.page === 1}
                                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <HiChevronLeft className="h-5 w-5" />
                                        </button>
                                        {[...Array(pagination.totalPages)].map((_, index) => (
                                            <button
                                                key={index + 1}
                                                onClick={() => handlePageChange(index + 1)}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${pagination.page === index + 1
                                                        ? 'z-10 bg-gray-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
                                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                    }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => handlePageChange(pagination.page + 1)}
                                            disabled={pagination.page === pagination.totalPages}
                                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <HiChevronRight className="h-5 w-5" />
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <img
                            src={selectedImage}
                            alt="QR Code Full Size"
                            className="max-w-full max-h-screen object-contain rounded-lg"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

GetBankTransfer.displayName = 'GetBankTransfer';

export default GetBankTransfer;
