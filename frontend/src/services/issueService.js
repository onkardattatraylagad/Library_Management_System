import api from './api';

export const issueBook = (payload) => api.post('/issues', payload);
export const returnBook = (issueId) => api.put(`/issues/${issueId}/return`);
