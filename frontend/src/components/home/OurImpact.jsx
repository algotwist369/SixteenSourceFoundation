import React, { useState } from "react";
import impactData from "../../data/impact.json";
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const OurImpact = () => {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { impactMedia } = impactData;
    
    // Pagination settings
    const itemsPerPage = 6;
    const totalPages = Math.ceil(impactMedia.length / itemsPerPage);
    
    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = impactMedia.slice(indexOfFirstItem, indexOfLastItem);
    
    // Pagination handlers
    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const goToPrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openModal = (media) => {
        setSelectedMedia(media);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    const closeModal = () => {
        setSelectedMedia(null);
        document.body.style.overflow = 'unset';
    };

  return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-[99rem] mx-auto">
                {/* Heading Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Our Impact in Action
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Witness the transformative power of community support through real stories, 
                        genuine moments, and the lives we've touched together.
                    </p>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {currentItems.map((item) => (
                        <div
                            key={item.id}
                            className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            onClick={() => openModal(item)}
                        >
                            {/* Media Container */}
                            <div className="relative h-72">
                                <img
                                    src={item.type === 'video' ? item.thumbnail : item.media}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                
                                {/* Video Play Button Overlay */}
                                {item.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                                        <div className="bg-green-600 rounded-full p-6 transform group-hover:scale-110 transition-transform">
                                            <FaPlay className="text-white text-3xl ml-1" />
                                        </div>
                                    </div>
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* Category Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-200 drop-shadow">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {/* Previous Button */}
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                                currentPage === 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
                            }`}
                        >
                            <FaChevronLeft />
                            Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1;
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => goToPage(pageNumber)}
                                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                                            currentPage === pageNumber
                                                ? 'bg-green-600 text-white shadow-lg scale-110'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                                currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
                            }`}
                        >
                            Next
                            <FaChevronRight />
                        </button>
                    </div>
                )}

                {/* Items Counter */}
                <div className="text-center mt-6 text-gray-600">
                    Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, impactMedia.length)} of {impactMedia.length} stories
                </div>
            </div>

            {/* Modal */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <button
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10"
                        onClick={closeModal}
                    >
                        <FaTimes size={24} />
                    </button>

                    <div
                        className="max-w-[99rem] w-full bg-white rounded-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedMedia.type === 'video' ? (
                            <div className="relative aspect-video">
                                <iframe
                                    src={selectedMedia.media}
                                    title={selectedMedia.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="relative">
                                <img
                                    src={selectedMedia.media}
                                    alt={selectedMedia.title}
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                />
                            </div>
                        )}
                        
                        <div className="p-6 bg-white">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {selectedMedia.title}
                                </h3>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    {selectedMedia.category}
                                </span>
                            </div>
                            <p className="text-gray-600">
                                {selectedMedia.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OurImpact;
