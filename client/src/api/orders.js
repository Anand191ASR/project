import API from './axiosConfig';
export const createOrder = (data) => API.post('/orders', data);
export const getMyOrders = () => API.get('/orders/myorders');
export const getAllOrders = () => API.get('/orders');
export const updateOrderStatus = (id, status) => API.patch(`/orders/${id}/status`, { status });
export const getAdminStats = () => API.get('/orders/admin/stats');
