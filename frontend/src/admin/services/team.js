import axios from 'axios';
import { SERVER_URL } from '../../env';

const API_URL = `${SERVER_URL}/api/team`;

export const getAllTeams = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
};

export const createTeam = async (teamData) => {
    try {
        const response = await axios.post(API_URL, teamData);
        return response.data;
    } catch (error) {
        console.error("Error creating team member:", error);
        throw error;
    }
};

export const updateTeam = async (id, teamData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, teamData);
        return response.data;
    } catch (error) {
        console.error("Error updating team member:", error);
        throw error;
    }
};

export const deleteTeam = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting team member:", error);
        throw error;
    }
};

export const uploadTeamPhoto = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading photo:", error);
        throw error;
    }
};
