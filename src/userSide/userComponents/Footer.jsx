import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Your @Company</p>
    </footer>
  );
}

const footerStyle = {
    background: 'black',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem',
  };
  
export default Footer;
