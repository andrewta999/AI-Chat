import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const signup = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/signup`, { username, password });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};
