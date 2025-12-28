import axios from 'axios';
import { SERVER_URL } from '../../env';

const API_URL = `${SERVER_URL}/api/success-stories`;

export const getAllSuccessStories = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching success stories:", error);
        throw error;
    }
};

export const getSuccessStoryById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching success story:", error);
        throw error;
    }
};

export const createSuccessStory = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error creating success story:", error);
        throw error;
    }
};

export const updateSuccessStory = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating success story:", error);
        throw error;
    }
};

export const deleteSuccessStory = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting success story:", error);
        throw error;
    }
};

export const uploadSuccessStoryVideo = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 600000 // 10 minutes
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading video:", error);
        throw error;
    }
};
