import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../components/AuthContext'
import { createOrder } from '../api'
import { clearCart } from './Cart'

const Checkout = () => {
    const { items, total, quantity } = useSelector(state => state.cart);
    const { user } = useContext(AuthContext);
    const countries = [
        ["United States", "US"],
        ["Canada", "CA"],
        ["Mexico", "MX"],
        ["Australia", "AU"],
        ["United Kingdom", "GB"],
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const [ address, setAddress ] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    const handleAddress = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!user) {
            return alert('Please log in to place an order.');
        }

        try {
          const token = localStorage.getItem('token');
          // console.log(token, user._id);
          const response = await createOrder(token, user._id, {items, total, quantity, address});
          // console.log(response.data);
          dispatch(clearCart());
          setSuccessMessage('Order placed successfully! View order details under Account -> Order History');
          setTimeout(() => navigate('/'), 3000);
        } catch (err) {
          console.error('Error placing order:', err);
          setErrors({ server: 'Failed to submit order. Please try again later.' });
        }
    }

    return (
        <div>
            <div style={styles.heading}>
                <h1>Checkout</h1>
                <p>Please fill out your address and billing information:</p>
            </div>
            <form style={styles.form} onSubmit={handleCheckout}>
                <div style={styles.inputGroup}>
                    <label htmlFor="street">Street</label>
                    <input 
                        type="text" 
                        id="street" 
                        placeholder="Enter Street Address" 
                        name="street" 
                        value={address.street} 
                        onChange={handleAddress}
                        required />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="city">City</label>
                    <input 
                        type="text" 
                        id="city" 
                        placeholder="Enter City Name" 
                        name="city" 
                        value={address.city} 
                        onChange={handleAddress}
                        required />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="state">State</label>
                    <input 
                        type="text" 
                        id="state" 
                        placeholder="Enter State" 
                        name="state" 
                        value={address.state} 
                        onChange={handleAddress}
                        required />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="zip">Zip</label>
                    <input 
                        type="text" 
                        id="zip" 
                        placeholder="Enter Zip Code" 
                        name="zip" 
                        value={address.zip} 
                        onChange={handleAddress}
                        required />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="country">Country</label>
                    <select 
                        id="country" 
                        name="country" 
                        value={address.country} 
                        onChange={handleAddress}
                        required>
                        
                        <option value="" disabled>Select a country</option>
                        {countries.map(([name, code]) => (
                            <option key={code} value={code} >{name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={styles.button}>Checkout</button>
            </form>
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            {errors.server && <p style={styles.errors}>{errors.server}</p>}
        </div>
)
}

const styles = {
    heading: { textAlign: 'center' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: "0 auto" },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    button: { padding: '0.5rem', background: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' },
    link: { textDecoration: 'none', color: '#007BFF' },
    loginLink: { marginTop: '1rem', textAlign: 'center' },
    success: { color: 'green', margin: '0.5rem 0 0.5rem 0', alignItems: 'center' },
    errors: { color: 'red', margin: '0.5rem 0 0.5rem 0', alignItems: 'center' }
  }

export default Checkout
