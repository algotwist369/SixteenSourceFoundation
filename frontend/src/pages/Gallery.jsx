import React, { useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import galleryData from "../data/galleryData.json";
import { getAllGalleries } from "../admin/services/gallery";
import { SERVER_URL } from "../env";

const Gallery = () => {
    const { pageHeader, content } = galleryData;
    const [selectedImage, setSelectedImage] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchImages = async () => {
            try {
                const response = await getAllGalleries();
                if (response.success && response.data) {
                    const mappedImages = response.data.map(img => ({
                        id: img._id,
                        src: `${SERVER_URL}${img.imageUrl}`,
                        alt: img.title || "Gallery Image"
                    }));
                    setGalleryImages(mappedImages);
                }
            } catch (error) {
                console.error("Failed to load gallery images:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    const handleImageLoad = (imageId) => {
        setLoadedImages(prev => ({
            ...prev,
            [imageId]: true
        }));
    };

    return (
        <div>
            <Section>
                <Heading
                    title={content.title}
                    subtitle={content.subtitle}
                />

                {/* Loading Skeleton */}
                {isLoading ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 mt-10">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="break-inside-avoid mb-4"
                            >
                                <div className="relative overflow-hidden rounded-lg shadow-md bg-gray-200 animate-pulse">
                                    <div className="w-full h-64" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Masonry Grid Layout for Different Sized Images */
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 mt-10">
                        {galleryImages.map((image) => (
                            <div
                                key={image.id}
                                className="break-inside-avoid mb-4 cursor-pointer group"
                                onClick={() => setSelectedImage(image)}
                            >
                                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                    {/* Image Loading Shimmer */}
                                    {!loadedImages[image.id] && (
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                    )}
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className={`w-full h-auto object-cover transition-all duration-300 group-hover:scale-105 ${loadedImages[image.id] ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        onLoad={() => handleImageLoad(image.id)}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative max-w-[99rem] max-h-full">
                            <button
                                className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
                                onClick={() => setSelectedImage(null)}
                            >
                                &times;
                            </button>
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-w-full max-h-[90vh] object-contain"
                            />
                        </div>
                    </div>
                )}
            </Section>
        </div>
    );
};

export default Gallery;
