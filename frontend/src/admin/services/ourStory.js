import axios from 'axios';
import { SERVER_URL } from '../../env';

const API_URL = `${SERVER_URL}/api/our-story`;

export const getAllOurStories = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching our stories:", error);
        throw error;
    }
};

export const getOurStoryById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching our story:", error);
        throw error;
    }
};

export const createOurStory = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error creating our story:", error);
        throw error;
    }
};

export const updateOurStory = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating our story:", error);
        throw error;
    }
};

export const deleteOurStory = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting our story:", error);
        throw error;
    }
};

export const uploadOurStoryVideo = async (formData) => {
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
