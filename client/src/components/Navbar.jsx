import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import '../styles/navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef(null);

    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMenuOpen && navRef.current && !navRef.current.contains(e.target)) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const getNavClass = ({ isActive }) => isActive ? 'nav-link-active' : '';

    return (
        <>
            <nav className="navbar" ref={navRef}>
              <div className="nav-brand">
                    <NavLink to="/" onClick={closeMenu}>
                        <img src="/logo.png" alt="Logo" className="logo-img" />
                    </NavLink>
                    <span className="brand-name">Sunrise Marine</span>
                </div>

                <button
                    className={`menu-toggle ${isMenuOpen ? 'menu-toggle--open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                    aria-expanded={isMenuOpen}
                >
                    <span className="hamburger"></span>
                    <span className="hamburger"></span>
                    <span className="hamburger"></span>
                </button>

                <ul className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
                    {/* Close button inside drawer */}
                    <li className="nav-close-item">
                        <button className="nav-close-btn" onClick={closeMenu} aria-label="Close menu">
                            <X size={22} />
                        </button>
                    </li>

                    <li>
                        <NavLink to="/" end className={getNavClass} onClick={closeMenu}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={getNavClass} onClick={closeMenu}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={getNavClass} onClick={closeMenu}>Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={getNavClass} onClick={closeMenu}>Contact</NavLink>
                    </li>
                    {user && (
                        <>
                            <li>
                                <NavLink to="/admin/dashboard" className={getNavClass} onClick={closeMenu}>Dashboard</NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={() => { logout(); closeMenu(); }}
                                    className="logout-btn-nav"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
