import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import API from '../api/axios';
import '../styles/contact.css';
import SEO from '../components/SEO';


const Contact = () => {
  //  console.log("SITE KEY:", import.meta.env.VITE_RECAPTCHA_SITE_KEY);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [captchaToken, setCaptchaToken] = useState(null);

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!captchaToken) {
            alert('Please verify that you are not a robot.');
            return;
        }

        setStatus('Sending...');
        try {
            await API.post('/contacts', { ...formData, captchaToken });
            alert('Thank you! Your message has been sent successfully.');
            setFormData({ user_name: '', user_email: '', subject: '', message: '' });
        } catch (error) {
            alert('Failed to send message. Please try again later.');
        } finally {
            setStatus('');
        }
    };

    return (
        <main className="contact-page">
            <SEO 
                title="Contact Us" 
                description="Get in touch with Sunrise Marine Enterprise for expert marine equipment support, product inquiries, and global shipping solutions. We are based in Alang, Gujarat."
                keywords="contact sunrise marine, marine equipment inquiry, technical support, Alang ship breaking yard, marine parts India"
            />

            <section className="inner-hero">
                <div className="hero-content">
                    <h1>Get In Touch</h1>
                    <nav className="breadcrumbs">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        Contact Us
                    </nav>
                </div>
            </section>

            <section className="contact-wrapper">
                <div className="container">
                    <div className="contact-grid">

                        <div className="contact-sidebar">
                            <div className="section-title">
                                <span className="subtitle">CONNECT WITH US</span>
                                <h2>We're here to help you navigate your needs</h2>
                            </div>
                            <p className="description">
                                Whether you have a question about our marine electronics, technical support, or global shipping options, our team is ready to provide expert assistance.
                            </p>

                            <div className="contact-methods">
                                <div className="method-item">
                                    <div className="method-icon location">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="method-text">
                                        <h3>Our Office</h3>
                                        <p>ASMA Plot # 257, Opp. Plot # 16,<br />Ship Breaking Yard, Alang, Gujarat, India</p>
                                    </div>
                                </div>

                                <div className="method-item">
                                    <div className="method-icon phone">
                                        <Phone size={24} />
                                    </div>
                                    <div className="method-text">
                                        <h3>Call Support</h3>
                                        <p>Office: +91 278 2560837<br />Mobile: +91 98252 05244</p>
                                    </div>
                                </div>

                                <div className="method-item">
                                    <div className="method-icon email">
                                        <Mail size={24} />
                                    </div>
                                    <div className="method-text">
                                        <h3>Email Inquiry</h3>
                                        <p>spare@sunrise-marine.com<br />sales@sunrise-marine.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-container">
                            <div className="form-card">
                                <h3>Send Message</h3>
                                <form onSubmit={handleSubmit} className="contact-form-grid">
                                    <div className="form-group full-width">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="user_name"
                                            value={formData.user_name}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="user_email"
                                            value={formData.user_email}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Technical Inquiry"
                                            required
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Your Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="How can we help you today?"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-group full-width" style={{ marginBottom: '20px' }}>
                                        <ReCAPTCHA
                                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                            onChange={handleCaptchaChange}
                                        />
                                    </div>
                                    <button type="submit" className="submit-btn" disabled={status === 'Sending...'}>
                                        {status || 'Send Message'} <Send size={20} />
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="map-section">
                <iframe
                    src="https://www.google.com/maps?q=Alang%20Ship%20Breaking%20Yard%2C%20Gujarat%2C%20India&output=embed"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="location-map"
                ></iframe>
            </section>
        </main>
    );
};

export default Contact;
