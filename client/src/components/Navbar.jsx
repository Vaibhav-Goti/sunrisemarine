import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <img src="/logo.png" alt="Logo" className="logo-img" />
                <span className="brand-name">Sunrise Marine</span>
            </div>

            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
                <span className="hamburger"></span>
                <span className="hamburger"></span>
                <span className="hamburger"></span>
            </button>

            <ul className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
                <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
                <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                {user && (
                    <>
                        <li><Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                        <li><button onClick={() => { logout(); setIsMenuOpen(false); }} className="logout-btn-nav">Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
