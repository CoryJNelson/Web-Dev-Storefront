import React from 'react'
import { Link } from 'react-router-dom'
 
const Cart = () => {
  return (
    <div>
      <h1>Cart</h1>
      <p>Checkout or <Link to="/products" style={styles.link}>continue shopping!</Link></p>
    </div>
  )
}

const styles = {
    link: { textDecoration: 'none', color: '#007BFF' }
}

export default Cart
