import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Dynamically set from environment
});

export const approveUser = (userId) =>
    api.post(`/admin/users/approve/${userId}`);
export const rejectUser = (userId) => api.post(`/admin/users/reject/${userId}`);
