import React, { createContext, useState, useCallback } from 'react';
import {
    getAllVolunteers,
    getVolunteerById,
    createVolunteer,
    deleteVolunteer
} from '../services/volunteer';

export const VolunteerContext = createContext();

export const VolunteerProvider = ({ children }) => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const fetchVolunteers = useCallback(async (page = 1, limit = 10) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllVolunteers(page, limit);
            setVolunteers(data.data || []);
            setPagination({
                page: data.page,
                limit: data.limit,
                total: data.total,
                totalPages: data.totalPages
            });
        } catch (err) {
            setError(err.message || 'Failed to fetch volunteers');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchVolunteerById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getVolunteerById(id);
            return data.data;
        } catch (err) {
            setError(err.message || 'Failed to fetch volunteer');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addVolunteer = useCallback(async (data) => {
        setLoading(true);
        setError(null);
        try {
            const newVolunteer = await createVolunteer(data);
            setVolunteers((prev) => [newVolunteer.data, ...prev]);
            return newVolunteer;
        } catch (err) {
            setError(err.message || 'Failed to create volunteer');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeVolunteer = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteVolunteer(id);
            setVolunteers((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete volunteer');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <VolunteerContext.Provider
            value={{
                volunteers,
                loading,
                error,
                pagination,
                fetchVolunteers,
                fetchVolunteerById,
                addVolunteer,
                removeVolunteer
            }}
        >
            {children}
        </VolunteerContext.Provider>
    );
};
