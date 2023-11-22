import React from "react";
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Herader() {
  return (
    <>
    <Navbar className="nav_bg">
      <Container>
        <Link to='/'>
          <img
            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
            className="brand_logo"
            alt="Logo"
          />
        </Link>
        <Nav className="nav_btn ml-lg-auto">
            <NavLink to="/" className={({ isActive }) => `yt px-3 ${isActive ? "youtube_color" : "white"}`}>Youtube</NavLink>
          <NavLink to="/instagram" className={({ isActive }) => `insta px-3 ${isActive ? "instagram_color" : "white"}`}>Instagram</NavLink>
          <NavLink to="/facebook" className={({ isActive }) => `fb px-3 ${isActive ? "facebook_color" : "white"}`}>Facebook</NavLink>
        </Nav>
      </Container>
    </Navbar>
    <hr class="white-line"/>
    </>
  )
}

export default Herader
