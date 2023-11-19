import React from "react";
import {NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Herader() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Nav className="me-auto">
        <NavLink to="/" className={({isActive}) => `${isActive ? "youtube_color" : "white"}`}>Youtube</NavLink>
        <NavLink to="/instagram" className={({isActive}) => `${isActive ? "instagram_color" : "white"}`}>Instagram</NavLink>
        <NavLink to="/facebook" className={({isActive}) => `${isActive ? "facebook_color" : "white"}`}>Facebook</NavLink>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Herader
