import axios from 'axios';
import { SERVER_URL } from '../../env';

const API_URL = `${SERVER_URL}/api/hero`;

export const getAllHeroSlides = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching hero slides:", error);
        throw error;
    }
};

export const getHeroSlideById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching hero slide:", error);
        throw error;
    }
};

export const createHeroSlide = async (heroData) => {
    try {
        const response = await axios.post(API_URL, heroData);
        return response.data;
    } catch (error) {
        console.error("Error creating hero slide:", error);
        throw error;
    }
};

export const updateHeroSlide = async (id, heroData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, heroData);
        return response.data;
    } catch (error) {
        console.error("Error updating hero slide:", error);
        throw error;
    }
};

export const deleteHeroSlide = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting hero slide:", error);
        throw error;
    }
};

export const uploadHeroImage = async (formData) => {
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
