import api from './api';

export const getUsers = () => api.get('/users');
export const getUsersByRole = (role) => api.get(`/users/role/${role}`);
export const createUser = (payload) => api.post('/users', payload);
