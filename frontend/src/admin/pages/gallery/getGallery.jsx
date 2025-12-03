import React, { useRef, memo, useCallback } from 'react';
import useGallery from '../../hooks/useGallery';
import { HiTrash } from 'react-icons/hi';
import { SERVER_URL } from '../../../env';

const GetGallery = memo(() => {
    const { images, loading, error, deleteImage, fetchGallery } = useGallery();
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

    if (loading && images.length === 0) {
        return <div className="text-center py-10">Loading gallery...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            {images.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No images found. Upload some!</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((image) => (
                        <div key={image._id} className="relative group bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <img
                                src={`${SERVER_URL}${image.imageUrl}`}
                                alt="Gallery"
                                className="w-full h-48 object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => handleDelete(image._id)}
                                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
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
