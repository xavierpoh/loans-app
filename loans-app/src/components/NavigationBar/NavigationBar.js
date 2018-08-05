import React from 'react';
import { Navbar } from 'react-bootstrap';
import './NavigationBar.css';

const NavigationBar = () => (
  <Navbar className="nav-container">
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/"><img src="https://cdn.iconscout.com/public/images/icon/free/png-512/pied-piper-logo-3b6d62b790130fec-512x512.png"/></a>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
)

export default NavigationBar;