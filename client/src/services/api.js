import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProducts = async () => {
    const response = await API.get('/products');
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await API.post('/login', credentials);
    return response.data;
};