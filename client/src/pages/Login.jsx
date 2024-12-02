import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'
import { AuthContext } from '../AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });

  // Create states for communicating success and errors to user
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await loginUser({
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      });
      login(response.token); // update global state with token
      setSuccessMessage(`User ${response.username} successfully logged in! Welcome back!`);
      setTimeout(() => navigate('/'), 3000); // redirect after 3 seconds
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error.message || 'An error occurred during login.');
    }
  };

  return (
    <div>
      <h1 style={styles.heading}>Login</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="usernameOrEmail">Username or Email:</label>
          <input 
            type="text" 
            id="usernameOrEmail" 
            placeholder="Enter your username or email" 
            name="usernameOrEmail" 
            value={formData.usernameOrEmail} 
            onChange={handleChange} 
            required />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter your password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required />
        </div>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={styles.registerLink}>
        New to Jolt? <Link to="/register" style={styles.link}>Sign Up</Link>
      </p>
    </div>
  )
}

const styles = {
  heading: { textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: "0 auto" },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  button: { padding: '0.5rem', background: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' },
  registerLink: { marginTop: '1rem', textAlign: 'center' },
  link: { textDecoration: 'none', color: '#007BFF' }
}

export default Login
