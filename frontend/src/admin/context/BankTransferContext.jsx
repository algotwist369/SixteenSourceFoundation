import React, { createContext, useState, useCallback } from 'react';
import {
    uploadQrCode,
    createBankTransfer,
    getAllBankTransfers,
    getBankTransferById,
    updateBankTransfer,
    deleteBankTransfer
} from '../services/bankTransfer';

export const BankTransferContext = createContext();

export const BankTransferProvider = ({ children }) => {
    const [bankTransfers, setBankTransfers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const fetchBankTransfers = useCallback(async (page = 1, limit = 10) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllBankTransfers(page, limit);
            if (response.success) {
                setBankTransfers(response.data || []);
                setPagination({
                    page: response.page,
                    limit: response.limit,
                    total: response.total,
                    totalPages: response.totalPages
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch bank transfers');
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadQrCodeImage = useCallback(async (file) => {
        try {
            const response = await uploadQrCode(file);
            if (response.success) {
                return response.qrCodeImage;
            }
            throw new Error('Upload failed');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload QR code');
            throw err;
        }
    }, []);

    const addBankTransfer = useCallback(async (bankData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createBankTransfer(bankData);
            if (response.success) {
                await fetchBankTransfers(pagination.page, pagination.limit);
                return response.data;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create bank transfer');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchBankTransfers, pagination.page, pagination.limit]);

    const editBankTransfer = useCallback(async (id, bankData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateBankTransfer(id, bankData);
            if (response.success) {
                await fetchBankTransfers(pagination.page, pagination.limit);
                return response.data;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update bank transfer');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchBankTransfers, pagination.page, pagination.limit]);

    const removeBankTransfer = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await deleteBankTransfer(id);
            if (response.success) {
                await fetchBankTransfers(pagination.page, pagination.limit);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete bank transfer');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchBankTransfers, pagination.page, pagination.limit]);

    const getBankTransfer = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getBankTransferById(id);
            if (response.success) {
                return response.data;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch bank transfer');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <BankTransferContext.Provider
            value={{
                bankTransfers,
                loading,
                error,
                pagination,
                fetchBankTransfers,
                uploadQrCodeImage,
                addBankTransfer,
                editBankTransfer,
                removeBankTransfer,
                getBankTransfer
            }}
        >
            {children}
        </BankTransferContext.Provider>
    );
};
