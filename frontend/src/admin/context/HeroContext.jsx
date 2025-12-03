import React, { createContext, useState, useCallback } from 'react';
import { getAllHeroSlides, getHeroSlideById, createHeroSlide, updateHeroSlide, deleteHeroSlide, uploadHeroImage } from '../services/hero';

export const HeroContext = createContext();

export const HeroProvider = ({ children }) => {
    const [heroSlides, setHeroSlides] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHeroSlides = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllHeroSlides();
            setHeroSlides(data.data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch hero slides');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchHeroSlideById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getHeroSlideById(id);
            return data.data;
        } catch (err) {
            setError(err.message || 'Failed to fetch hero slide');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addHeroSlide = useCallback(async (heroData) => {
        setLoading(true);
        setError(null);
        try {
            const newSlide = await createHeroSlide(heroData);
            setHeroSlides((prev) => [newSlide.data, ...prev]);
            return newSlide;
        } catch (err) {
            setError(err.message || 'Failed to create hero slide');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const editHeroSlide = useCallback(async (id, heroData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedSlide = await updateHeroSlide(id, heroData);
            setHeroSlides((prev) => prev.map((slide) => (slide._id === id ? updatedSlide.data : slide)));
            return updatedSlide;
        } catch (err) {
            setError(err.message || 'Failed to update hero slide');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeHeroSlide = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteHeroSlide(id);
            setHeroSlides((prev) => prev.filter((slide) => slide._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete hero slide');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadImage = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await uploadHeroImage(formData);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to upload image');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <HeroContext.Provider
            value={{
                heroSlides,
                loading,
                error,
                fetchHeroSlides,
                fetchHeroSlideById,
                addHeroSlide,
                editHeroSlide,
                removeHeroSlide,
                uploadImage
            }}
        >
            {children}
        </HeroContext.Provider>
    );
};
