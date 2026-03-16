import React, { useState, useEffect } from 'react';


import '../styles/products.css';

import { Link, useParams, useNavigate } from 'react-router-dom';
import { LayoutGrid, Shield, Settings, Activity, Anchor, ChevronRight, ChevronLeft, Search } from 'lucide-react';
import API from '../api/axios';
import '../styles/catalog.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('Popularity');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProductsIndicator, setTotalProductsIndicator] = useState(0);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // prevent scrolling when modal is open
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300); // clear after animation
        document.body.style.overflow = 'auto'; // restore scrolling
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!category && categories.length > 0) {
            navigate(`/products/all-products`, { replace: true });
        }
    }, [category, categories, navigate]);

    useEffect(() => {
        if (category) {
            setCurrentPage(1);
            fetchPaginatedProducts(1, category);
        }
    }, [category, sortBy]);

    useEffect(() => {
        if (category) {
            fetchPaginatedProducts(currentPage, category);
        }
    }, [currentPage]);

    const fetchCategories = async () => {
        try {
            const response = await API.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await API.get('/products');
            setAllProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchPaginatedProducts = async (page, currCategory) => {
        setLoading(true);
        try {
            const apiCategory = currCategory === 'all-products' ? 'all' : currCategory;
            const response = await API.get(`/products?page=${page}&limit=6&category=${apiCategory}`);
            setProducts(response.data.products || []);
            setTotalPages(response.data.totalPages || 1);
            setTotalProductsIndicator(response.data.totalProducts || 0);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching paginated products:', error);
            setLoading(false);
        }
    };

    // Categories array loaded dynamically

    if (loading) return <div className="admin-container" style={{ textAlign: 'center', padding: '150px' }}>Loading catalog...</div>;

    return (
        <div className="catalog-page">
            <section className="inner-hero">
                <div className="hero-content">
                    <nav className="breadcrumbs">
                        <Link to="/">Home</Link>
                        <span>&rsaquo;</span>
                        <Link to="/products">Products</Link>
                        {category && (
                            <>
                                <span>&rsaquo;</span>
                                <span className="active-breadcrumb">{category.replace(/-/g, ' ')}</span>
                            </>
                        )}
                    </nav>
                    <h1>
                        {category ? category.replace(/-/g, ' ') : 'Product Catalog'}
                    </h1>
                    <p>Premium grade marine navigation and communication electronics sourced from global vessels. Engineered for precision in the harshest maritime environments.</p>
                </div>
            </section>

            <div className="catalog-container">
                <div className="catalog-wrapper">

                    {/* Sidebar */}
                    <aside className="catalog-sidebar">
                        <div className="sidebar-box">
                            <h3><LayoutGrid size={24} className="icon-blue" /> Categories</h3>
                            <div className="category-list">
                                <Link
                                    to="/products/all-products"
                                    className={`category-item ${category === 'all-products' ? 'active' : ''}`}
                                >
                                    <span>All Products</span>
                                    <span className="count-badge">{allProducts.length}</span>
                                </Link>
                                {categories.map((cat, index) => (
                                    <Link
                                        key={index}
                                        to={`/products/${cat.name.toLowerCase().replace(/ /g, '-')}`}
                                        className={`category-item ${category === cat.name.toLowerCase().replace(/ /g, '-') ? 'active' : ''}`}
                                    >
                                        <span>{cat.name}</span>
                                        <span className="count-badge">{allProducts.filter(p => p.category === cat.name).length}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bulk-order-card">
                            <h3>Bulk Order?</h3>
                            <p>Contact us for wholesale pricing on fleet-wide equipment supplies.</p>
                            <Link to="/contact" className="quote-btn">Get Quote</Link>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="catalog-main">
                        <div className="catalog-toolbar">
                            <div className="product-count">
                                Showing <strong>{products.length}</strong> Products 
                            </div>
                        </div>

                        <div className="product-grid">
                            {products.length > 0 ? products.map((product) => (
                                <div key={product._id} className="product-card">
                                    <div className="card-img-wrapper">
                                        <img src={`${import.meta.env.VITE_API_BASE_URL}${product.images?.[0] || ''}`} alt={product.name} />
                                    </div>
                                    <div className="card-content">
                                        <h3>{product.name}</h3>
                                        <p className="card-description">{product.description}</p>
                                        <button onClick={() => openModal(product)} className="product-btn">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="no-products">
                                    <Search size={64} color="#CBD5E0" />
                                    <h3>No products found</h3>
                                    <p>Try exploring other categories or view all products.</p>
                                    <Link to="/products" className="view-all-link">View All Products</Link>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button 
                                    className="page-link" 
                                    disabled={currentPage === 1} 
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button 
                                        key={i} 
                                        className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button 
                                    className="page-link" 
                                    disabled={currentPage === totalPages} 
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </main>

                </div>
            </div>

            {/* Product Details Modal */}
            <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
                <div className="product-modal" onClick={e => e.stopPropagation()}>
                    <span className="close-modal" onClick={closeModal}>&times;</span>
                    {selectedProduct && (
                        <>
                            <div className="modal-header">
                                <h2>{selectedProduct.name}</h2>
                            </div>
                            <div className="modal-body">
                                <div className="modal-image-gallery">
                                    {selectedProduct.images?.length > 0 ? (
                                        selectedProduct.images.map((img, i) => (
                                            <img key={i} src={`${import.meta.env.VITE_API_BASE_URL}${img}`} alt={`${selectedProduct.name} ${i + 1}`} />
                                        ))
                                    ) : (
                                        <div className="no-image-placeholder">No images available</div>
                                    )}
                                </div>
                                <div className="modal-content-details">
                                    <div className="modal-description">
                                        <h6>Description</h6>
                                        <p>{selectedProduct.description}</p>
                                    </div>
                                    
                                    {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
                                        <div className="modal-features">
                                            <h6>Specifications</h6>
                                            <ul>
                                                {Object.entries(selectedProduct.specifications).map(([key, value], idx) => (
                                                    <li key={idx}><strong>{key}</strong> <span>{value}</span></li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    <div className="modal-footer-action">
                                        <Link to="/contact" className="button-view">
                                            Request Quote
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
