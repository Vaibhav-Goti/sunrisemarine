import React from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Target,
  Award,
  Clock,
  Globe,
  Shield,
  Anchor,
  Zap,
  CheckCircle,
  ChevronRight,
  Package,
  Headphones,
} from 'lucide-react';
import '../styles/about.css';
import SEO from '../components/SEO';


const About = () => {
  return (
    <div className="about-page">
      <SEO 
        title="About Us" 
        description="Learn about Sunrise Marine Enterprise, India's premier marine equipment specialists since 1999. Sourcing quality navigation, safety, and automation solutions globally."
        keywords="about sunrise marine, marine equipment supplier India, Bhavnagar marine company, maritime history, vessel services"
      />


      {/* ======== HERO ======== */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <nav className="about-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </nav>
          <span className="about-hero-eyebrow">Our Story</span>
          <h1>Established Trust in Marine Industry</h1>
          <p className="about-hero-sub">
            Sunrise Marine Enterprise — Global Leaders in Marine Equipment.&nbsp;
            Trusted by shipping lines worldwide since 1999.
          </p>
          <div className="about-hero-btns">
            <Link to="/contact" className="btn-white-solid">Contact Us</Link>
            <Link to="/products" className="btn-white-outline">View Products</Link>
          </div>
        </div>
      </section>

      {/* ======== STATS BAR ======== */}
      {/* <div className="about-stats-bar">
        <div className="about-stat">
          <div className="about-stat-num">25+</div>
          <div className="about-stat-label">Years Experience</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">500+</div>
          <div className="about-stat-label">Vessels Served</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">50+</div>
          <div className="about-stat-label">Global Brands</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">24/7</div>
          <div className="about-stat-label">Tech Support</div>
        </div>
      </div> */}

      {/* ======== WHO WE ARE ======== */}
      <section className="about-who-section">
        <div className="about-who-inner">
          <div className="about-who-img">
            <img src="/p2.webp" alt="Sunrise Marine Enterprise at sea" />
          </div>
          <div className="about-who-text">
            <p className="ab-eyebrow">Who We Are</p>
            <h2>India's Premier Marine Equipment Specialists</h2>
            <div className="ab-divider" />
            <p>
              Sunrise Marine Enterprise is a renowned organization engaged in the
              trading and export of marine equipment in Bhavnagar, Gujarat, India.
              Since 1999, we have been providing professional services, expertise,
              and support in the field of marine digital electronics for marine and
              offshore industries worldwide.
            </p>
            <p>
              We are a trusted supplier and stockist of navigation, marine safety,
              and engine stores, offering an unmatched portfolio of products from
              the world's leading manufacturers.
            </p>
            <div className="ab-badges">
              <span className="ab-badge"><Award size={15} /> ISO Certified</span>
              <span className="ab-badge"><Clock size={15} /> 25+ Years</span>
              <span className="ab-badge"><Globe size={15} /> Global Exporter</span>
              <span className="ab-badge"><Shield size={15} /> Quality Assured</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======== PURPOSE — VISION & MISSION ======== */}
      <section className="about-purpose-section">
        <div className="about-purpose-inner">
          <div className="about-purpose-header">
            <p className="ab-eyebrow">Our Purpose</p>
            <h2>Navigating Excellence With Integrity and Innovation</h2>
            <p>
              We are driven by a commitment to deliver world-class marine solutions
              that keep vessels safe and operations efficient.
            </p>
          </div>

          <div className="vm-cards">
            {/* Vision */}
            <div className="vm-card vm-card--vision">
              <div className="vm-card-icon">
                <Eye size={26} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the world's most trusted partner in marine equipment supply,
                known for our technological expertise and unwavering commitment to
                maritime safety. We aspire to set the global benchmark for quality
                and reliability in every product we deliver.
              </p>
            </div>

            {/* Mission */}
            <div className="vm-card vm-card--mission">
              <div className="vm-card-icon">
                <Target size={26} />
              </div>
              <h3>Our Mission</h3>
              <p>
                Leveraging our decades of experience to provide high-end navigation,
                automation, and safety solutions that empower shipping lines globally.
                We are committed to ensuring our clients receive the right equipment,
                on time, with full technical support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======== COMPANY PROFILE ======== */}
      <section className="about-profile-section">
        <div className="about-profile-inner">
          {/* Left — text */}
          <div className="profile-text">
            <p className="ab-eyebrow">Company Profile</p>
            <h2>A Complete Marine Equipment Solutions Provider</h2>
            <div className="ab-divider" />
            <p>
              Sunrise Marine Enterprise is a renowned organization engaged in the
              trading and export of marine equipment. We have been providing
              professional services, expertise, and support in the field of
              navigation equipment, rig drill ship equipment, safety and survival
              equipment (life saving), and fire fighting equipment for marine and
              offshore industries.
            </p>
            <p>
              Our portfolio includes gyro compass, radars, ARPA radar, echo
              sounder, GPS, autopilot, speed log, VDR &amp; SVDR, anemometer,
              sonar, liferafts, main engine, auxiliary engine, turbo charger, and
              much more — all sourced from internationally recognized manufacturers.
            </p>

            {/* Product tags */}
            <div className="profile-tags">
              {[
                'Gyro Compass', 'ARPA Radar', 'Echo Sounder',
                'Autopilot Systems', 'GPS / GNSS', 'VDR / SVDR',
                'Anemometer', 'Liferafts', 'Main Engine Parts',
                'Turbo Charger', 'Fire Fighting Equipment', 'Drill Rig Equipment',
              ].map((tag) => (
                <span key={tag} className="profile-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right — highlight cards */}
          <div className="profile-highlights">
            <div className="profile-highlight-card">
              <div className="ph-icon"><Anchor size={22} /></div>
              <div className="ph-text">
                <h4>Marine Navigation</h4>
                <p>Complete range of SOLAS-approved navigation equipment for all vessel types.</p>
              </div>
            </div>
            <div className="profile-highlight-card">
              <div className="ph-icon"><Shield size={22} /></div>
              <div className="ph-text">
                <h4>Safety &amp; Survival</h4>
                <p>Life-saving appliances, fire fighting equipment, and emergency systems.</p>
              </div>
            </div>
            <div className="profile-highlight-card">
              <div className="ph-icon"><Zap size={22} /></div>
              <div className="ph-text">
                <h4>Automation Solutions</h4>
                <p>Tank level monitoring, engine control, and vessel management systems.</p>
              </div>
            </div>
            <div className="profile-highlight-card">
              <div className="ph-icon"><Package size={22} /></div>
              <div className="ph-text">
                <h4>Drill Rig Equipment</h4>
                <p>Comprehensive range of offshore drilling machinery and accessories.</p>
              </div>
            </div>
            <div className="profile-highlight-card">
              <div className="ph-icon"><Headphones size={22} /></div>
              <div className="ph-text">
                <h4>24/7 Technical Support</h4>
                <p>Round-the-clock expert guidance and after-sales service globally.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== CTA ======== */}
      <section className="about-cta-section">
        <p className="ab-eyebrow" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '14px' }}>
          Get In Touch
        </p>
        <h2>Ready to Partner With Us?</h2>
        <p>
          Reach out to our team for product inquiries, technical support, or to
          discuss your specific vessel equipment requirements.
        </p>
        <div className="about-cta-btns">
          <Link to="/contact" className="btn-white-solid">Contact Us</Link>
          <Link to="/products" className="btn-white-outline">Browse Products</Link>
        </div>
      </section>

    </div>
  );
};

export default About;
