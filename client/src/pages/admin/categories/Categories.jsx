import { useState, useEffect } from 'react';
import API from '../../../api/axios';
import { Plus, Edit, Trash2, X, Search } from 'lucide-react';
import AdminLayout from '../../../components/admin/AdminLayout';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCategories, setTotalCategories] = useState(0);
    const limit = 10;

    useEffect(() => {
        fetchCategories();
    }, [currentPage, searchTerm]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await API.get(`/categories?page=${currentPage}&limit=${limit}&search=${searchTerm}`);
            if (response.data.categories) {
                setCategories(response.data.categories);
                setTotalPages(response.data.totalPages);
                setTotalCategories(response.data.totalCategories);
            } else {
                setCategories(response.data);
                setTotalPages(1);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await API.put(`/categories/${editingCategory._id}`, formData);
            } else {
                await API.post('/categories', formData);
            }
            fetchCategories();
            handleCloseModal();
        } catch (error) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await API.delete(`/categories/${id}`);
                fetchCategories();
            } catch (error) {
                alert('Failed to delete');
            }
        }
    };

    const handleOpenModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({ name: category.name, description: category.description || '' });
        } else {
            setEditingCategory(null);
            setFormData({ name: '', description: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1>Category Management</h1>
                <div className="header-actions">
                    <div className="search-box-container">
                        <Search className="search-icon" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search categories..." 
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input-admin"
                        />
                    </div>
                    <button onClick={() => handleOpenModal()} className="button-view add-btn-nav">
                        <Plus size={20} /> Add Category
                    </button>
                </div>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="3" className="empty-table-msg">Loading...</td></tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="empty-table-msg">
                                    {searchTerm ? `No categories match "${searchTerm}"` : 'No categories found.'}
                                </td>
                            </tr>
                        ) : (
                            categories.map(category => (
                                <tr key={category._id}>
                                    <td data-label="Name"><strong>{category.name}</strong></td>
                                    <td data-label="Description">{category.description || 'No description'}</td>
                                    <td data-label="Actions">
                                        <div className="action-btns">
                                            <button onClick={() => handleOpenModal(category)} className="action-btn edit-btn" title="Edit">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(category._id)} className="action-btn delete-btn" title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="inquiry-footer" style={{ marginTop: '20px' }}>
                    <div className="pagination-info">
                        Showing page {currentPage} of {totalPages} ({totalCategories} total)
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

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
                            <button onClick={handleCloseModal} className="close-modal"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Category Name</label>
                                <input 
                                    type="text" 
                                    className="admin-input" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                    placeholder="e.g. Navigation Systems"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea 
                                    className="admin-textarea" 
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Optional category description..."
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn-admin">
                                {editingCategory ? 'Update Category' : 'Save Category'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default Categories;
