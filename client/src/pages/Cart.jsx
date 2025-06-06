import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, clearCart, removeFromCart } from '../redux/cartSlice'
 
const Cart = () => {
  const { items, total, quantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  }

  const handleClear = () => {
    dispatch(clearCart());
  }

  const handleQuantityChange = (id, newQuantity) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const delta = newQuantity - item.quantity; // Calculate the change in quantity
      dispatch(addToCart({ id, name: item.name, price: item.price, quantity: delta }));
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      { items.map(item => (
        <div key={item.id} style={styles.itemContainer}>
          {/* <p>{item.name} (Quantity: {item.quantity}) - ${(item.price * item.quantity)}</p> */}
          <p>{item.name}</p>
          <p>Quantity: {item.quantity} Unit Price: ${item.price} </p>
          <div style={styles.quantityContainer}>
            <button 
              onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
              style={styles.quantityButtons}
            >-</button>
            <input 
              type="text" 
              value={item.quantity} 
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  handleQuantityChange(item.id, Number(value) || item.quantity);
                }
              }}
              style={styles.input}
            />
            <button 
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              style={styles.quantityButtons}
            >+</button>
          </div>
          <button onClick={() => handleRemove(item.id)} style={styles.remove}>Remove</button>
        </div>
      ))}
      <button onClick={handleClear}>Clear Cart</button>
      <p>Total Items: {quantity}</p>
      <p>Total Price: ${total.toFixed(2)}</p>
      <Link to="/checkout"><button>Checkout</button></Link>
      {/* <p>Checkout or <Link to="/products" style={styles.link}>continue shopping!</Link></p> */}
    </div>
  )
}

const styles = {
    link: { textDecoration: 'none', color: '#007BFF' },
    itemContainer: { border: '1px solid #ddd', borderRadius: '8px', padding: '16px', alignItems: 'center', backgroundColor: '#fff', },
    quantityContainer: { display: 'flex', alignItems: 'center', marginBottom: '8px' },
    input: { width: '24px', height: '20px', textAlign: 'center', margin: '0 8px'},
    quantityButtons: { backgroundColor: '#d6d9da', width: '24px', height: '24px', border: 'none', textAlign: 'center', cursor: 'pointer' },
    remove: { backgroundColor: '#d6d9da', padding: '8px 23px', border: 'none', cursor: 'pointer' },
}

export { clearCart }
export default Cart
