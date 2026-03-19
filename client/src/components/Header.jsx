import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import '../styles/header.css';

const Header = () => {
    return (
        <header className="top-header">
            <div className="header-item">
                <MapPin size={16} className="header-icon" />
                <span>Bhavnagar, Gujarat, India</span>
            </div>
            <div className="header-item">
                <Phone size={16} className="header-icon" />
                <span>+91 278 2560837</span>
            </div>
            <div className="header-item email">
                <Mail size={16} className="header-icon" />
                <span>spare@sunrise-marine.com</span>
            </div>
        </header>
    );
};

export default Header;
