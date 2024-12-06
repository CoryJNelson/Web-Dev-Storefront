import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../api'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  // Create a state for form input
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
  });
  
  // Create states for communicating success and errors to user
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // We will redirect to login after successful registration
  const navigate = useNavigate();

  // When a form field is changed, formData is updated by field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  // Validate user input
  const validate = () => {
    const newErrors = {};
    if (formData.username.length < 6 || formData.username.length > 30 ) {
      newErrors.username = 'Username must be between 6 and 30 characters.';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    return newErrors;
  }

  // On submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    // validate for errors and end function if present
    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }); // Save user in database
      // await createCart(response._id); // create a cart for the user on registration
      setSuccessMessage(`User ${response.username} successfully registered! Welcome to the Jolt Family!`);
      setTimeout(() => navigate('/login'), 3000); // redirect after 3 seconds
    } catch (err) {
      setErrors({ server: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div>
      <div style={styles.heading}>
        <h1>Create an Account</h1>
        <p>Join the Jolt family for electrifying deals and rewards!</p>
      </div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Enter a username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required />
            {errors.username && <p style={styles.errors}>{errors.username}</p>}
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required />
            {errors.email && <p style={styles.errors}>{errors.email}</p>}
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter a password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required />
            {errors.password && <p style={styles.errors}>{errors.password}</p>}
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input 
          type="password" 
          id="confirmPassword" 
          placeholder="Enter a password" 
          name="confirmPassword" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          required />
          {errors.confirmPassword && <p style={styles.errors}>{errors.confirmPassword}</p>}
        </div>
        <button type="submit" style={styles.button}>Create Account</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errors.server && <p style={styles.errors}>{errors.server}</p>}
      <p style={styles.loginLink}>
        Already have an account? <Link to="/login" style={styles.link}>Login</Link>
      </p>
    </div>
  )
}

const styles = {
  heading: { textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: "0 auto" },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  button: { padding: '0.5rem', background: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' },
  link: { textDecoration: 'none', color: '#007BFF' },
  loginLink: { marginTop: '1rem', textAlign: 'center' },
  success: { textAlign: 'center', margin: '0.5rem 0 0.5rem 0' },
  errors: { color: 'red', margin: '0.5rem 0 0.5rem 0' }
}

export default Register
