import React, { createContext, useState, useCallback } from 'react';
import { getAllCaseStudies, getCaseStudyById, createCaseStudy, updateCaseStudy, deleteCaseStudy, uploadCaseStudyImage } from '../services/caseStudy';

export const CaseStudyContext = createContext();

export const CaseStudyProvider = ({ children }) => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        totalPages: 0,
        limit: 10
    });

    const fetchCaseStudies = useCallback(async (page = 1, limit = 10) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllCaseStudies(page, limit);
            setCaseStudies(data.data || []);
            setPagination({
                total: data.total || 0,
                page: data.page || 1,
                totalPages: data.totalPages || 0,
                limit: data.limit || 10
            });
        } catch (err) {
            setError(err.message || 'Failed to fetch case studies');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCaseStudyById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCaseStudyById(id);
            return data.data;
        } catch (err) {
            setError(err.message || 'Failed to fetch case study');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addCaseStudy = useCallback(async (caseStudyData) => {
        setLoading(true);
        setError(null);
        try {
            const newCaseStudy = await createCaseStudy(caseStudyData);
            setCaseStudies((prev) => [newCaseStudy.data, ...prev]);
            setPagination((prev) => ({
                ...prev,
                total: prev.total + 1
            }));
            return newCaseStudy;
        } catch (err) {
            setError(err.message || 'Failed to create case study');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const editCaseStudy = useCallback(async (id, caseStudyData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedCaseStudy = await updateCaseStudy(id, caseStudyData);
            setCaseStudies((prev) => prev.map((caseStudy) => (caseStudy._id === id ? updatedCaseStudy.data : caseStudy)));
            return updatedCaseStudy;
        } catch (err) {
            setError(err.message || 'Failed to update case study');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeCaseStudy = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteCaseStudy(id);
            setCaseStudies((prev) => prev.filter((caseStudy) => caseStudy._id !== id));
            setPagination((prev) => ({
                ...prev,
                total: prev.total - 1
            }));
        } catch (err) {
            setError(err.message || 'Failed to delete case study');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadImage = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await uploadCaseStudyImage(formData);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to upload image');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <CaseStudyContext.Provider
            value={{
                caseStudies,
                loading,
                error,
                pagination,
                fetchCaseStudies,
                fetchCaseStudyById,
                addCaseStudy,
                editCaseStudy,
                removeCaseStudy,
                uploadImage
            }}
        >
            {children}
        </CaseStudyContext.Provider>
    );
};
