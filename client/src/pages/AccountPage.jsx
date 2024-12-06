import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUserById } from '../api'

const AccountPage = () => {
    const { id } = useParams(); // get user id from URL
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('token');
            try {
            const data = await fetchUserById(id, token);
            setUser(data);
            } catch (err) {
            setError('Failed to load account. Try refreshing the page.');
            } finally {
            setLoading(false);
            }
        }

        getUser();
    }, [id]);

    if (loading) return <p>Loading account details...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>{user.username}</h1>
            <p>Email: {user.email}</p>
            <p>Account Created: {new Date(user.createdAt).toLocaleString()}</p>
        </div>
    )
}

export default AccountPage
