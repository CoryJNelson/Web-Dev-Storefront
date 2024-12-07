import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchUserById, updateUser } from '../api'

const AccountPage = () => {
    const { id } = useParams(); // get user id from URL
    const [user, setUser] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        newPassword: '',
        oldPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('token');
            try {
            const data = await fetchUserById(id, token);
            setUser(data);
            } catch (err) {
            setErrors({ fetchUser: 'Failed to load account. Try refreshing the page.'  });
            } finally {
            setLoading(false);
            }
        }

        getUser();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        console.log('handleUpdateUser called');

        const filteredData = Object.keys(formData).reduce((acc, key) => {
            if (formData[key]) {
                acc[key] = formData[key];
            }
            return acc;
        }, {});

        try {
            console.log(user._id, localStorage.getItem('token'), filteredData);
            const response = await updateUser(user._id, localStorage.getItem('token'), filteredData);
            console.log(response);
            setSuccessMessage(`User ${response.username} was successfully updated!`);
        } catch (err) {
            console.error('Failed to update user details...', err);
        }
    }

    if (loading) return <p>Loading account details...</p>
    if (errors.fetchUser) return <p>{errors.fetchUser}</p>

    return (
        <div>
            <h1>{user.username}</h1>
            <p>Email: {user.email}</p>
            <p>Account Created: {new Date(user.createdAt).toLocaleString()}</p>
            <h2>Update Account Details</h2>
            <form onSubmit={handleUpdateUser}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Enter a New Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        placeholder="Enter a New Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                        type="text" 
                        id="newPassword" 
                        placeholder="Enter a New Password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="currentPassword">Current Password</label>
                    <input 
                        type="text" 
                        id="currentPassword" 
                        placeholder="Enter Your Current Password"
                        name="oldPassword"
                        value={formData.oldPassword} 
                        onChange={handleChange}
                        required />
                </div>
                <button type="submit">Submit</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
            <h2>Order History</h2>
        </div>
    )
}

export default AccountPage
