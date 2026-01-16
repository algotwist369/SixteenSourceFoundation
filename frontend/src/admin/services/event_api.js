import axios from "axios";
import { SERVER_URL } from '../../env';


const API_BASE = `${SERVER_URL}/api/events`;

export const fetchEvents = (params) => axios.get(API_BASE, { params });

export const fetchEvent = (id) => axios.get(`${API_BASE}/${id}`);

export const createEvent = (data) => axios.post(API_BASE, data);

export const updateEvent = (id, data) => axios.put(`${API_BASE}/${id}`, data);

export const uploadEventGallery = (files) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("images", file);
    });
    return axios.post(`${API_BASE}/upload-gallery`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteEvent = (id) => axios.delete(`${API_BASE}/${id}`);
