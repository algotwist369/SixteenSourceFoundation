import React, { createContext, useState, useCallback } from 'react';
import { createFaq, getAllFaqs, updateFaq, deleteFaq } from '../services/faq';

export const FAQContext = createContext();

export const FAQProvider = ({ children }) => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFaqs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllFaqs();
            setFaqs(data.data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch FAQs');
        } finally {
            setLoading(false);
        }
    }, []);

    const addFaq = useCallback(async (faqData) => {
        setLoading(true);
        setError(null);
        try {
            const newFaq = await createFaq(faqData);
            setFaqs((prev) => [newFaq.data, ...prev]);
            return newFaq;
        } catch (err) {
            setError(err.message || 'Failed to create FAQ');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const editFaq = useCallback(async (id, faqData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedFaq = await updateFaq(id, faqData);
            setFaqs((prev) => prev.map((faq) => (faq._id === id ? updatedFaq.data : faq)));
            return updatedFaq;
        } catch (err) {
            setError(err.message || 'Failed to update FAQ');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeFaq = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteFaq(id);
            setFaqs((prev) => prev.filter((faq) => faq._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete FAQ');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <FAQContext.Provider
            value={{
                faqs,
                loading,
                error,
                fetchFaqs,
                addFaq,
                editFaq,
                removeFaq
            }}
        >
            {children}
        </FAQContext.Provider>
    );
};
