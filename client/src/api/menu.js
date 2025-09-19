import API from './axiosConfig';
export const getMenuItems = (params) => API.get('/menu', { params });
export const getMenuItem = (id) => API.get(`/menu/${id}`);
export const createMenuItem = (data) => API.post('/menu', data);
export const updateMenuItem = (id, data) => API.put(`/menu/${id}`, data);
export const deleteMenuItem = (id) => API.delete(`/menu/${id}`);
