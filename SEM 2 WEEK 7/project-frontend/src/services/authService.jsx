import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Signup request
export const signup = async (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

// Login request
export const login = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

// Change password request
export const changePassword = async (passwordData, token) => {
  return axios.post(`${API_URL}/change-password`, passwordData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete user account request
export const deleteUser = async (token) => {
  return axios.delete(`${API_URL}/delete-account`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
