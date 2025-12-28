import React, { createContext, useState, useCallback } from 'react';
import {
    getAllSuccessStories,
    getSuccessStoryById,
    createSuccessStory,
    updateSuccessStory,
    deleteSuccessStory,
    uploadSuccessStoryVideo
} from '../services/successStories';

export const SuccessStoriesContext = createContext();

export const SuccessStoriesProvider = ({ children }) => {
    const [successStories, setSuccessStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const fetchSuccessStories = useCallback(async (page = 1, limit = 10) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllSuccessStories(page, limit);
            setSuccessStories(data.data || []);
            setPagination({
                page: data.page,
                limit: data.limit,
                total: data.total,
                totalPages: data.totalPages
            });
        } catch (err) {
            setError(err.message || 'Failed to fetch success stories');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSuccessStoryById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getSuccessStoryById(id);
            return data.data;
        } catch (err) {
            setError(err.message || 'Failed to fetch success story');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addSuccessStory = useCallback(async (data) => {
        setLoading(true);
        setError(null);
        try {
            const newStory = await createSuccessStory(data);
            setSuccessStories((prev) => [newStory.data, ...prev]);
            return newStory;
        } catch (err) {
            setError(err.message || 'Failed to create success story');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const editSuccessStory = useCallback(async (id, data) => {
        setLoading(true);
        setError(null);
        try {
            const updatedStory = await updateSuccessStory(id, data);
            setSuccessStories((prev) => prev.map((item) => (item._id === id ? updatedStory.data : item)));
            return updatedStory;
        } catch (err) {
            setError(err.message || 'Failed to update success story');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeSuccessStory = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteSuccessStory(id);
            setSuccessStories((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete success story');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadVideo = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await uploadSuccessStoryVideo(formData);
            return response;
        } catch (err) {
            if (err.response?.status === 413) {
                setError('The video file is too large for the server. Please check your Nginx client_max_body_size setting.');
            } else {
                setError(err.message || 'Failed to upload video');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <SuccessStoriesContext.Provider
            value={{
                successStories,
                loading,
                error,
                pagination,
                fetchSuccessStories,
                fetchSuccessStoryById,
                addSuccessStory,
                editSuccessStory,
                removeSuccessStory,
                uploadVideo
            }}
        >
            {children}
        </SuccessStoriesContext.Provider>
    );
};
