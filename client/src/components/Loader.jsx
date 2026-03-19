import React from 'react';
import '../styles/admin.css';

const Loader = ({ message }) => {
    return (
        <div className="loader-container">
            <div className="loader-spinner"></div>
            {message && <p className="loader-text">{message}</p>}
        </div>
    );
};

export default Loader;
