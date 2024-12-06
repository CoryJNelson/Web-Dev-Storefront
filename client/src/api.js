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

// export const createCart = async (userId) => {
//     await API.post("/carts/", { 
//         userId,
//         products: [],
//         totalItems: 0,
//         total: 0,
//      });
// }

export const createOrder = async (token, userId, cart) => {
    const { items, total, quantity } = cart;
    console.log(token, userId);

    const response = await API.post('/orders/', 
        {
            userId,
            products: items.map(item => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            total: total,
            totalItems: quantity,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}