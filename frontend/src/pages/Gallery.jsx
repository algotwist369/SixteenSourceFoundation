import React, { useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import galleryData from "../data/galleryData.json";

const Gallery = () => {
    const { pageHeader, content } = galleryData;
    const [selectedImage, setSelectedImage] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Get all images from GalleryImg folder
    const galleryImages = [
        { id: 1, src: "/assets/GalleryImg/1.jpeg", alt: "Gallery Image 1" },
        { id: 2, src: "/assets/GalleryImg/2.jpeg", alt: "Gallery Image 2" },
        { id: 3, src: "/assets/GalleryImg/3.jpeg", alt: "Gallery Image 3" },
        { id: 4, src: "/assets/GalleryImg/4.jpeg", alt: "Gallery Image 4" },
        { id: 5, src: "/assets/GalleryImg/5.jpeg", alt: "Gallery Image 5" },
        { id: 6, src: "/assets/GalleryImg/6.jpeg", alt: "Gallery Image 6" },
        { id: 7, src: "/assets/GalleryImg/7.jpeg", alt: "Gallery Image 7" },
        { id: 8, src: "/assets/GalleryImg/8.jpeg", alt: "Gallery Image 8" },
        { id: 9, src: "/assets/GalleryImg/9.jpeg", alt: "Gallery Image 9" },
        { id: 10, src: "/assets/GalleryImg/10.jpeg", alt: "Gallery Image 10" },
        { id: 11, src: "/assets/GalleryImg/11.jpeg", alt: "Gallery Image 11" },
        { id: 12, src: "/assets/GalleryImg/12.jpeg", alt: "Gallery Image 12" },
        { id: 13, src: "/assets/GalleryImg/13.jpeg", alt: "Gallery Image 13" },
        { id: 14, src: "/assets/GalleryImg/14.jpeg", alt: "Gallery Image 14" },
        { id: 15, src: "/assets/GalleryImg/15.jpeg", alt: "Gallery Image 15" },
        { id: 16, src: "/assets/GalleryImg/16.jpeg", alt: "Gallery Image 16" },
        { id: 17, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.28 PM.jpeg", alt: "Gallery Image 17" },
        { id: 18, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.29 PM (1).jpeg", alt: "Gallery Image 18" },
        { id: 19, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.29 PM (2).jpeg", alt: "Gallery Image 19" },
        { id: 20, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.29 PM (3).jpeg", alt: "Gallery Image 20" },
        { id: 21, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.29 PM.jpeg", alt: "Gallery Image 21" },
        { id: 22, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.30 PM (1).jpeg", alt: "Gallery Image 22" },
        { id: 23, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.30 PM.jpeg", alt: "Gallery Image 23" },
        { id: 24, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.31 PM (1).jpeg", alt: "Gallery Image 24" },
        { id: 25, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.31 PM (2).jpeg", alt: "Gallery Image 25" },
        { id: 26, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.31 PM.jpeg", alt: "Gallery Image 26" },
        { id: 27, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.32 PM (1).jpeg", alt: "Gallery Image 27" },
        { id: 28, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.32 PM (2).jpeg", alt: "Gallery Image 28" },
        { id: 29, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.32 PM.jpeg", alt: "Gallery Image 29" },
        { id: 30, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.33 PM (1).jpeg", alt: "Gallery Image 30" },
        { id: 31, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.33 PM.jpeg", alt: "Gallery Image 31" },
        { id: 32, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.34 PM (1).jpeg", alt: "Gallery Image 32" },
        { id: 33, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.34 PM (2).jpeg", alt: "Gallery Image 33" },
        { id: 34, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.34 PM.jpeg", alt: "Gallery Image 34" },
        { id: 35, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.35 PM (1).jpeg", alt: "Gallery Image 35" },
        { id: 36, src: "/assets/GalleryImg/WhatsApp Image 2025-10-04 at 4.28.35 PM.jpeg", alt: "Gallery Image 36" },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Set loading to false after a short delay to show initial load state
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleImageLoad = (imageId) => {
        setLoadedImages(prev => ({
            ...prev,
            [imageId]: true
        }));
    };

    return (
        <div>
            <PageHeader
                title={pageHeader.title}
                subtitle={pageHeader.subtitle}
                image={pageHeader.image}
            />

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
                                        className={`w-full h-auto object-cover transition-all duration-300 group-hover:scale-105 ${
                                            loadedImages[image.id] ? 'opacity-100' : 'opacity-0'
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
