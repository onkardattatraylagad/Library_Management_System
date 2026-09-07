import api from './api';

export const getBooks = () => api.get('/books');
export const getBookById = (id) => api.get(`/books/${id}`);
export const createBook = (payload) => api.post('/books', payload);
export const updateBook = (id, payload) => api.put(`/books/${id}`, payload);
export const deleteBook = (id) => api.delete(`/books/${id}`);
export const searchBooks = (keyword) => api.get('/books/search', { params: { keyword } });
