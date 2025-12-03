import axios from 'axios';
import { SERVER_URL } from '../../env';

const API_URL = `${SERVER_URL}/api/case-study`;

export const getAllCaseStudies = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching case studies:", error);
        throw error;
    }
};

export const getCaseStudyById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching case study:", error);
        throw error;
    }
};

export const createCaseStudy = async (caseStudyData) => {
    try {
        const response = await axios.post(API_URL, caseStudyData);
        return response.data;
    } catch (error) {
        console.error("Error creating case study:", error);
        throw error;
    }
};

export const updateCaseStudy = async (id, caseStudyData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, caseStudyData);
        return response.data;
    } catch (error) {
        console.error("Error updating case study:", error);
        throw error;
    }
};

export const deleteCaseStudy = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting case study:", error);
        throw error;
    }
};

export const uploadCaseStudyImage = async (formData) => {
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
