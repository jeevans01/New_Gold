// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

// Import icons from lucide-react for the footer
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin, 
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

// Import your JPG image from the images folder
import heroImage from './images/Screenshot 2025-09-21 at 4.44.38 PM.JPG'; 
// Placeholder for the woman's image in the hero/contact section
import womanPlaceholder from './images/placeholder-woman.png'; 

// Import avatar images for the new review section
import chloeAvatar from './images/chloe-avatar.png'; // Make sure you have this image in your images folder
import arjunAvatar from './images/arjun-avatar.png'; // Make sure you have this image in your images folder
import saraAvatar from './images/sara-avatar.png';   // Make sure you have this image in your images folder


const data = {
  social: {
    facebook: 'https://facebook.com/',
    insta: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/'
  },
  services: {
    goldBuying: '#services',
    jewelryAppraisal: '#services',
    silverBuying: '#services',
    diamondEvaluation: '#services',
  },
  about: {
    history: '#about',
    team: '#about',
    careers: '#contact',
    blog: '#',
  },
  contact: {
    email: 'info@samruddhigold.com',
    phone: '+91 77605 47888',
    address: 'Building, 29/2, 2nd Floor, Corner House, Nagappa St, 4th Block, Nehru Nagar, Seshadripuram, Bengaluru, Karnataka 560001',
  },
  company: {
    name: 'Samruddhi Gold',
    description: 'Building a legacy of trust and excellence in gold, silver, and diamond buying. We help our clients get the best value for their precious assets.',
  },
};

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: data.social.facebook },
  { icon: Instagram, label: 'Instagram', href: data.social.insta },
  { icon: Twitter, label: 'Twitter', href: data.social.twitter },
  { icon: Linkedin, label: 'LinkedIn', href: data.social.linkedin },
];

const aboutLinks = [
  { text: 'Company History', href: data.about.history },
  { text: 'Meet the Team', href: data.about.team },
  { text: 'Careers', href: data.about.careers },
  { text: 'Our Blog', href: data.about.blog },
];

