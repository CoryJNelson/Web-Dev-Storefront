import React, { useState, useEffect } from 'react'
import { fetchProducts } from '../api'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      // console.log('getProducts called');
      try {
        const data = await fetchProducts();
        // console.log('Products fetched');
        setProducts(data);
      } catch (err) {
        // console.log(err);
        setError('Failed to load products. Try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) return <p>Loading products...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <div style={styles.heading}>
        <h1>Our Products</h1>
        <p>Explore our wide range of flavors!</p>
      </div>
      <div style={styles.productGrid}>
        {products.map(product => (<ProductCard key={product._id} product={product} />))}
      </div>
      
    </div>
  )
}

const styles = {
  heading: { textAlign: 'center' },
  productGrid: {
    display: "grid", gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem', marginTop: '1rem',
  }
}

export default Products
