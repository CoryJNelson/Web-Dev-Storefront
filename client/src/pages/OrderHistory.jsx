import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getUserOrders } from '../api';


const OrderHistory = () => {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const getOrders = async () => {
            console.log('getOrders called');
            const token = localStorage.getItem('token');
            try {
                const data = await getUserOrders(id, token);
                console.log(data);
                setOrders(data);
            } catch (err) {
                console.error(err);
                setErrors({ fetchOrders: 'Failed to fetch orders. Try refreshing the page.' });
            } finally {
                setLoading(false);
            }
        }

        getOrders();
    }, []);

    if (loading) return <p>Loading account details...</p>
    if (errors.fetchOrders) return <p>{errors.fetchOrders}</p>

    return (
        <div>
            <h1>Order History</h1>
            <Link to={`/users/${id}`}>back to Account</Link>
            <div>
                {orders.map(order => (
                    <div style={styles.orderContainer}>
                        <p>Order {order._id}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                        {order.products.map(product => (
                            <>
                                <p>x{product.quantity} {product.name} unit price: ${product.price} </p>
                            </>
                        ))}
                        <p>Total Items: {order.totalItems}</p>
                        <p>Total: ${order.total}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const styles = {
    orderContainer: { border: '1px solid #ddd', borderRadius: '8px', padding: '16px', alignItems: 'center', backgroundColor: '#fff', }
}

export default OrderHistory
