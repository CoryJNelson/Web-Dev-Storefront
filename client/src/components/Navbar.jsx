import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
        {/* <h1 style={styles.logo}>Jolt</h1> */}
        <div style={styles.logo}>
          <Link to="/" style={styles.link}>Jolt</Link>
        </div>

        <ul style={styles.navLinks}>
            <li><Link to="/products" style={styles.link}>Products</Link></li>
            <li><Link to="/about" style={styles.link}>About</Link></li>
        </ul>

        <ul style={styles.right}>
          <li><Link to="/login" style={styles.link}>Login</Link></li>
          <li><Link to="/cart" style={styles.link}>Cart</Link></li>
        </ul>
    </nav>
  )
}

const styles = {
    navbar: { 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem', background: '#222', color: '#fff' 
    },
    logo: { fontSize: '2rem', fontWeight: 'bold' },
    navLinks: { fontSize: '1.5rem', listStyle: 'none', display: 'flex', gap: '2rem' },
    link: { color: '#fff', textDecoration: 'none' },
    right: { fontSize: '1.5rem', display: 'flex', gap: '2rem'},
};

export default Navbar
