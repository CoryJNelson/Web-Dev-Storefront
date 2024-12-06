import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api';

const ProductByID = () => {
    const { id } = useParams(); // get product ID from the URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
            const data = await fetchProductById(id);
            setProducts(data);
            } catch (err) {
            setError('Failed to load products. Try refreshing the page.');
            } finally {
            setLoading(false);
            }
        }

        getProducts();
    }, [id]);

    if (loading) return <p>Loading product details...</p>
    if (error) return <p>{error}</p>
    
    return (
        <div>
            <h1>{products.name}</h1>
            <p>{products.desc}</p>
            <p>${products.price}</p>
        </div>
    )
}

export default ProductByID
