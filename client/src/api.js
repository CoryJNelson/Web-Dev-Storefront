import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProducts = async () => {
    const response = await API.get('/products');
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await API.get(`/products/find/${id}`);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data;
};

export const fetchUserById = async (id, token) => {
    const response = await API.get(`/users/find/${id}`, {
        headers: {
            Authorization: `Bearer ${token}` // Pass the token in the request header
        }
    });
    return response.data;
}

export const createCart = async (userId) => {
    await API.post("/carts/", { 
        userId,
        products: [],
        totalItems: 0,
        total: 0,
     });
}
