// src/components/Footer.js
import React from 'react';
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';

const data = {
  facebookLink: 'https://facebook.com/',
  instaLink: 'https://instagram.com/',
  twitterLink: 'https://twitter.com/',
  githubLink: 'https://github.com/',
  dribbbleLink: 'https://dribbble.com/',
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
    address: 'Seshadripuram, Bengaluru',
  },
  company: {
    name: 'Samruddhi Gold',
    description:
      'Building a legacy of trust and excellence in gold, silver, and diamond buying. We help our clients get the best value for their precious assets.',
    logo: '/logo-placeholder.svg', // A placeholder for your company logo
  },
};

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: data.facebookLink },
  { icon: Instagram, label: 'Instagram', href: data.instaLink },
  { icon: Twitter, label: 'Twitter', href: data.twitterLink },
  { icon: Github, label: 'GitHub', href: data.githubLink },
  { icon: Dribbble, label: 'Dribbble', href: data.dribbbleLink },
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

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid-layout">
        <div className="footer-col company-info">
          <div className="logo-section">
            <span className="footer-logo-icon">✨</span>
            <span className="footer-logo-text">Samruddhi Gold</span>
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
  );
};

export default Footer;