// src/Components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

// Component definition
const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Little Learners Hub</p>
      <p>Designed for nursery to 1st standard students</p>
    </footer>
  );
};

// Must include this default export
export default Footer;