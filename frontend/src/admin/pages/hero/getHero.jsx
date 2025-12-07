import React, { useRef, memo, useCallback } from 'react';
import useHero from '../../hooks/useHero';
import { Link } from 'react-router-dom';
import { HiPencil, HiTrash } from 'react-icons/hi';

const GetHero = memo(() => {
    const { heroSlides, loading, error, removeHeroSlide, fetchHeroSlides } = useHero();
    const hasFetched = useRef(false);

    React.useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchHeroSlides();
    }, [fetchHeroSlides]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this hero slide?')) {
            await removeHeroSlide(id);
        }
    }, [removeHeroSlide]);

    if (loading && heroSlides.length === 0) {
        return <div className="text-center py-10">Loading hero slides...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    const imageSrc = (image) => {
        if (!image) return 'https://via.placeholder.com/300x200';
        return image.startsWith('http') ? image : `${SERVER_URL}/${image}`;
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Hero Slides</h2>
                <Link
                    to="/admin/hero/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Slide
                </Link>
            </div>

            {heroSlides.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No hero slides found. Add one!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {heroSlides.map((slide) => (
                        <div key={slide._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                            <div className="relative h-48">
                                <img
                                    className="w-full h-full object-cover"
                                    src={imageSrc(slide.image)}
                                    alt={slide.title || 'Hero Slide'}
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                {slide.title && (
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{slide.title}</h3>
                                )}
                                {slide.subtitle && (
                                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{slide.subtitle}</p>
                                )}

                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex space-x-3">
                                        <Link
                                            to={`/admin/hero/edit/${slide._id}`}
                                            className="text-blue-600 hover:text-blue-800 flex items-center"
                                        >
                                            <HiPencil className="w-5 h-5 mr-1" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(slide._id)}
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
        </div>
    );
});

GetHero.displayName = 'GetHero';

export default GetHero;
