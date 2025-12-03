import { SERVER_URL } from "../../env";
import axios from "axios";

const uploadQrCode = async (file) => {
    try {
        const formData = new FormData();
        formData.append("qrCodeImage", file);
        const response = await axios.post(`${SERVER_URL}/api/bank-transfer/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading QR code:", error);
        throw error;
    }
};

const createBankTransfer = async (bankData) => {
    try {
        const response = await axios.post(`${SERVER_URL}/api/bank-transfer`, bankData);
        return response.data;
    } catch (error) {
        console.error("Error creating bank transfer:", error);
        throw error;
    }
};

const getAllBankTransfers = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/bank-transfer?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching bank transfers:", error);
        throw error;
    }
};

const getBankTransferById = async (id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/bank-transfer/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching bank transfer:", error);
        throw error;
    }
};

const updateBankTransfer = async (id, bankData) => {
    try {
        const response = await axios.put(`${SERVER_URL}/api/bank-transfer/${id}`, bankData);
        return response.data;
    } catch (error) {
        console.error("Error updating bank transfer:", error);
        throw error;
    }
};

const deleteBankTransfer = async (id) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/api/bank-transfer/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting bank transfer:", error);
        throw error;
    }
};

export {
    uploadQrCode,
    createBankTransfer,
    getAllBankTransfers,
    getBankTransferById,
    updateBankTransfer,
    deleteBankTransfer
};