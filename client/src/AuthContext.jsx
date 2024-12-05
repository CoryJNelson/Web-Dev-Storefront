import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // get token from client
        // if token exists, decode token for user information
        if (token) {
          try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
              throw new Error('Token expired');
            }
            setUser({ _id: decoded.id });
          } catch (err) {
            setUser(null);
            console.error('Invalid token:', err);
            localStorage.removeItem('token');
          }
        }
    }, []);
    
    const login =  async (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser({ _id: decoded.id });
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}