import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} style={styles.link}>
        <div>
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p>{product.price}</p>
        </div>
    </Link>
  )
}

const styles = {
    card: {
        border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#fff',
    },
    link: { textDecoration: 'none', color: 'inherit' },
}

export default ProductCard
