import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ 
      id: product._id, 
      name: product.name, 
      price: product.price,
      quantity: 1,
    }));
  }

  return (
        <div style={styles.card}>
          <Link to={`/products/${product._id}`} style={styles.link}>
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p>{product.price}</p>
          </Link>
          <button onClick={handleAdd}>Add to Cart</button>
        </div>
  )
}

const styles = {
    card: {
        border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#fff',
    },
    link: { textDecoration: 'none', color: 'inherit' },
}

export default ProductCard
