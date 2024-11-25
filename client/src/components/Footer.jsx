import React from 'react'

const Footer = () => {
  return (
    <footer style={styles.footer}>
        <p>@ 2024 Jolt Energy. All Rights Reserved.</p>
    </footer>
  )
}
const styles = {
    footer: { textAlign: 'center', padding: '1rem', background: '#222', color: '#fff', marginTop: 'auto' }
}

export default Footer
