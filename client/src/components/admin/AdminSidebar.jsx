import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Box, 
    Tags, 
    MessageSquare, 
    KeyRound, 
    LogOut,
    ChevronRight,
    ChevronDown,
    X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

const AdminSidebar = ({ isOpen, setIsOpen, isCollapsed }) => {
    const location = useLocation();
    const { logout } = useAuth();
    const [categories, setCategories] = useState([]);
    const [isProductMenuOpen, setIsProductMenuOpen] = useState(location.pathname === '/admin/products');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Close sidebar on location change (for mobile only)
    useEffect(() => {
        if (isOpen && window.innerWidth <= 768) {
            setIsOpen(false);
        }
    }, [location.pathname]);

    const menuItems = [
        {
            title: 'Overview',
            icon: <LayoutDashboard size={20} />,
            path: '/admin/dashboard'
        },
        {
            title: 'Product Management',
            icon: <Box size={20} />,
            path: '/admin/products'
        },
        {
            title: 'Categories',
            icon: <Tags size={20} />,
            path: '/admin/categories'
        },
        {
            title: 'Contact Messages',
            icon: <MessageSquare size={20} />,
            path: '/admin/contacts'
        },
        {
            title: 'Change Password',
            icon: <KeyRound size={20} />,
            path: '/admin/change-password'
        }
    ];

    return (
        <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <img src="/logo.png" alt="Admin" className="admin-logo" />
                    <div className="admin-info">
                        <h3>Admin Panel</h3>
                        <p>Sunrise Marine</p>
                    </div>
                </div>
                <button className="mobile-close" onClick={() => setIsOpen(false)}>
                    <X size={24} />
                </button>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <span className="section-label">MAIN NAVIGATION</span>
                    {menuItems.map((item) => (
                        <div key={item.path}>
                            {item.title === 'Product Management' ? (
                                <>
                                    <div 
                                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`} 
                                        onClick={() => {
                                            if (isCollapsed) {
                                                setIsOpen(true);
                                            }
                                            setIsProductMenuOpen(!isProductMenuOpen);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span className="item-icon">{item.icon}</span>
                                        <span className="item-text">{item.title}</span>
                                        {isProductMenuOpen ? <ChevronDown size={16} className="active-indicator" /> : <ChevronRight size={16} className="active-indicator" />}
                                    </div>
                                    <div 
                                        style={{ 
                                            display: isProductMenuOpen ? 'block' : 'none', 
                                            paddingLeft: '40px', 
                                            marginTop: '5px', 
                                            marginBottom: '10px' 
                                        }}
                                    >
                                        {categories.map((cat, idx) => {
                                            const isActive = location.pathname === '/admin/products' && new URLSearchParams(location.search).get('category') === cat.name;
                                            return (
                                                <Link 
                                                    key={idx} 
                                                    to={`/admin/products?category=${encodeURIComponent(cat.name)}`} 
                                                    style={{ 
                                                        display: 'block', 
                                                        padding: '8px 10px', 
                                                        textDecoration: 'none', 
                                                        color: isActive ? '#007bff' : '#555', 
                                                        fontSize: '0.9rem',
                                                        fontWeight: isActive ? '600' : '400',
                                                        borderRadius: '6px',
                                                        background: isActive ? '#f0f4ff' : 'transparent',
                                                        transition: 'all 0.2s',
                                                        marginBottom: '2px'
                                                    }}
                                                >
                                                    {cat.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <Link 
                                    to={item.path}
                                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    <span className="item-icon">{item.icon}</span>
                                    <span className="item-text">{item.title}</span>
                                    {location.pathname === item.path && <ChevronRight size={16} className="active-indicator" />}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </nav>

            <div className="sidebar-footer">
                <button onClick={logout} className="sidebar-logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
