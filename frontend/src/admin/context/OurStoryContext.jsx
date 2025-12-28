import React, { createContext, useState, useCallback } from 'react';
import {
    getAllOurStories,
    getOurStoryById,
    createOurStory,
    updateOurStory,
    deleteOurStory
} from '../services/ourStory';

export const OurStoryContext = createContext();

export const OurStoryProvider = ({ children }) => {
    const [ourStories, setOurStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const fetchOurStories = useCallback(async (page = 1, limit = 10) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllOurStories(page, limit);
            setOurStories(data.data || []);
            setPagination({
                page: data.page,
                limit: data.limit,
                total: data.total,
                totalPages: data.totalPages
            });
        } catch (err) {
            setError(err.message || 'Failed to fetch stories');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchOurStoryById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getOurStoryById(id);
            return data.data;
        } catch (err) {
            setError(err.message || 'Failed to fetch story');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addOurStory = useCallback(async (data) => {
        setLoading(true);
        setError(null);
        try {
            const newStory = await createOurStory(data);
            setOurStories((prev) => [newStory.data, ...prev]);
            return newStory;
        } catch (err) {
            setError(err.message || 'Failed to create story');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const editOurStory = useCallback(async (id, data) => {
        setLoading(true);
        setError(null);
        try {
            const updatedStory = await updateOurStory(id, data);
            setOurStories((prev) => prev.map((item) => (item._id === id ? updatedStory.data : item)));
            return updatedStory;
        } catch (err) {
            setError(err.message || 'Failed to update story');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeOurStory = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteOurStory(id);
            setOurStories((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete story');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <OurStoryContext.Provider
            value={{
                ourStories,
                loading,
                error,
                pagination,
                fetchOurStories,
                fetchOurStoryById,
                addOurStory,
                editOurStory,
                removeOurStory
            }}
        >
            {children}
        </OurStoryContext.Provider>
    );
};
