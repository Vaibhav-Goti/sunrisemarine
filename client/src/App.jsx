import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import SummaryDashboard from './pages/admin/SummaryDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import ProductDetail from './pages/ProductDetail';
import ProductForm from './pages/admin/ProductForm';
import Categories from './pages/admin/categories/Categories';
import ContactMessages from './pages/admin/contacts/ContactMessages';
import ChangePassword from './pages/admin/settings/ChangePassword';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (loading) return <div>Loading...</div>;

    // check both state + localStorage
    if (!user && !storedUser) {
        return <Navigate to="/" />;
    }

    return children;
};

function AppContent() {
    const { user, loading } = useAuth();
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (loading) return <div>Loading...</div>;

    return (
        <div className="app">
            <ScrollToTop />
            {(!isAdminRoute || location.pathname === '/login') && (
                <div className="sticky-header">
                    <Header />
                    <Navbar />
                </div>
            )}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                
                {/* Admin Routes */}
                <Route 
                    path="/login" 
                    element={
                        (user || storedUser) ? <Navigate to="/admin/dashboard" /> : <Login />
                    } 
                />
                <Route path="/admin/dashboard" element={<ProtectedRoute><SummaryDashboard /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} />
                <Route path="/admin/add-product" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
                <Route path="/admin/edit-product/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
                <Route path="/admin/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
                <Route path="/admin/contacts" element={<ProtectedRoute><ContactMessages /></ProtectedRoute>} />
                <Route path="/admin/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
            </Routes>
            {(!isAdminRoute || location.pathname === '/login') && <Footer />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
