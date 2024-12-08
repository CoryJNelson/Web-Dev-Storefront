import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../components/AuthContext'
import styled from 'styled-components'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // styled components
  const Container = styled.div`
    height: 60px;
    background-color: black;
  `;

  const Wrapper = styled.div`
    height: 60px;
    padding: 0px 20px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const Logo = styled.h1`
    font-weight: bold;
    cursor: pointer;
    margin-left: 25px;
  `
  const Center = styled.div`
    flex: 1;
  `;
  const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const NavItem = styled.div`
    font-size: 18px;
    cursor: pointer;
    margin-left: 25px;
  `;

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={styles.link}><Logo>JOLT</Logo></Link>
          <Link to="/products" style={styles.link}><NavItem>Products</NavItem></Link>
          <Link to="/about" style={styles.link}><NavItem>About</NavItem></Link>
        </Left>
        <Center></Center>
        <Right>
          {user ? (
            <>
              <Link to={`/users/${user._id}`} style={styles.link}><NavItem>Account</NavItem></Link>
              <button onClick={handleLogout} style={styles.logoutButton}>Sign Out</button>
              <Link to="/cart" style={styles.link}><NavItem>Cart</NavItem></Link>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}><NavItem>Login</NavItem></Link>
              <Link to="/register" style={styles.link}><NavItem>Register</NavItem></Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  )
}

const styles = {
    link: { color: '#fff', textDecoration: 'none' },
    logoutButton: { background: '#222', color: '#fff', cursor: 'pointer', padding: '0 1rem', marginLeft: '25px' }
};

export default Navbar