const serviceLinks = [
  { text: 'Gold Buying', href: data.services.goldBuying },
  { text: 'Jewelry Appraisal', href: data.services.jewelryAppraisal },
  { text: 'Silver Buying', href: data.services.silverBuying },
  { text: 'Diamond Evaluation', href: data.services.diamondEvaluation },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

// WhatsApp Button Component
const WhatsAppButton = () => {
  useEffect(() => {
    const handleWhatsAppClick = () => {
      console.log('WhatsApp chat initiated');
      
      // Optional: Google Analytics tracking
      if (window.gtag) {
        window.gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: 'WhatsApp Chat'
        });
      }
    };

    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', handleWhatsAppClick);
      
      return () => {
        whatsappBtn.removeEventListener('click', handleWhatsAppClick);
      };
    }
  }, []);

  // Replace with your actual WhatsApp number (without + sign)
  const phoneNumber = "917760547888"; // Using the phone number from your data
  const message = "Hello Samruddhi Gold! I would like to inquire about selling my gold and your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      className="whatsapp-float bounce-in"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  // No longer needed for the new review section
  // const [currentReviewIndex, setCurrentReviewIndex] = useState(0); 

  const [stats, setStats] = useState({
    experience: 0,
    customers: 0,
    branches: 0,
  });

  // Animated counters for the About section
  useEffect(() => {
    const start = new Date().getTime();
    const duration = 2000; // 2 seconds

    const animateStats = () => {
      const now = new Date().getTime();
      const progress = (now - start) / duration;
      const progressClamped = Math.min(progress, 1);
      
      setStats({
        experience: Math.floor(progressClamped * 15), // Up to 15 years
        customers: Math.floor(progressClamped * 10000), // Up to 10000+
        branches: Math.floor(progressClamped * 200), // Up to 200+
      });

      if (progress < 1) {
        requestAnimationFrame(animateStats);
      }
    };

    requestAnimationFrame(animateStats);
  }, []);

  // Updated reviews data to match the image structure
  const reviews = [

    { 

      text: "Pledging my gold with them was a lifesaver. The process was quick, and the staff was so professional. I got a great value for my gold chain, and the documentation was clear and transparent. Highly recommended!", 

      name: "Anjali Sharma", 

      handle: "@anjalisharma", 

      title: "Business Owner",

      avatar: chloeAvatar

    },

    { 

      text: "I was a bit hesitant at first, but their service was excellent. They explained the entire gold loan process, and the interest rates were very fair. I felt completely secure and will definitely come back if needed.", 

      name: "Rajesh Kumar", 

      handle: "@rajesh.k", 

      title: "Retired Teacher",

      avatar: arjunAvatar

    },

    { 

      text: "The instant cash disbursement was a huge help for my medical emergency. The valuation was accurate, and there were no hidden charges. It was a fast and stress-free experience. A truly trustworthy service!", 

      name: "Lakshmi Patel", 

      handle: "@lakshmi.p", 

      title: "Homemaker",

      avatar: saraAvatar 

    },

  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // Simulate success/failure
      if (success) {
        setSubmitMessage('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
      }
      setIsSubmitting(false);
    }, 1500);
  };

  // No longer needed as we are displaying all reviews
  // const setCurrentReview = (index) => {
  //   setCurrentReviewIndex(index);
  // };

  // No longer needed as star rating is not in the new design
  // const ratingStars = (rating) => {
  //   return '⭐'.repeat(rating);
  // };

  return (
    <div className="App">
      {/* Top Bar Header */}
      <div className="top-bar-header">
        <div className="container top-bar-content">
          <a href="#branches" className="top-link"><span className="icon">📍</span> FIND NEAREST BRANCH</a>
          <a href="#careers" className="top-link"><span className="icon">🌟</span> WE ARE HIRING !!!</a>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="main-header" id="home">
        <div className="container main-nav-container">
          <div className="logo">Samruddhi Gold</div>
          <nav className="nav-menu">
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact" className="contact-us-btn">CONTACT US</a>
            <button className="hamburger-menu">☰</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="container hero-layout">
          <div className="hero-left">
            <div className="india-no1-badge">INDIA'S No. 1 GOLD BUYERS</div>
            <h1 className="text-reveal-animation">Sell Gold Instantly For Cash</h1>
            <ul className="hero-benefits">
              <li><span className="bullet">★</span> Best Prices Guaranteed – Instant cash offers!</li>
              <li><span className="bullet">★</span> Trusted Gold Buyers – Secure and hassle-free transactions.</li>
              <li><span className="bullet">★</span> No Hidden Fees – Transparent and fair appraisals.</li>
              <li><span className="bullet">★</span> Fast & Convenient – Walk in with gold, walk out with cash!</li>
            </ul>
            <a href="#about" className="read-more-btn">Read More</a>
          </div>
          <div className="hero-right">
            <img src={womanPlaceholder} alt="Gold Expert" className="hero-woman-image" />
          </div>
        </div>
      </section>

      {/* Experience & Gold Rate Section */}
      <section className="experience-rate-section">
        <div className="container">
          <div className="experience-wrapper">
            <div className="experience-text">
              <span className="years-count">{stats.experience}+</span> YEARS OF <br /> EXPERIENCE
            </div>
            <div className="gold-rate-block">
              <p className="rate-heading">Gold Rate..</p>
              <p className="current-rate">₹11010/-</p>
              <p className="updated-text">*UPDATED TODAY !!!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services..</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏆</div>
              <h3>Sell Gold For Cash</h3>
              <p>Sell gold for cash - quick & easy! Get the best value.</p>
            </div>
            <div className="service-card highlighted-card">
              <div className="service-icon">⚖️</div>
              <h3>Gold Buyers</h3>
              <p>Trusted gold buyers - get instant cash! Sell your gold.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💎</div>
              <h3>Jewelry Appraisal</h3>
              <p>Professional and certified appraisal services for your cherished jewelry.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💍</div>
              <h3>Diamond Evaluation</h3>
              <p>Our expert gemologists provide meticulous and honest evaluations for loose diamonds.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏛️</div>
              <h3>Estate Jewelry</h3>
              <p>Discreet and professional services for the appraisal and purchase of estate jewelry.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🪙</div>
              <h3>Coin Collection</h3>
              <p>Specialized buying services for gold, silver, and rare numismatic coin collections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">Our Legacy of Trust</h2>
            <p className="about-story">For over 15 years, Samruddhi Gold has been the name synonymous with integrity and excellence in Bengaluru. We built our legacy on a foundation of trust, offering unmatched transparency and professional service. We believe in providing a seamless experience, where every transaction is conducted with honesty and respect. Our commitment to our clients is what makes us the most trusted gold buying experts in the region.</p>
          </div>
          <div className="about-stats-grid">
            <div className="stat-item">
              <h3>{stats.customers.toLocaleString()}+</h3>
              <p>HAPPY CUSTOMERS</p>
              <span>Served in our network</span>
            </div>
            <div className="stat-item">
              <h3>{stats.branches}+</h3>
              <p>BRANCHES</p>
              <span>Across major cities</span>
            </div>
            <div className="stat-item">
              <h3>{stats.experience}+</h3>
              <p>YEARS</p>
              <span>Professional Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section (NEW DESIGN) */}
      <section id="reviews" className="reviews-section">
        <div className="container">
          <h2 className="section-title">What our <span>users</span> say</h2>
          <p3 className="sub-heading text-bold">"From fair valuation to instant cash, our process has become an essential tool for clients seeking financial security."</p3>
          <div className="reviews-grid-new">
            {reviews.map((review, index) => (
              <div key={index} className="review-card-new review-example-card">
                <div className="review-quote-icon">❝</div>
                <p className="review-text">{review.text}</p>
                <div className="review-author-info">
                  <img src={review.avatar} alt={review.name} className="review-author-avatar" />
                  <div className="review-author-details">
                    <h4>{review.name}</h4>
                    <p>{review.handle} • <span>{review.title}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container contact-layout">
          <div className="contact-form-wrapper">
            <h2 className="section-title">Get In Touch!</h2>
            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Contact Number:</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="service">Select Type:</label>
                <select id="service" name="service" value={formData.service} onChange={handleInputChange}>
                  <option value="">Select an option</option>
                  <option value="gold-buying">Sell Gold</option>
                  <option value="jewelry-appraisal">Release Pledged Gold</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Now'}
              </button>
            </form>
          </div>
          <div className="contact-image-side">
            <img src={womanPlaceholder} alt="Customer Service" className="contact-woman-image" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid-layout">
          <div className="footer-col company-info">
            <div className="logo-section">
              <span className="footer-logo-icon">✨</span>
              <span className="footer-logo-text">{data.company.name}</span>
            </div>
            <p className="company-description">
              {data.company.description}
            </p>
            <ul className="social-links">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                    <Icon className="lucide-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col link-list">
            <h3>About Us</h3>
            <ul>
              {aboutLinks.map(({ text, href }) => (
                <li key={text}><a href={href}>{text}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col link-list">
            <h3>Our Services</h3>
            <ul>
              {serviceLinks.map(({ text, href }) => (
                <li key={text}><a href={href}>{text}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col contact-list">
            <h3>Contact Us</h3>
            <ul>
              {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                <li key={text}>
                  <div className="contact-item-icon"><Icon className="lucide-icon" /></div>
                  {isAddress ? (
                    <address>{text}</address>
                  ) : (
                    <p>{text}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 {data.company.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
};

export default App;