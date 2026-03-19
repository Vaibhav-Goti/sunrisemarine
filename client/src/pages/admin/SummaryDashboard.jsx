import React, { useState, useEffect } from 'react';
import { Box, Tags, MessageSquare, TrendingUp } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Loader from '../../components/Loader';
import API from '../../api/axios';

const SummaryDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalContacts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await API.get('/admin/stats');
                setStats(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: <Box size={32} />,
            color: '#007bff',
            bg: '#f0f7ff'
        },
        {
            title: 'Total Categories',
            value: stats.totalCategories,
            icon: <Tags size={32} />,
            color: '#10b981',
            bg: '#e6fffa'
        },
        {
            title: 'Contact Messages',
            value: stats.totalContacts,
            icon: <MessageSquare size={32} />,
            color: '#f59e0b',
            bg: '#fff4e5'
        }
    ];

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1>Dashboard Overview</h1>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="stats-grid">
                    {cards.map((card, index) => (
                        <div key={index} className="stats-card">
                            <div className="stats-icon" style={{ color: card.color, backgroundColor: card.bg }}>
                                {card.icon}
                            </div>
                            <div className="stats-info">
                                <h3>{card.value}</h3>
                                <p>{card.title}</p>
                            </div>
                           
                        </div>
                    ))}
                </div>
            )}
            
            <div className="dashboard-row" style={{ marginTop: '40px' }}>
                <div className="welcome-banner">
                    <h2>Welcome to Sunrise Marine Admin</h2>
                    <p>Manage your products, categories, and customer inquiries efficiently from this centralized control center.</p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SummaryDashboard;
