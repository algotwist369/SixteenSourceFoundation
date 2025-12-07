import React, { createContext, useState, useCallback } from 'react';
import { getAllHeroSlides, getHeroSlideById, createHeroSlide, updateHeroSlide, deleteHeroSlide, uploadHeroImage } from '../services/hero';
import { SERVER_URL } from '../../env';

export const HeroContext = createContext();

export const HeroProvider = ({ children }) => {
    const [heroSlides, setHeroSlides] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const normalizeSlides = (rawList) => {
        return rawList.map((slide, idx) => {
            const image = slide?.image
                ? (slide.image.startsWith('http') ? slide.image : `${SERVER_URL}/${slide.image}`)
                : 'https://via.placeholder.com/800x400?text=Hero';

            return {
                ...slide,
                _id: slide?._id || slide?.id || idx,
                title: slide?.title || '',
                subtitle: slide?.subtitle || '',
                image
            };
        });
    };

    const extractList = (data) => {
        if (Array.isArray(data?.data)) return data.data;
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.data?.data)) return data.data.data;
        return [];
    };

    const fetchHeroSlides = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllHeroSlides();
            const list = extractList(data);
            setHeroSlides(normalizeSlides(list));
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
            const list = extractList(newSlide);
            const normalized = list.length > 0 ? normalizeSlides(list) : [normalizeSlides([newSlide.data || newSlide])[0]];
            setHeroSlides((prev) => [...normalized, ...prev]);
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
            const list = extractList(updatedSlide);
            const normalized = list.length > 0 ? normalizeSlides(list)[0] : normalizeSlides([updatedSlide.data || updatedSlide])[0];
            setHeroSlides((prev) => prev.map((slide) => (slide._id === id ? normalized : slide)));
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
