import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Cpu,
  ShieldCheck,
  Drill,
  Send,
  Award,
  Clock,
  Globe,
  Loader2,
  PackageOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import API from '../api/axios';
import '../styles/hero.css';
import '../styles/home.css';
import '../styles/products.css';
import SEO from '../components/SEO';


/* ---- Config ---- */
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/* ---- Product categories for the quote form ---- */
const productCategories = [
  'Navigation Equipment',
  'Automation Solutions',
  'Safety Equipment',
  'Drill Rig Equipment',
  'Engine Store Equipment',
  'Communication Systems',
  'Other',
];

/* ---- Helper: build full image URL ---- */
const imgUrl = (src) => {
  if (!src) return '/p4.jpg'; // fallback
  if (src.startsWith('http')) return src;
  return `${API_BASE}${src}`;
};

/* ========================================================
   MAIN COMPONENT
   ======================================================== */
const Home = () => {

  /* ---------- Drill Gallery state ---------- */
  const [drillProducts, setDrillProducts] = useState([]);
  const [carouselLoading, setCarouselLoading] = useState(true);

  // Fetch drill rig products from the API
  useEffect(() => {
    const fetchDrillProducts = async () => {
      try {
        setCarouselLoading(true);
        const res = await API.get('/products?category=drill-rig-equipments&limit=100');
        const data = res.data;
        const list = Array.isArray(data) ? data : (data.products || []);
        setDrillProducts(list);
      } catch (err) {
        console.error('Failed to load drill products:', err);
        setDrillProducts([]);
      } finally {
        setCarouselLoading(false);
      }
    };
    fetchDrillProducts();
  }, []);

  // Flatten: each product → one slide per image
  const slides = drillProducts.flatMap((product) =>
    (product.images && product.images.length > 0
      ? product.images
      : [null]
    ).map((img) => ({ src: img, label: product.name }))
  );

  /* ---------- Carousel navigation ---------- */
  const [visibleCount, setVisibleCount] = useState(5);
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Responsive visible cards count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 550) setVisibleCount(1.2);
      else if (window.innerWidth < 850) setVisibleCount(2.5);
      else if (window.innerWidth < 1100) setVisibleCount(3.5);
      else setVisibleCount(5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // activeIdx is the index of the first visible card
  const maxIdx = Math.max(slides.length - Math.floor(visibleCount), 0);
  const canPrev = activeIdx > 0;
  const canNext = activeIdx < maxIdx;

  const gotoPrev = useCallback(() => setActiveIdx((i) => Math.max(i - 1, 0)), []);
  const gotoNext = useCallback(() => setActiveIdx((i) => Math.min(i + 1, maxIdx)), [maxIdx]);
  const gotoIdx = useCallback((i) => setActiveIdx(Math.max(0, Math.min(i, maxIdx))), [maxIdx]);

  // Reset when slides reload
  useEffect(() => { setActiveIdx(0); }, [slides.length]);

  /* ---------- Intersection Observer for Animations ---------- */
  const aboutRef = useRef(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const slideWidthPct = 100 / visibleCount;
  const translatePct = activeIdx * slideWidthPct;

  /* ---------- Quote form state ---------- */
  const [form, setForm] = useState({
    user_name: '',
    category: '',
    product: '',
    user_email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus('error');
      setStatusMsg('❌ Please verify that you are not a robot.');
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      const subject = `Product Enquiry: ${form.category} – ${form.product || 'General'}`;
      const messageBody =
        `Product Category: ${form.category}\n` +
        `Specific Product: ${form.product || '—'}\n` +
        `Phone: ${form.phone || '—'}\n\n` +
        `${form.message}`;

      await API.post('/contacts', {
        user_name: form.user_name,
        user_email: form.user_email,
        subject,
        message: messageBody,
        captchaToken,
      });

      setStatus('success');
      setStatusMsg('✅ Your enquiry has been sent! We will get back to you shortly.');
      setForm({ user_name: '', category: '', product: '', user_email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
      setStatusMsg('❌ Failed to send enquiry. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ======================================================
     RENDER
     ====================================================== */
  return (
    <main>
      <SEO
        title="Home"
        description="Global leaders in marine equipment solutions. Sunrise Marine Enterprise provides high-end navigation, engine stores, and safety equipment since 1999."
        keywords="marine equipment, navigation solutions, automation, safety, shipping, Sunrise Marine"
      />


      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="hero-content">
          <p className="top-tagline">TRUSTED SINCE 1999</p>
          <h1>Global Leaders in Marine Equipment Solutions</h1>
          <p className="description">
            Providing high-end navigation, engine stores, and safety equipment to the
            world's leading shipping lines from India's maritime hub.
          </p>
          <div className="hero-btns">
            <Link to="/products" className="button-view">View Products &rarr;</Link>
            <Link to="/contact" className="button-contact">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* ====== STATS BAR ====== */}
      <section className="stats-bar">
        <div className="stat-item"><h3>25+</h3><p>YEARS EXP.</p></div>
        <div className="stat-item"><h3>500+</h3><p>VESSELS SERVED</p></div>
        <div className="stat-item"><h3>50+</h3><p>GLOBAL BRANDS</p></div>
        <div className="stat-item"><h3>24/7</h3><p>TECH SUPPORT</p></div>
      </section>

      {/* ====== ABOUT SECTION ====== */}
      <section 
        className={`about-section ${isAboutVisible ? 'animate-in' : ''}`} 
        ref={aboutRef}
      >
        <div className="about-inner">
          <div className="about-img-wrap">
            <img src="/p6.jpg" alt="Sunrise Marine Enterprise" />
          </div>
          <div className="about-text-wrap">
            <p className="about-eyebrow">Who We Are</p>
            <h2>About Sunrise Marine Enterprise</h2>
            <div className="about-divider" />
            <p>
              Sunrise Marine Enterprise is a renowned organization engaged in trading and
              exports of marine equipment in Bhavnagar, Gujarat, India. Since 1999, we have
              been providing professional services, expertise and support in the field of
              marine digital electronics for marine and offshore industries.
            </p>
            <div className="about-badges">
              <span className="about-badge"><Award size={16} /> ISO Certified</span>
              <span className="about-badge"><Clock size={16} /> 25+ Years Experience</span>
              <span className="about-badge"><Globe size={16} /> Global Supplier</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== DRILL RIG EQUIPMENT GALLERY (all images, grid) ====== */}
      <section className="drill-carousel-section">
        <div className="drill-carousel-header">
          <span className="eyebrow">Our Products</span>
          <h2>Drill Rig Equipment Gallery</h2>
          <p>
            Explore our comprehensive range of high-quality drill equipment and marine
            machinery sourced from the world's leading manufacturers.
          </p>
        </div>

        {/* Loading */}
        {carouselLoading && (
          <div className="carousel-status">
            <Loader2 size={36} className="carousel-spinner" />
            <p>Loading drill equipment…</p>
          </div>
        )}

        {/* Empty */}
        {!carouselLoading && slides.length === 0 && (
          <div className="carousel-status">
            <PackageOpen size={40} />
            <p>No drill rig products found. Add some from the admin panel.</p>
          </div>
        )}

        {/* Carousel */}
        {!carouselLoading && slides.length > 0 && (
          <>
            <div className="dc-wrapper">
              {/* ← Prev arrow */}
              <button
                className={`dc-arrow dc-arrow--prev${!canPrev ? ' dc-arrow--disabled' : ''}`}
                onClick={gotoPrev}
                disabled={!canPrev}
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Track */}
              <div className="dc-track-clip">
                <div
                  className="dc-track"
                  ref={trackRef}
                  style={{ transform: `translateX(-${translatePct}%)` }}
                >
                  {slides.map((slide, i) => {
                    const isCenter = i === activeIdx + Math.floor(visibleCount / 2);
                    return (
                        <div
                          className={`dc-slide${isCenter ? ' dc-slide--active' : ''}`}
                          key={i}
                          style={{ width: `${slideWidthPct}%`, flex: `0 0 ${slideWidthPct}%` }}
                        >
                        <div className="dc-card">
                          <div className="dc-img-wrap">
                            <img
                              src={imgUrl(slide.src)}
                              alt={slide.label}
                              onError={(e) => { e.currentTarget.src = '/p4.jpg'; }}
                            />
                          </div>
                          <div className="dc-card-label">
                            <span>{slide.label}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* → Next arrow */}
              <button
                className={`dc-arrow dc-arrow--next${!canNext ? ' dc-arrow--disabled' : ''}`}
                onClick={gotoNext}
                disabled={!canNext}
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Dot indicators */}
            {maxIdx > 0 && (
              <div className="dc-dots">
                {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                  <button
                    key={i}
                    className={`dc-dot${i === activeIdx ? ' dc-dot--active' : ''}`}
                    onClick={() => gotoIdx(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link to="/products/drill-rig-equipments" className="button-view">
                View All Drill Equipment
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ====== OUR SERVICES ====== */}
      <section className="services-section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Explore our range of products and services</p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="icon-box"><Compass size={26} /></div>
            <h3>Navigation Equipment</h3>
            <p>Complete range of marine navigation equipment including Radar systems, GPS, Echo sounders, and Autopilot systems.</p>
            <Link to="/products/navigation-equipment-" className="view-details">View Details</Link>
          </div>
          <div className="service-card">
            <div className="icon-box"><Cpu size={26} /></div>
            <h3>Automation Solutions</h3>
            <p>Advanced automation solutions including tank level monitoring, engine control systems, and vessel management systems.</p>
            <Link to="/products/automation-system" className="view-details">View Details</Link>
          </div>
          <div className="service-card">
            <div className="icon-box"><ShieldCheck size={26} /></div>
            <h3>Safety Equipments</h3>
            <p>Essential marine safety equipment including life-saving appliances, fire-fighting equipment, and emergency systems.</p>
            <Link to="/products/safety" className="view-details">View Details</Link>
          </div>
          <div className="service-card">
            <div className="icon-box"><Drill size={26} /></div>
            <h3>Drill Rig Equipment</h3>
            <p>Comprehensive range of drilling equipment and machinery for marine drilling operations ensuring safety, efficiency, and reliability.</p>
            <Link to="/products/drill-rig-equipments" className="view-details">View Details</Link>
          </div>
        </div>
      </section>

      {/* ====== QUOTE / ENQUIRY FORM ====== */}
      <section className="quote-section">
        <div className="quote-inner">
          <div className="quote-header">
            <p className="eyebrow">Get a Quote</p>
            <h2>Request Product Information</h2>
            <p>Fill in the form below and our team will respond within 24 hours.</p>
          </div>

          <form className="quote-body" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="q-name">Full Name *</label>
                <input id="q-name" name="user_name" type="text"
                  placeholder="e.g. John Smith"
                  value={form.user_name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="q-category">Product Category *</label>
                <select id="q-category" name="category"
                  value={form.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {productCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="q-product">Specific Product</label>
              <input id="q-product" name="product" type="text"
                placeholder="Enter product name or description"
                value={form.product} onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="q-email">Email Address *</label>
                <input id="q-email" name="user_email" type="email"
                  placeholder="you@example.com"
                  value={form.user_email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="q-phone">Phone Number</label>
                <input id="q-phone" name="phone" type="tel"
                  placeholder="+91 00000 00000"
                  value={form.phone} onChange={handleChange} maxLength={15} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="q-message">Message</label>
              <textarea id="q-message" name="message"
                placeholder="Please specify any additional requirements, specifications, or questions…"
                value={form.message} onChange={handleChange} />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
            </div>

            <button type="submit" className="quote-submit-btn" disabled={submitting}>
              <Send size={18} />
              {submitting ? 'Sending…' : 'Request Quote'}
            </button>

            {status && (
              <div className={`form-status ${status}`}>{statusMsg}</div>
            )}
          </form>
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section>
        <div className="cta-banner">
          <div className="cta-container">
            <h2>Get Ready to Experience the Future of Marine Equipment</h2>
            <p>
              Discover the latest in marine technology and equipment with our comprehensive
              range of products and services. From navigation equipment to automation
              solutions, we offer innovative solutions to meet the evolving needs of the
              maritime industry.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-dark">GET IN TOUCH</Link>
              <Link to="/contact" className="btn-white">OUR LOCATIONS</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
