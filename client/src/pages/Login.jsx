import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>Enter your login credentials:</p>
      <p>New to Jolt? <Link to="/register" style={styles.link}>Sign Up</Link></p>
    </div>
  )
}

const styles = {
    link: { textDecoration: 'none', color: '#007BFF' }
}

export default Login
