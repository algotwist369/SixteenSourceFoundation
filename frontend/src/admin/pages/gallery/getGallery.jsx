import React, { useRef, memo, useCallback } from 'react';
import useGallery from '../../hooks/useGallery';
import { HiTrash } from 'react-icons/hi';
import { SERVER_URL } from '../../../env';

const GetGallery = memo(() => {
    const { images, loading, error, deleteImage, fetchGallery, deleteAllImages } = useGallery();
    const hasFetched = useRef(false);

    React.useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchGallery();
    }, [fetchGallery]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            await deleteImage(id);
        }
    }, [deleteImage]);

    const handleDeleteAll = useCallback(async () => {
        if (window.confirm('CRITICAL: Are you sure you want to delete ALL images from the gallery? This action cannot be undone.')) {
            try {
                await deleteAllImages();
            } catch (err) {
                console.error("Failed to delete all images", err);
            }
        }
    }, [deleteAllImages]);

    if (loading && images.length === 0) {
        return <div className="text-center py-10">Loading gallery...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Gallery Management</h2>
                    <p className="text-gray-500 text-sm mt-1">{images.length} images in gallery</p>
                </div>
                {images.length > 0 && (
                    <button
                        onClick={handleDeleteAll}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center transition-all shadow-lg hover:shadow-red-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        <HiTrash className="w-5 h-5 mr-2" />
                        {loading ? 'Processing...' : 'Delete All Images'}
                    </button>
                )}
            </div>

            {images.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-100 shadow-sm">
                    <p className="text-gray-400 font-medium">No images found. Start by uploading some gorgeous photos!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {images.map((image) => (
                        <div key={image._id} className="relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <img
                                src={`${SERVER_URL}${image.imageUrl}`}
                                alt="Gallery photo"
                                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
                                <button
                                    onClick={() => handleDelete(image._id)}
                                    className="bg-white/90 backdrop-blur-sm text-red-600 p-3 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg active:scale-90"
                                    title="Delete Image"
                                >
                                    <HiTrash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

GetGallery.displayName = 'GetGallery';

export default GetGallery;
