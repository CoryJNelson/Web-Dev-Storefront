import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
      <div style={styles.heading}>
        <h1>Create an Account</h1>
        <p>Join the Jolt family for electrifying deals and rewards!</p>
      </div>
      <form style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Enter a username" />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter a password" />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" placeholder="Enter a password" />
        </div>
        <button type="submit" style={styles.button}>Create Account</button>
      </form>
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
  loginLink: { marginTop: '1rem', textAlign: 'center' }
}

export default Register
