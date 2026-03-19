import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import API from '../../api/axios';
import AdminLayout from '../../components/admin/AdminLayout';
import Loader from '../../components/Loader';
import '../../styles/admin.css';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
    });
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]); // new local files
    const [existingImages, setExistingImages] = useState([]); // url of images already on server
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    useEffect(() => {
        fetchCategories();
        if (isEdit) {
            fetchProduct();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            setFetching(true);
            const response = await API.get('/categories');
            setCategories(response.data);
            if (!isEdit && response.data.length > 0) {
                setFormData(prev => ({ ...prev, category: response.data[0].name }));
            }
            setFetching(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setFetching(false);
        }
    };

    const fetchProduct = async () => {
        try {
            setFetching(true);
            const response = await API.get(`/products/${id}`);
            const product = response.data;
            setFormData({
                name: product.name,
                description: product.description,
                category: product.category,
            });
            if (product.images) {
                setExistingImages(product.images);
            }
            setFetching(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages(prev => [...prev, ...newFiles]);
        }
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const removeExistingImage = (indexToRemove) => {
        setExistingImages(existingImages.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('category', formData.category);
        if (isEdit) {
            // MUST pass existing images BEFORE files so Multer parses the text field correctly
            data.append('existingImages', JSON.stringify(existingImages));
        }
        if (images && images.length > 0) {
            images.forEach(image => {
                data.append('images', image);
            });
        }

        try {
            if (isEdit) {
                await API.put(`/products/${id}`, data);
            } else {
                await API.post('/products', data);
            }
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="form-card-admin">
                <h2 className="form-title">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
                {fetching ? (
                    <Loader />
                ) : (
                    <>
                        {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="admin-input"
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            placeholder="e.g. Marine Radar System"
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select 
                            name="category" 
                            className="admin-select"
                            value={formData.category} 
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            name="description" 
                            className="admin-textarea"
                            value={formData.description} 
                            onChange={handleChange} 
                            rows="4" 
                            required
                            placeholder="Describe the product features and usage..."
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Product Images {isEdit && '(Leave blank if not changing)'}</label>
                        <div className="file-input-wrapper">
                            <label className="file-input-label">
                                {(images.length + existingImages.length) > 0 ? `${images.length + existingImages.length} files total` : 'Choose Image Files'}
                                    <input 
                                        type="file" 
                                        onChange={handleImageChange} 
                                        accept="image/*" 
                                        multiple
                                        required={!isEdit && images.length === 0} 
                                        style={{ display: 'none' }}
                                    />
                            </label>
                        </div>
                        {(images.length > 0 || existingImages.length > 0) && (
                            <div className="image-previews">
                                {/* Preview existing server images */}
                                {existingImages.map((imgUrl, idx) => (
                                    <div key={`existing-${idx}`} className="preview-item existing">
                                        <img 
                                            src={imgUrl.startsWith('http') ? imgUrl : `${import.meta.env.VITE_API_BASE_URL}${imgUrl}`} 
                                            alt={`existing-${idx}`} 
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => removeExistingImage(idx)}
                                            className="remove-img-btn"
                                            title="Remove existing image"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                {/* Preview new local images */}
                                {images.map((img, idx) => (
                                    <div key={`new-${idx}`} className="preview-item new">
                                        <img 
                                            src={URL.createObjectURL(img)} 
                                            alt={`preview-${idx}`} 
                                        />
                                        <div className="new-badge">NEW</div>
                                        <button 
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="remove-img-btn"
                                            title="Remove new image"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                            <button type="submit" className="submit-btn-admin" disabled={loading}>
                                {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Add Product')}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => navigate('/admin/dashboard')} 
                                className="cancel-btn-admin"
                            >
                                Cancel
                            </button>
                        </form>
                    </>
                )}
            </div>
        </AdminLayout>
    );
};

export default ProductForm;
