import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, FileText, Download, Package } from 'lucide-react';
import API from '../../api/axios';
import AdminLayout from '../../components/admin/AdminLayout';
import Loader from '../../components/Loader';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [exporting, setExporting] = useState(false);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const limit = 6;
    
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const activeCategory = query.get('category');

    useEffect(() => {
        fetchCategories();
    }, []);

    // Reset pagination when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchTerm, activeCategory]);

    const fetchCategories = async () => {
        try {
            const response = await API.get('/categories');
            setAllCategories(response.data);
            if (response.data.length > 0 && !activeCategory && location.pathname === '/admin/products') {
                navigate(`/admin/products?category=${encodeURIComponent(response.data[0].name)}`, { replace: true });
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const categoryParam = activeCategory ? `&category=${encodeURIComponent(activeCategory)}` : '';
            const response = await API.get(`/products?page=${currentPage}&limit=${limit}&search=${searchTerm}${categoryParam}`);
            
            if (response.data.products) {
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);
                setTotalProducts(response.data.totalProducts);
            } else {
                setProducts(response.data);
                setTotalPages(1);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await API.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                alert('Failed to delete product');
            }
        }
    };

    const handleExportPDF = async () => {
        try {
            setExporting(true);
            const response = await API.get('/products/export-pdf', { 
                responseType: 'blob' 
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'sunrise-marine-products.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            setExporting(false);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to generate PDF report');
            setExporting(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };



    return (
        <AdminLayout>
            <div className="admin-header">
                <div>
                    <h1>Product Management</h1>
                    <p style={{ color: '#666', marginTop: '5px' }}>{activeCategory ? `Showing: ${activeCategory}` : 'All Products'}</p>
                </div>
                <div className="header-actions">
                    <button 
                        onClick={handleExportPDF} 
                        className="button-view export-btn-mobile" 
                        style={{ background: '#f8f9fa', color: '#333', border: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '8px' }}
                        disabled={exporting}
                    >
                        <Download size={20} /> {exporting ? 'Generating...' : 'Export PDF'}
                    </button>
                    <Link to="/admin/add-product" className="button-view add-btn-nav">
                        <Plus size={20} /> Add Product
                    </Link>
                </div>
            </div>

            <div className="table-controls" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <div className="search-box-container">
                    <Search className="search-icon" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search products by name or description..." 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input-admin product-search-mobile"
                    />
                </div>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4">
                                    <Loader />
                                </td>
                            </tr>
                        ) : (
                            <>
                                {products.map(product => (
                                    <tr key={product._id} className="product-row-mobile">
                                        <td className="img-cell">
                                            <div className="product-item-preview">
                                                <img
                                                    src={product.images?.[0]?.startsWith('http') ? product.images[0] : `${import.meta.env.VITE_API_BASE_URL}${product.images?.[0] || ''}`}
                                                    alt={product.name}
                                                    className="product-img-small"
                                                />
                                            </div>
                                        </td>
                                        <td className="info-cell">
                                            <div className="product-info-mobile">
                                                <div className="name-action-wrapper">
                                                    <strong>{product.name}</strong>
                                                </div>
                                                <div className="category-pill-wrapper mobile-visible">
                                                    <span className="category-pill">{product.category}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="category-cell desktop-visible">
                                            <span className="category-pill">{product.category}</span>
                                        </td>
                                        <td className="action-cell">
                                            <div className="action-btns">
                                                <Link to={`/admin/edit-product/${product._id}`} className="action-btn edit-btn" title="Edit Product">
                                                    <Edit size={18} />
                                                </Link>
                                                <button onClick={() => handleDelete(product._id)} className="action-btn delete-btn" title="Delete Product">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="empty-table-msg">
                                            <div style={{ padding: '40px', textAlign: 'center' }}>
                                                <Search size={48} style={{ color: '#ccc', marginBottom: '15px' }} />
                                                <p>No products match your current search or category filter.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="inquiry-footer" style={{ marginTop: '20px' }}>
                    <div className="pagination-info">
                        Showing page {currentPage} of {totalPages} ({totalProducts} total)
                    </div>
                    <div className="pagination-controls">
                        <button 
                            className="page-btn" 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            &lsaquo;
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button 
                                key={i} 
                                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button 
                            className="page-btn" 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            &rsaquo;
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ProductManagement;
