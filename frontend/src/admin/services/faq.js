import { SERVER_URL } from "../../env";
import axios from "axios";

const createFaq = async (faqData) => {
    try {
        const response = await axios.post(`${SERVER_URL}/api/faq`, faqData);
        return response.data;
    } catch (error) {
        console.error("Error creating FAQ:", error);
        throw error;
    }
};

const getAllFaqs = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/faq`);
        return response.data;
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        throw error;
    }
};

const updateFaq = async (id, faqData) => {
    try {
        const response = await axios.put(`${SERVER_URL}/api/faq/${id}`, faqData);
        return response.data;
    } catch (error) {
        console.error("Error updating FAQ:", error);
        throw error;
    }
};

const deleteFaq = async (id) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/api/faq/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        throw error;
    }
};

export {
    createFaq,
    getAllFaqs,
    updateFaq,
    deleteFaq
};
