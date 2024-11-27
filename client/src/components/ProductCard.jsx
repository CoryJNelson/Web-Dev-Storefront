import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.desc}</p>
      <p>{product.price}</p>
    </div>
  )
}

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        textAlign: 'center',
        backgroundColor: '#fff',
    }
}

export default ProductCard
