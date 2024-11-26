import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h1 style={styles.heading}>Login</h1>
      <form style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
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
