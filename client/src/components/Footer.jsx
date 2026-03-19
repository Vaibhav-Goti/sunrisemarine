import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                {/* Column 1: Brand */}
                <div className="footer-col brand-col">
                    <div className="footer-logo">
                        <img src="/logo.png" alt="Logo" />
                        <span className="brand-text">Sunrise Marine<br />Enterprise</span>
                    </div>
                    <p className="brand-description">Sunrise Marine is your trusted partner for high-quality marine equipment and solutions. With over 27 years of experience in the maritime industry.</p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Column 2: Our Company */}
                <div className="footer-col">
                    <h4 className="footer-heading">OUR COMPANY</h4>
                    <ul className="footer-links">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Column 3: Products */}
                <div className="footer-col">
                    <h4 className="footer-heading">OUR PRODUCTS</h4>
                    <ul className="footer-links">
                        <li><Link to="/products/navigation-equipment">Navigation Equipment</Link></li>
                        <li><Link to="/products/automation-system">Automation Systems</Link></li>
                        <li><Link to="/products/anemometer-equipment">Anemometer Equipment</Link></li>
                        <li><Link to="/products/marine-machinery">Marine Machinery</Link></li>
                        <li><Link to="/products/drill-rig-equipments">Drill Rig Equipments</Link></li>
                    </ul>
                </div>

                {/* Column 4: Contact */}
                <div className="footer-col contact-col">
                    <h4 className="footer-heading">CONTACT US</h4>
                    <div className="contact-info">
                        <p><Mail size={16} /> <span>spare@sunrise-marine.com</span></p>
                        <p><Phone size={16} /> <span>+91 278 2560837</span></p>
                        <p><MapPin size={16} /> <span>Bhavnagar, India</span></p>
                    </div>
                    <div className="footer-actions">
                        <a href="#" className="footer-btn btn-primary">Send Enquiry</a>
                        <a href="#" className="footer-btn btn-outline">Technical Support</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p>&copy; {new Date().getFullYear()} Sunrise Marine Enterprise. All rights reserved.</p>
                    {/* <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
