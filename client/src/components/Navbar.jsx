import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
        <h1 style={styles.logo}>Jolt</h1>
        <ul style={styles.navLinks}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/products" style={styles.link}>Products</Link></li>
            <li><Link to="/about" style={styles.link}>About</Link></li>
        </ul>
    </nav>
  )
}

const styles = {
    navbar: { display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#222', color: '#fff' },
    logo: { fontSize: '1.5rem' },
    navLinks: { listStyle: 'none', display: 'flex', gap: '1rem' },
    link: { color: '#fff', textDecoration: 'none' },
};

export default Navbar
