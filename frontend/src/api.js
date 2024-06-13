import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use(req => {
  if (localStorage.getItem('token')) {
    req.headers['x-auth-token'] = localStorage.getItem('token');
  }
  return req;
});

export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const getQuestions = (language) => API.get(`/quiz/${language}`);
export const addQuestion = (questionData) => API.post('/quiz', questionData);
export const updateQuestion = (id, questionData) => API.put(`/quiz/${id}`, questionData);
export const deleteQuestion = (id) => API.delete(`/quiz/${id}`);
