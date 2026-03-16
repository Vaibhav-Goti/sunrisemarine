import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import '../../styles/admin-layout.css';

const AdminLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                // On mobile, always close the sidebar on resize (it's an overlay)
                setIsSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // On desktop: sidebar-collapsed when closed; on mobile: never add sidebar-collapsed
    const layoutClass = [
        'admin-layout',
        !isMobile && !isSidebarOpen ? 'sidebar-collapsed' : '',
        !isMobile && isSidebarOpen ? 'sidebar-open' : '',
    ].filter(Boolean).join(' ');

    return (
        <div className={layoutClass}>
            {/* Overlay only relevant on mobile */}
            <div 
                className={`sidebar-overlay ${isMobile && isSidebarOpen ? 'active' : ''}`} 
                onClick={() => setIsSidebarOpen(false)}
            ></div>
            <AdminSidebar 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
                isCollapsed={!isMobile && !isSidebarOpen}
            />
            <main className="admin-main">
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <button 
                            className="sidebar-toggle" 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                        >
                            <Menu size={24} />
                        </button>
                        <h2>Sunrise Marine Enterprise</h2>
                    </div>
                </header>
                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
