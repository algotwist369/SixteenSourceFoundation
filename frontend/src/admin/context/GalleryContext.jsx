import React, { createContext, useState, useCallback } from 'react';
import { getAllGalleries, uploadSingleImage, uploadMultipleImages, deleteSingleImage, deleteMultipleImages, deleteAllGalleryImages } from '../services/gallery';

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGallery = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllGalleries();
            setImages(data.data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch gallery');
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadImage = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const newImage = await uploadSingleImage(formData);
            setImages((prev) => [newImage.data, ...prev]);
            return newImage;
        } catch (err) {
            setError(err.message || 'Failed to upload image');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadImages = useCallback(async (files) => {
        setLoading(true);
        setError(null);
        try {
            const batchSize = 5; // Smaller batches to avoid Nginx 413 errors
            const allResults = [];

            for (let i = 0; i < files.length; i += batchSize) {
                const batch = files.slice(i, i + batchSize);
                const formData = new FormData();
                batch.forEach(file => formData.append('images', file));

                const response = await uploadMultipleImages(formData);
                setImages((prev) => [...response.data, ...prev]);
                allResults.push(response);
            }
            return allResults;
        } catch (err) {
            setError(err.message || 'Failed to upload images');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteImage = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteSingleImage(id);
            setImages((prev) => prev.filter((img) => img._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete image');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteImages = useCallback(async (ids) => {
        setLoading(true);
        setError(null);
        try {
            await deleteMultipleImages(ids);
            setImages((prev) => prev.filter((img) => !ids.includes(img._id)));
        } catch (err) {
            setError(err.message || 'Failed to delete images');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteAllImages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteAllGalleryImages();
            setImages([]);
        } catch (err) {
            setError(err.message || 'Failed to delete all images');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <GalleryContext.Provider
            value={{
                images,
                loading,
                error,
                fetchGallery,
                uploadImage,
                uploadImages,
                deleteImage,
                deleteImages,
                deleteAllImages
            }}
        >
            {children}
        </GalleryContext.Provider>
    );
};
