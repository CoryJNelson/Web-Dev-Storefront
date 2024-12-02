import { createSlice } from '@reduxjs/toolkit';

export const loadFromLocalStorage = () => {
    try {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : { 
            items: [], quantity: 0, total: 0, savedCart: null 
        };
    } catch (err) {
        console.error('Failed to load cart from localStorage:', err);
        return { items: [], quantity: 0, total: 0, savedCart: null };
    }
};

const initialState = loadFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
            state.quantity += action.payload.quantity;
            state.total += action.payload.quantity * action.payload.price;
        },
        removeFromCart: (state, action) => {
            const itemToRemove = state.items.find(item => item.id === action.payload.id);
            if (itemToRemove) {
                state.quantity -= itemToRemove.quantity;
                state.total -= itemToRemove.quantity * itemToRemove.price;
                state.items = state.items.filter(item => item.id !== action.payload.id);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;