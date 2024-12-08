import React from 'react'
import canning from '../assets/canning.jpg'

const About = () => {
  return (
    <div style={styles.main}>
      <h1>About Us</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, saepe quas aut eos quo provident rem illo ipsam, placeat debitis praesentium vel 
        tenetur porro autem adipisci nobis ducimus officiis facere! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, quis temporibus? Quia 
        culpa dolorem nisi dolore autem omnis alias cum quis sed similique, perferendis nobis error eos aliquid velit quo. Lorem ipsum dolor sit amet 
        consectetur, adipisicing elit. Quo error doloremque beatae facere ex quia excepturi nisi consequuntur dolore eius tempora impedit, odio hic qui 
        ipsam, cupiditate quaerat sequi necessitatibus?
      </p>
      <img src={canning} alt="Cans in an assembly line going through a canning machine." style={styles.image} />
    </div>
  )
}

const styles={
  main: { textAlign: 'center', maxWidth: '50%', margin: 'auto' },
  image: { maxWidth: '80%' }
}

export default About
