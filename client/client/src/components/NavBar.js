import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ onAddPostClick }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><button onClick={onAddPostClick}>Add Post</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
