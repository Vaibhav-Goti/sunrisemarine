
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, Clock, RefreshCcw, CheckCircle } from 'lucide-react';
import API from '../api/axios';
import SEO from '../components/SEO';


const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await API.get(`/products/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '150px', textAlign: 'center' }}>Loading product details...</div>;
    if (!product) return <div style={{ padding: '150px', textAlign: 'center' }}>Product not found.</div>;

    return (
        <div className="product-detail-page" style={{ backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }}>
            <SEO 
                title={product.name}
                description={product.description.substring(0, 160)}
                keywords={`${product.name}, ${product.category}, marine equipment, ship spares, Sunrise Marine`}
            />

            {/* Breadcrumbs */}
            <div style={{ backgroundColor: '#f8faff', padding: '20px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
                    <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/products" style={{ color: '#666', textDecoration: 'none' }}>Products</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: '#007bff', fontWeight: '600' }}>{product.name}</span>
                </div>
            </div>

            <section style={{ padding: '80px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

                        {/* Image Gallery */}
                        <div className="product-gallery">
                            <div style={{
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
                                border: '1px solid #eee'
                            }}>
                                <img
                                    src={`${import.meta.env.VITE_API_BASE_URL}${product.images?.[0] || ''}`}
                                    alt={product.name}
                                    style={{ width: '100%', display: 'block' }}
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="product-info">
                            <span style={{
                                color: '#007bff',
                                fontWeight: '700',
                                letterSpacing: '2px',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase'
                            }}>
                                {product.category} EQUIPMENT
                            </span>
                            <h1 style={{ fontSize: '3rem', color: '#003366', margin: '15px 0', lineHeight: '1.2' }}>
                                {product.name}
                            </h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                                <span style={{
                                    backgroundColor: '#e6f4ea',
                                    color: '#1e8e3e',
                                    padding: '5px 15px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: '700'
                                }}>
                                    IN STOCK
                                </span>
                            </div>

                            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '40px' }}>
                                {product.description}
                            </p>



                            <div style={{ display: 'flex', gap: '20px', marginBottom: '50px' }}>
                                <Link 
                                    to={`/contact?subject=Product Enquiry: ${product.name}&message=${encodeURIComponent(`Product Category: ${product.category}\nSpecific Product: ${product.name}`)}`} 
                                    className="button-view" 
                                    style={{
                                    padding: '18px 40px',
                                    fontSize: '1.1rem',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    flex: 1
                                }}>
                                    Request Quote
                                </Link>
                                <button style={{
                                    padding: '18px 40px',
                                    fontSize: '1.1rem',
                                    backgroundColor: '#fff',
                                    border: '2px solid #003366',
                                    color: '#003366',
                                    borderRadius: '8px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    flex: 1
                                }}>
                                    Technical Data
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '20px',
                                padding: '30px',
                                background: '#f8f9fa',
                                borderRadius: '15px',
                                border: '1px solid #eee'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Shield size={24} color="#003366" style={{ marginBottom: '10px' }} />
                                    <p style={{ fontSize: '0.75rem', fontWeight: '700', margin: 0 }}>GENUINE SPARES</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Truck size={24} color="#003366" style={{ marginBottom: '10px' }} />
                                    <p style={{ fontSize: '0.75rem', fontWeight: '700', margin: 0 }}>WORLDWIDE SHIPPING</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Clock size={24} color="#003366" style={{ marginBottom: '10px' }} />
                                    <p style={{ fontSize: '0.75rem', fontWeight: '700', margin: 0 }}>24/7 SUPPORT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specifications Section */}
            <section style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#003366' }}>Technical Specifications</h2>
                        <div style={{ width: '60px', height: '4px', background: '#007bff', margin: '20px auto' }}></div>
                    </div>

                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        backgroundColor: '#fff',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '20px', fontWeight: '700', color: '#003366', width: '40%' }}>Model Number</td>
                                    <td style={{ padding: '20px', color: '#666' }}>SR-{product._id.substring(0, 8).toUpperCase()}</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '20px', fontWeight: '700', color: '#003366' }}>Category</td>
                                    <td style={{ padding: '20px', color: '#666' }}>{product.category} Systems</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '20px', fontWeight: '700', color: '#003366' }}>Operating Voltage</td>
                                    <td style={{ padding: '20px', color: '#666' }}>110V / 220V AC</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '20px', fontWeight: '700', color: '#003366' }}>Interface</td>
                                    <td style={{ padding: '20px', color: '#666' }}>NMEA 0183 / NMEA 2000</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '20px', fontWeight: '700', color: '#003366' }}>Certification</td>
                                    <td style={{ padding: '20px', color: '#666' }}>CCS / ABS / DNV GL</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
