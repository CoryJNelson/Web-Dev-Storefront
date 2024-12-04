import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [ quantity, setQuantity ] = useState(1);

  const handleAdd = () => {
    if (quantity > 0) {
      dispatch(addToCart({ 
        id: product._id, 
        name: product.name, 
        price: product.price,
        quantity,
      }));
      setQuantity(1);
    } else {
      alert('Quantity must be at least 1');
    }
  }

  const handleTextQuantity = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(Number(value));
    } else {
      setQuantity(1);
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));

  return (
        <div style={styles.card}>
          <Link to={`/products/${product._id}`} style={styles.link}>
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p>{product.price}</p>
          </Link>
          <div style={styles.quantityContainer}>
            <button onClick={decrementQuantity} style={styles.quantityButtons} >-</button>
            <input 
              type="text" 
              value={quantity} 
              onChange={handleTextQuantity} 
              style={styles.input}
            />
            <button onClick={incrementQuantity} style={styles.quantityButtons} >+</button>
          </div>
          <button onClick={handleAdd} style={styles.addToCart} >Add to Cart</button>
        </div>
  )
}

const styles = {
    card: {
        border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', alignItems: 'center', backgroundColor: '#fff',
    },
    quantityContainer: { display: 'flex', alignItems: 'center', marginBottom: '8px' },
    input: { width: '24px', height: '20px', textAlign: 'center', margin: '0 8px'},
    quantityButtons: { backgroundColor: '#d6d9da', width: '24px', height: '24px', border: 'none', textAlign: 'center', cursor: 'pointer' },
    link: { textDecoration: 'none', color: 'inherit' },
    addToCart: { backgroundColor: '#d6d9da', padding: '8px 14px', border: 'none', cursor: 'pointer' }
}

export default ProductCard
