import React from 'react'
import { Link } from 'react-router-dom'
import tennis from '../assets/tennis-dude.jpg'
import sofa from '../assets/sofa.jpg'

const Home = () => {
  
  return (
    <div style={{textAlign: 'center'}}>
      <img src={tennis} alt="A tennis player taking a water break." style={styles.image} />
      <h1>Welcome to Jolt!</h1>
      <div>
        <Link to="/products"><button style={styles.button}>Shop Now!</button></Link>
        <Link to="/about"><button style={styles.button}>Learn About Us!</button></Link>
      </div>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, earum adipisci. Sapiente sunt officiis earum obcaecati est soluta asperiores fugit delectus?</p>
      <img src={sofa} alt="Two girls sitting on a sofa enjoying a drink." style={styles.image}/>
    </div>
  )
}

const styles = {
  image: { maxWidth: '100%' },
  button: { fontSize: '14px', background: '#f7f7f7', color: '#222', cursor: 'pointer', padding: '.5rem 1rem', margin: '10px' }
}

export default Home
