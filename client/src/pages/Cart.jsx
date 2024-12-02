import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart, removeFromCart } from '../redux/cartSlice'
 
const Cart = () => {
  const { items, total, quantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  }

  const handleClear = () => {
    dispatch(clearCart());
  }

  return (
    <div>
      <h1>Cart</h1>
      <p>Total Items: {quantity}</p>
      <p>Total Price: ${total.toFixed(2)}</p>
      { items.map(item => (
        <div key={item.id}>
          <p>{item.name} (Quantity: {item.quantity}) - ${(item.price * item.quantity)}</p>
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={handleClear}>Clear Cart</button>
      <p>Checkout or <Link to="/products" style={styles.link}>continue shopping!</Link></p>
    </div>
  )
}

const styles = {
    link: { textDecoration: 'none', color: '#007BFF' }
}

export default Cart
