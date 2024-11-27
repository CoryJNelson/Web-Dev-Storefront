import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProducts = async () => {
    const products = await API.get('/products');
    return products.data;
};