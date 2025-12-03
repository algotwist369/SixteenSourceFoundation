import axios from 'axios';
import { SERVER_URL } from '../../env';

const API_URL = `${SERVER_URL}/api/gallery`;

export const uploadSingleImage = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export const uploadMultipleImages = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/uploads`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading images:", error);
        throw error;
    }
};

export const getAllGalleries = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching gallery:", error);
        throw error;
    }
};

export const deleteSingleImage = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error;
    }
};

export const deleteMultipleImages = async (ids) => {
    try {
        const response = await axios.delete(API_URL, { data: { ids } });
        return response.data;
    } catch (error) {
        console.error("Error deleting images:", error);
        throw error;
    }
};
