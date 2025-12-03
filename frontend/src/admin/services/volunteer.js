import axios from 'axios';
import { SERVER_URL } from '../../env';

const API_URL = `${SERVER_URL}/api/volunteer`;

export const getAllVolunteers = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        throw error;
    }
};

export const getVolunteerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching volunteer:", error);
        throw error;
    }
};

export const createVolunteer = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error creating volunteer:", error);
        throw error;
    }
};

export const deleteVolunteer = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting volunteer:", error);
        throw error;
    }
};
