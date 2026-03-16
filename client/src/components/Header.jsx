import React from 'react';
import '../styles/header.css';

const Header = () => {
    return (
        <header className="top-header">
            <div className="header-item">
                <span className="icon">📍</span> Bhavnagar, Gujarat, India
            </div>
            <div className="header-item">
                <span className="icon">📞</span> +91 278 2560837
            </div>
            <div className="header-item email">
                <span className="icon">✉️</span> spare@sunrise-marine.com
            </div>
        </header>
    );
};

export default Header;
