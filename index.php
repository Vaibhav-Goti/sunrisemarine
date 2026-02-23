<!DOCTYPE html>
<html lang="en">

<head>
  <title>Sunrise Marine - Marine Equipment and Services</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Sunrise Marine - Your trusted supplier of marine equipment, navigation systems, automation solutions, and safety equipment">
  <meta name="keywords" content="marine equipment, navigation systems, automation, safety equipment, marine supplies">

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="fonts/icomoon/style.css">

  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/jquery-ui.css">
  <link rel="stylesheet" href="css/owl.carousel.min.css">
  <link rel="stylesheet" href="css/owl.theme.default.min.css">
  <link rel="stylesheet" href="css/owl.theme.default.min.css">

  <link rel="stylesheet" href="css/jquery.fancybox.min.css">

  <link rel="stylesheet" href="css/bootstrap-datepicker.css">

  <link rel="stylesheet" href="fonts/flaticon/font/flaticon.css">

  <link rel="stylesheet" href="css/aos.css">
  <link href="css/jquery.mb.YTPlayer.min.css" media="all" rel="stylesheet" type="text/css">

  <link rel="stylesheet" href="css/style.css?v=1.2">
  
  <!-- Additional CSS for sticky header icons -->
  <style>
    /* Force show contact icons when header is scrolled */
    .header-top.scrolled .d-none.d-lg-block {
      display: block !important;
    }
    
    .header-top.scrolled .quick-contact-icons {
      display: flex !important;
    }
  </style>

  <!-- Drill Gallery Styles -->
  <style>
    .drill-gallery-container {
      overflow: hidden;
      position: relative;
      margin: 2rem 0;
    }
    .drill-gallery-container .btn{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .heading
    {
    
      padding-bottom: 10px;
      margin-bottom: 20px;
      
    }
    
    .drill-gallery-scroll {
      display: flex;
      animation: scroll-horizontal 30s linear infinite;
      gap: 1.5rem;
      padding: 1rem 0;
    }
    
    .drill-gallery-scroll:hover {
      animation-play-state: paused;
    }
    
    .drill-gallery-item {
      flex: 0 0 220px;
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background: white;
    }
    
    .drill-gallery-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
    }
    
    .drill-gallery-item img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .drill-gallery-item:hover img {
      transform: scale(1.05);
    }
    
    .drill-gallery-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      color: white;
      padding: 1.5rem 1rem 1rem;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }
    
    .drill-gallery-item:hover .drill-gallery-overlay {
      transform: translateY(0);
    }
    
    .drill-gallery-overlay h5 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
    }
    
    @keyframes scroll-horizontal {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .drill-gallery-item {
        flex: 0 0 250px;
      }
      
      .drill-gallery-item img {
        height: 180px;
      }
      
      .drill-gallery-scroll {
        gap: 1rem;
      }
    }
    
    @media (max-width: 576px) {
      .drill-gallery-item {
        flex: 0 0 220px;
      }
      
      .drill-gallery-item img {
        height: 160px;
      }
    }
  </style>

  <!-- Add reCAPTCHA script -->
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  
  <!-- Sticky Header Styles -->
  <style>
    .header-top {
      transition: all 0.3s ease;
      position: relative;
      z-index: 1000;
    }

    /* Desktop: Show sticky header when scrolled */
    @media (min-width: 992px) {
      .header-top.scrolled {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        background-color: #ffffff !important;
        border: none !important;
        outline: none !important;
      }
      
      /* Force white background on all header elements */
      .header-top.scrolled,
      .header-top.scrolled *,
      .header-top.scrolled .container,
      .header-top.scrolled .container * {
        background-color: #ffffff !important;
        border: none !important;
        outline: none !important;
      }
      
      .header-top.scrolled .quick-contact-icons,
      .header-top.scrolled .company-name {
        background-color: #ffffff !important;
      }
      
      .header-top.scrolled .container {
        padding: 0.75rem 0;
      }
      
      .header-top.scrolled .company-name h3 {
        font-size: 0.95rem !important;
      }
      
      .header-top.scrolled .quick-contact-icons .text .h4 {
        font-size: 0.85rem;
      }
      
      .header-top.scrolled .quick-contact-icons .text .caption-text {
        font-size: 0.7rem;
      }
      
      .header-top.scrolled img {
        max-height: 45px !important;
      }
      
      .header-top.scrolled .quick-contact-icons {
        margin-bottom: 0;
      }
      
      .header-top.scrolled .quick-contact-icons .icon {
        font-size: 1rem;
      }
      
      .header-top.scrolled .row {
        align-items: center;
      }
      
      /* Add padding to body when header is sticky on desktop */
      body.header-sticky {
        padding-top: 85px;
      }
      
      /* Override Bootstrap d-none d-lg-block classes when scrolled */
      .header-top.scrolled .col-lg-3.d-none.d-lg-block {
        display: block !important;
      }
      
      .header-top.scrolled .quick-contact-icons {
        display: flex !important;
      }
      
      .header-top.scrolled .d-none.d-lg-block {
        display: block !important;
      }
      
      .header-top.scrolled .col-lg-3:not(:first-child) {
        display: block !important;
      }
      
      .header-top.scrolled .row {
        display: flex !important;
        flex-wrap: wrap !important;
      }
      
      .header-top.scrolled .col-lg-3 {
        display: block !important;
      }
      
      .header-top.scrolled .col-lg-3.d-none {
        display: block !important;
      }
      
      .header-top.scrolled .d-none {
        display: block !important;
      }
      
      .header-top.scrolled .container .row .col-lg-3 {
        display: block !important;
      }
      
      .header-top.scrolled .col-lg-3:nth-child(2),
      .header-top.scrolled .col-lg-3:nth-child(3),
      .header-top.scrolled .col-lg-3:nth-child(4) {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      .header-top.scrolled .quick-contact-icons {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      .header-top.scrolled .quick-contact-icons .icon {
        display: block !important;
        visibility: visible !important;
      }
      
      .header-top.scrolled .quick-contact-icons .text {
        display: block !important;
        visibility: visible !important;
      }
      
      .header-top.scrolled .quick-contact-icons .text .h4 {
        display: block !important;
        visibility: visible !important;
      }
      
      .header-top.scrolled .quick-contact-icons .text .caption-text {
        display: block !important;
        visibility: visible !important;
      }
      
      .header-top.scrolled .quick-contact-icons .text .h4,
      .header-top.scrolled .quick-contact-icons .text .caption-text {
        font-size: 0.8rem !important;
        line-height: 1.2 !important;
        color: #333 !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      .header-top.scrolled .quick-contact-icons .icon span {
        font-size: 1rem !important;
        color: #007bff !important;
        display: inline-block !important;
      }
    }
    
    /* Mobile: Better sticky behavior */
    @media (max-width: 991px) {
      .header-top.scrolled {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        transform: none; /* Don't hide completely */
        opacity: 1;
        visibility: visible;
        background-color: #ffffff !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      
      /* Hide contact icons on mobile scroll to save space */
      .header-top.scrolled .d-none.d-lg-block {
        display: none !important;
      }
      
      .header-top.scrolled .container {
        padding: 0.5rem 0;
      }
      
      .header-top.scrolled img {
        max-height: 40px !important;
      }
      
      .header-top.scrolled .company-name h3 {
        font-size: 0.9rem !important;
      }
      
      /* Keep the toggle button visible and correctly colored */
      .header-top.scrolled .js-menu-toggle {
        color: #007bff !important;
      }
      
      body.header-sticky {
        padding-top: 60px; /* Space for the compact mobile sticky header */
      }
    }
    
    /* Smooth transition for all elements */
    .header-top * {
      transition: all 0.3s ease;
    }
    
    /* Navbar height reduction styles */
    .site-navbar {
      transition: all 0.3s ease;
    }
    
    .site-navbar.scrolled {
      padding: 0.25rem 0 !important;
      background-color: #007bff !important;
      border: none !important;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .site-navbar.scrolled .nav-link {
      padding: 0.4rem 1rem !important;
      font-size: 0.9rem;
    }
    
    .site-navbar.scrolled .site-menu {
      margin-bottom: 0;
    }
    
    .site-navbar.scrolled .container {
      background-color: #007bff;
    }
    
    .site-navbar.scrolled {
      position: fixed;
      left: 0;
      right: 0;
      z-index: 999;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0.25rem !important;
    }
    
    .btn-group-gap a {
    margin-left: 20px;
    text-transform:none;
}
    /* Desktop: Navbar below header */
    @media (min-width: 992px) {
      .header-top.scrolled + .site-navbar.scrolled {
        margin-top: 0 !important;
      }
      
      body.header-sticky.navbar-sticky {
        padding-top: 90px;
      }
    }
    
    /* Mobile: Navbar at top when header is hidden */
    @media (max-width: 991px) {
      .site-navbar.scrolled {
        top: 0 !important;
      }
      
      body.navbar-sticky {
        padding-top: 50px;
      }
    }
    
    .site-navbar.scrolled {
      margin-top: 0;
      margin-bottom: 0;
    }
    
    .header-top.scrolled + .site-navbar.scrolled {
      margin-top: 0;
    }
    
    .site-navbar.scrolled::before,
    .site-navbar.scrolled::after {
      display: none;
    }
    
    .header-top.scrolled {
      border-bottom: none !important;
      outline: none !important;
    }
    
    .site-navbar.scrolled {
      border-top: none !important;
      border-bottom: none !important;
      border-left: none !important;
      border-right: none !important;
      outline: none !important;
    }
    
    .site-navbar.scrolled,
    .site-navbar.scrolled *,
    .site-navbar.scrolled .container,
    .site-navbar.scrolled .container * {
      background-color: #007bff !important;
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
    
    .site-navbar.scrolled .nav-link {
      background-color: transparent !important;
      border: none !important;
    }
    
    .site-navbar.scrolled {
      margin: 0 !important;
      padding: 0.25rem 0 !important;
    }
    
    .site-navbar.scrolled .site-navigation,
    .site-navbar.scrolled .site-menu,
    .site-navbar.scrolled .site-menu li {
      background-color: #007bff !important;
    }
    
    .site-navbar.scrolled .site-menu .dropdown {
      background-color: #ffffff !important;
    }
    
    .site-navbar.scrolled .site-menu .dropdown li {
      background-color: #ffffff !important;
    }
    
    .site-navbar.scrolled .site-menu .dropdown li a {
      background-color: #ffffff !important;
      color: #333 !important;
    }
    
    .site-navbar.scrolled .site-menu .dropdown li a:hover {
      background-color: #f8f9fa !important;
      color: #007bff !important;
    }

    /* FIX: Mobile sidebar active link color */
.site-mobile-menu .site-nav-wrap li.active > a,
.site-mobile-menu .site-nav-wrap li.current-menu-item > a {
  color: #007bff !important; /* Bootstrap primary blue */
  font-weight: 600;
  background-color: #f8f9fa; /* light highlight */
}

/* Service-29283 Improvements */
.service-29283 {
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.service-29283:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.service-29283 p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #666;
  text-align: center;
  margin-top: 15px;
  /* Ensure uniform line width and height for all boxes */
  min-height: 100px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 100%;
}

.service-29283 h3 {
  margin-top: 10px;
  font-weight: 700;
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .service-29283 p {
    min-height: auto;
    -webkit-line-clamp: none;
  }
}

/* Unified Icon Alignment */
.service-29283 .wrap-icon-39293 {
  display: flex !important;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  margin-bottom: 25px !important;
  position: relative;
  z-index: 1;
}

.service-29283 .wrap-icon-39293:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f0f7ff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: -1;
}

.service-29283 .wrap-icon-39293 > span {
  font-size: 40px !important;
  line-height: 1 !important;
  color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Specific adjustment for Cog to match Flaticon top alignment */
.service-29283 .icon-cog {
  font-size: 50px !important; /* Cog font is naturally heavier */
  position: relative;
  top: -2px;
}

  </style>
</head>

<body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">

  <div class="site-wrap">

    <div class="site-mobile-menu site-navbar-target">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close mt-3">
          <span class="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div class="site-mobile-menu-body"></div>
    </div>

    
    <div class="header-top bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6 col-lg-3">
            <a href="index.php" class="d-flex align-items-center text-decoration-none">
              <img src="images1/logo.png" alt="Sunrise Marine Logo" class="img-fluid mr-3" style="max-height: 60px; width: auto; flex-shrink: 0;">
              <div class="company-name">
                <h3 class="mb-0" style="font-family: 'Inter', sans-serif; font-weight: 800; font-size: 1.1rem; color: #333; line-height: 1.2;">Sunrise Marine Enterprise</h3>
              </div>
            </a>
          </div>
          <div class="col-lg-3 d-none d-lg-block">

            <div class="quick-contact-icons d-flex">
              <div class="icon align-self-start">
                <span class="icon-location-arrow text-primary"></span>
              </div>
              <div class="text">
                <span class="h4 d-block">Bhavnagar,Gujarat, India</span>
                <span class="caption-text">Marine Equipment Specialists</span>
              </div>
            </div>

          </div>
          <div class="col-lg-3 d-none d-lg-block">
            <div class="quick-contact-icons d-flex">
              <div class="icon align-self-start">
                <span class="icon-phone text-primary"></span>
              </div>
              <div class="text">
                <span class="h4 d-block">	+91 278 2560837</span>
                <span class="caption-text">Office phone</span>
              </div>
            </div>
          </div>

          <div class="col-lg-3 d-none d-lg-block">
            <div class="quick-contact-icons d-flex">
              <div class="icon align-self-start">
                <span class="icon-envelope text-primary"></span>
              </div>
              <div class="text">
                <span class="h4 d-block">info@sunrise-marine.com</span>
                <span class="caption-text">Office mail</span>
              </div>
            </div>
          </div>

          <div class="col-6 d-block d-lg-none text-right">
              <a href="#" class="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                class="icon-menu h3"></span></a>
          </div>
        </div>
      </div>

      <div class="site-navbar py-2 js-sticky-header site-navbar-target d-none pl-0 d-lg-block" role="banner">
        <div class="container">           
          <div class="d-flex align-items-center">
            <div class="mx-auto">
              <nav class="site-navigation position-relative text-right" role="navigation">
                <ul class="site-menu main-menu js-clone-nav mr-auto d-none pl-0 d-lg-block">
                  <li class="active">
                    <a href="index.php" class="nav-link text-left">Home</a>
                  </li>
                  <li>
                    <a href="about.html" class="nav-link text-left">About Us</a>
                  </li>
                  <li class="has-children">
                    <a href="#" class="nav-link text-left">Products</a>
                    <ul class="dropdown">
                      <li><a href="navigation.html">Navigation Equipment</a></li>
                      <li><a href="automation.html">Automation Systems</a></li>
                      <li><a href="anemometer.html">Anemometer Equipment</a></li>
                      <li><a href="machinery.html">Marine Machinery</a></li>
                      <li><a href="drill.html">Drill Rig Equipment</a></li>
                      <li><a href="marine-antiques.html">Marine Entiquies</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="contact.html" class="nav-link text-left">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="hero-slide owl-carousel site-blocks-cover">
      <div class="intro-section" style="background-image: url('images1/p1.webp');">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-7 ml-auto text-right" data-aos="fade-up">
              <h1>Premium Marine Equipment Solutions</h1>
              <p>Your trusted partner for high-quality marine equipment, navigation systems, automation solutions, and safety equipment. Serving the maritime industry with excellence.</p>
              <p><a href="#" class="btn btn-primary py-3 px-5">Read More</a></p>
            </div>
          </div>
        </div>
      </div>

      <div class="intro-section" style="background-image: url('images1/p2.webp');">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-7 mx-auto text-center" data-aos="fade-up">
              <h1>Complete Marine Equipment Range</h1>
              <p>From navigation systems to deck machinery, we offer a comprehensive range of marine equipment and solutions to meet all your vessel's needs.</p>
              <p><a href="#" class="btn btn-primary py-3 px-5">Read More</a></p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- END slider -->

    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img src="images1/p6.jpg" alt="Image" class="img-fluid">
          </div>
          <div class="col-md-6">
            <span class="text-serif text-primary">About Us</span>
            <h3 class="heading-92913 text-black">Welcome To Our Website</h3>
            <p>
              Sunrise marine enterprise is a renowned organization engaged in trading and exports of marine equipments in Bhavnagar, Gujarat, India. We have been providing professional services, expertise and support in the field of marine digital electronics for marine and offshore industries.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Drill Equipment Images Section -->
    <div class="site-section bg-light">
      <div class="container">
        <div class="row justify-content-center text-center mb-5">
          <div class="col-md-7">
            <span class="text-serif text-primary">Our Products</span>
            <h3 class="heading">Drill Equipment Gallery</h3>
            <p>Explore our comprehensive range of high-quality drill equipment and marine machinery</p>
          </div>
        </div>
        
        <div class="drill-gallery-container">
          <div class="drill-gallery-scroll">
            <div class="drill-gallery-item">
              <img src="images1/drill/pipes.png" alt="Chiksan High Pressure Pipe" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Chiksan High Pressure Pipe</h5>
              </div>
            </div>
            <div class="drill-gallery-item">
              <img src="images1/drill/cylinder honing machine.jpg" alt="Cylinder Honing Machine" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Cylinder Honing Machine</h5>
              </div>
            </div>
            <div class="drill-gallery-item">
              <img src="images1/drill/horning tool.jpg" alt="Horning Tool" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Horning Tool</h5>
              </div>
            </div>
            <div class="drill-gallery-item">
              <img src="images1/drill/low torque valve.png" alt="Low Torque Valve" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Low Torque Valve</h5>
              </div>
            </div>
            <div class="drill-gallery-item">
              <img src="images1/drill/spool.png" alt="Spool Equipment" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Spool Equipment</h5>
              </div>
            </div>

            
              <div class="drill-gallery-item">
              <img src="images1/drill/bushing.png" alt="Spool Equipment" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>VARCO Master Bushing (Casing Bushing)</h5>
              </div>
            </div>
            
            <div class="drill-gallery-item">
              <img src="images1/drill/Circular Chart Recorders.png" alt="Low Torque Valve" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Circular Chart Recorders</h5>
              </div>
            </div>

             <div class="drill-gallery-item">
              <img src="images1/drill/equipments.png" alt="Spool Equipment" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Heavy-Duty Linkage & Pivot Assembly Kit</h5>
              </div>
            </div>

             <div class="drill-gallery-item">
              <img src="images1/drill/Grooved Pipe Couplings.png" alt="Spool Equipment" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Grooved Pipe Couplings</h5>
              </div>
            </div>



            <div class="drill-gallery-item">
              <img src="images1/drill/Drill Pipe Elevators.png" alt="Low Torque Valve" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Drill Pipe Elevators</h5>
              </div>
            </div>

            <div class="drill-gallery-item">
              <img src="images1/drill/mud cross bop.jpg" alt="Mud Cross BOP" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Mud Cross BOP</h5>
              </div>
            </div>
            <div class="drill-gallery-item">
              <img src="images1/drill/rotary.png" alt="Rotary Equipment" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Rotary Equipment</h5>
              </div>
            </div>
            <div class="drill-gallery-item">
              <img src="images1/drill/self-retracting-sala-sealed.png" alt="Self Retracting Sala Sealed" class="img-fluid">
              <div class="drill-gallery-overlay">
                <h5>Self Retracting Sala Sealed</h5>
              </div>
            </div>
          
           


          </div>
        </div>
        
      <div class="d-flex justify-content-between align-items-center mt-4">
        
        <!-- Left link -->
        <a href="drill.html" class="text-primary">
          View All Drill Equipment
        </a>

        <!-- Right buttons -->
        <!-- <div class="d-flex btn-group-gap">
          <a href="product.pdf" target="_blank" class="btn btn-warning  py-2 px-3">
            Preview
          </a>
          <a href="product.pdf" download class="btn btn-primary  py-2 px-3">
            Download PDF
          </a>
        </div> -->

      </div>
    </div>

    </div>
    <div class="py-5">
      <div class="container">
        <div class="row text-center">

      <div class="col-12 col-sm-6 col-lg-3 mb-4 d-flex">
        <a href="navigation.html" class="service-29283 w-100">
          <span class="wrap-icon-39293">
            <span class="flaticon-yacht"></span>
          </span>
          <h3>Navigation Equipment</h3>
          <p>
            Complete range of marine navigation equipment including Radar systems, GPS, Echo sounders, and Autopilot systems.
          </p>
        </a>
      </div>

      <div class="col-12 col-sm-6 col-lg-3 mb-4 d-flex">
        <a href="automation.html" class="service-29283 w-100">
          <span class="wrap-icon-39293">
            <span class="flaticon-shield"></span>
          </span>
          <h3>Automation Systems</h3>
          <p>
            Advanced automation solutions including tank level monitoring, engine control systems, and vessel management systems.
          </p>
        </a>
      </div>

      <div class="col-12 col-sm-6 col-lg-3 mb-4 d-flex">
        <a href="index.php" class="service-29283 w-100">
          <span class="wrap-icon-39293">
            <span class="flaticon-captain"></span>
          </span>
          <h3>Safety Equipment</h3>
          <p>
            Essential marine safety equipment including life-saving appliances, fire-fighting equipment, and emergency systems.
          </p>
        </a>
      </div>

      <div class="col-12 col-sm-6 col-lg-3 mb-4 d-flex">
        <a href="drill.html" class="service-29283 w-100">
          <span class="wrap-icon-39293">
            <span class="icon-cog"></span>
          </span>
          <h3>Drill Rig Equipment</h3>
          <p>
            Comprehensive range of drilling equipment and machinery for marine drilling operations, ensuring safety, efficiency, and reliability.
          </p>
        </a>
      </div>

    </div>
  </div>
</div>

    
    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="text-primary mb-4 text-center">Who We Are</h2>
            <p class="mb-4" style="font-size: 1.2rem ; align-items: center; justify-content: center;">Sunrise Marine
              Enterprise is a renowned organization engaged in trading and exports of marine equipments in Bhavnagar,
              Gujarat, India. We have been providing professional services, expertise and support in the field of marine
              digital electronics for marine and offshore industries.</p>
          </div>
        </div>
      </div>
    </div>



    <div class="site-section bg-image overlay" style="background-image: url('images1/p1.jfif');">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="counter-39392">
              <h3>27+</h3>
              <span>Years of Experience</span>
            </div>
          </div>
          <div class="col">
            <div class="counter-39392">
              <h3>500+</h3>
              <span>Clients Worldwide</span>
            </div>
          </div>
         
          <div class="col">
            <div class="counter-39392">
              <h3>50+</h3>
              <span>Global Partners</span>
            </div>
          </div>
          <div class="col">
            <div class="counter-39392">
              <h3>24/7</h3>
              <span>Technical Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <p><img src="images1/p4.jpg" alt="Image" class="img-fluid"></p>
          </div>
          <div class="col-md-5">
            <span class="text-serif text-primary">Get a Quote</span>
            <h3 class="heading-92913 text-black">Request Product Information</h3>
            <form action="process_quote.php" method="POST" class="row">
              <div class="form-group col-md-12">
                <label for="input-1">Full Name:</label>
                <input type="text" class="form-control" id="input-1" name="full_name" required>
              </div>
            

              <div class="form-group col-md-12">
                <label for="input-5">Product Category:</label>
                <select name="product_category" id="input-5" class="form-control" required>
                  <option value="">Select Category</option>
                  <option value="navigation">Navigation Equipment</option>
                  <option value="automation">Automation Systems</option>
                  <option value="safety">Safety Equipment</option>
                  <option value="machinery">Marine Machinery</option>
                  <option value="antiques">Marine Antiques</option>
                </select>
              </div>

              <div class="form-group col-md-12">
                <label for="input-product">Specific Product:</label>
                <input type="text" class="form-control" id="input-product" name="specific_product" placeholder="Enter product name or description">
              </div>

              <div class="form-group col-md-6">
                <label for="input-6">Email Address</label>
                <input type="email" class="form-control" id="input-6" name="email" required>
              </div>

              <div class="form-group col-md-6">
                <label for="input-7">Phone Number</label>
                <input type="tel" class="form-control" id="input-7" name="phone" required>
              </div>

              <div class="form-group col-md-12">
                <label for="input-8">Message </label>
                <textarea name="message" id="input-8" cols="30" rows="5" class="form-control" placeholder="Please specify any additional requirements, specifications, or questions"></textarea>
              </div>

              <div class="form-group col-md-12">
                <!-- Add reCAPTCHA widget -->
                <div class="g-recaptcha mb-3" data-sitekey="6Ld6Rs8rAAAAAFUS5nSY5675w6W-iFRkt8FqnexL"></div>
              </div>

              <div class="form-group col-md-12">
                <input type="submit" class="btn btn-primary py-3 px-5" value="Request Quote">
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
    

    <div class="site-section bg-image overlay" style="background-image: url('images/hero_2.jpg');">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-7 text-center">
            <h2 class="text-white">Get In Touch With Us</h2>
            <p class="lead text-white">Sunrise Marine Enterprise</p>
            <p class="mb-0"><a href="contact.html" class="btn btn-warning py-3 px-5 text-white">Contact Us</a></p>
          </div>
        </div>
      </div>
    </div>

    
    <div class="footer bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="d-flex align-items-center mb-4">
              <img src="images1/logo.png" alt="Sunrise Marine Logo" class="img-fluid mr-3" style="max-height: 50px; width: auto; flex-shrink: 0;">
              <h4 class="mb-0" style="font-family: 'Inter', sans-serif; font-weight: 600; color: #007bff; font-size: 1.2rem;">Sunrise Marine Enterprise</h4>
            </div>
            <p>Sunrise Marine is your trusted partner for high-quality marine equipment and solutions. With over 27 years of experience, we provide comprehensive marine equipment solutions worldwide.</p>  
            <p><a href="about.html">Learn More</a></p>
          </div>  
          <div class="col-lg-3">
            <h3 class="footer-heading"><span>Our Company</span></h3>
            <ul class="list-unstyled">
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="col-lg-3">
              <h3 class="footer-heading"><span>Our Products</span></h3>
              <ul class="list-unstyled">
                  <li><a href="navigation.html">Navigation Equipment</a></li>
                  <li><a href="automation.html">Automation Systems</a></li>
                  <li><a href="anemometer.html">Anemometer Equipment</a></li>
                  <li><a href="machinery.html">Marine Machinery</a></li>
                  <li><a href="drill.html">Drill Rig Equipment</a></li>
                  <li><a href="marine-antiques.html">Marine Entiquies</a></li>
              </ul>
          </div>
          <div class="col-lg-3">
              <h3 class="footer-heading"><span>Contact Us</span></h3>
              <ul class="list-unstyled">
                  <li>Email: info@sunrise-marine.com</li>   
                  <li>Phone: +91 278 2560837</li>
                  <li>Bhavnagar, India</li>
                  <li><a href="contact.html">Send Enquiry</a></li>
                  <li><a href="contact.html">Technical Support</a></li>
              </ul>
          </div>                
        </div>

        <div class="row">
          <div class="col-12">
            <div class="copyright">
                <p>
                    <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Sunrise Marine
                    <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    

  </div>
  <!-- .site-wrap -->

  <!-- loader -->
  <div id="loader" class="show fullscreen"><svg class="circular" width="48px" height="48px"><circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/><circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#ff5e15"/></svg></div>

  <script src="js/jquery-3.3.1.min.js"></script>
  <script src="js/jquery-migrate-3.0.1.min.js"></script>
  <script src="js/jquery-ui.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/owl.carousel.min.js"></script>
  <script src="js/jquery.stellar.min.js"></script>
  <script src="js/jquery.countdown.min.js"></script>
  <script src="js/bootstrap-datepicker.min.js"></script>
  <script src="js/jquery.easing.1.3.js"></script>
  <script src="js/aos.js"></script>
  <script src="js/jquery.fancybox.min.js"></script>
  <script src="js/jquery.sticky.js"></script>
  <script src="js/jquery.mb.YTPlayer.min.js"></script>

  <script src="js/main.js"></script>
  
  <!-- Sticky Header and Navbar JavaScript -->
  <script>
    $(document).ready(function() {
      var header = $('.header-top');
      var navbar = $('.site-navbar');
      var scrollThreshold = 100; // Start shrinking after 100px scroll
      
      function updateNavbarPosition() {
        if (navbar.hasClass('scrolled')) {
          var windowWidth = $(window).width();
          
          // On mobile (< 992px), navbar goes to top since header is hidden
          if (windowWidth < 992) {
            navbar.css('top', '0px');
          } else {
            // On desktop, position navbar below the header
            if (header.hasClass('scrolled')) {
              var headerHeight = header.outerHeight();
              navbar.css('top', headerHeight + 'px');
            }
          }
        }
      }
      
      $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        
        if (scrollTop > scrollThreshold) {
          // Add scrolled class and sticky behavior to header
          header.addClass('scrolled');
          $('body').addClass('header-sticky');
          
          // Add scrolled class and sticky behavior to navbar
          navbar.addClass('scrolled');
          $('body').addClass('navbar-sticky');
          
          // Update navbar position after a short delay to ensure header height is calculated
          setTimeout(updateNavbarPosition, 10);
        } else {
          // Remove scrolled class and sticky behavior from header
          header.removeClass('scrolled');
          $('body').removeClass('header-sticky');
          
          // Remove scrolled class and sticky behavior from navbar
          navbar.removeClass('scrolled');
          $('body').removeClass('navbar-sticky');
          
          // Reset navbar top position
          navbar.css('top', '');
        }
      });
      
      // Handle window resize to recalculate heights
      $(window).resize(function() {
        if (navbar.hasClass('scrolled')) {
          updateNavbarPosition();
        }
      });
    });
  </script>

</body>

</html>