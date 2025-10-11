import React from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Card from "../components/common/Card";
import galleryData from "../data/galleryData.json";

const Gallery = () => {
    const { pageHeader, content, images } = galleryData;

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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                    {images.map((image) => (
                        <Card key={image.id} className="p-0 overflow-hidden">
                            <div className="relative group">
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                    <h3 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center font-semibold">
                                        {image.title}
                                    </h3>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section bgColor="bg-gray-50">
                <div className="text-center">
                    <Heading
                        title="Coming Soon"
                        subtitle="More photos and videos from our initiatives"
                    />
                    <p className="text-gray-600 mt-4">
                        We're constantly capturing moments of change and impact. 
                        Check back soon for more updates from our field operations.
                    </p>
                </div>
            </Section>
        </div>
    );
};

export default Gallery;
