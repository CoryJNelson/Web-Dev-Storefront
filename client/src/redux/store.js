import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';

const saveToLocalStorage = (cartState) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cartState));
    } catch (err) {
        console.error('Failed to save cart to localStorage', err);
    }
};

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

store.subscribe(() => {
    const cartState = store.getState().cart;
    saveToLocalStorage(cartState);
});

export default store;