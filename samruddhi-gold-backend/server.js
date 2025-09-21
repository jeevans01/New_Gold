// server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions, please try again later.'
  }
});

// Email transporter configuration
const createTransporter = () => {
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Generic SMTP configuration
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
};

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Please provide name, email, and message'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address'
      });
    }

    // Phone validation (optional)
    if (phone && phone.length < 10) {
      return res.status(400).json({
        error: 'Please provide a valid phone number'
      });
    }

    // Create email transporter
    const transporter = createTransporter();

    // Email to business owner
    const businessEmailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL || 'info@samruddhigold.com',
      subject: `New Contact Form Submission - ${service || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(45deg, #d4af37, #ffd700); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="margin: 0; font-size: 24px;">✨ New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0;">Samruddhi Gold Company</p>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #333; width: 30%;">Name:</td>
                <td style="padding: 10px; color: #666;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 10px; color: #666;">${email}</td>
              </tr>
              ${phone ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 10px; color: #666;">${phone}</td>
              </tr>
              ` : ''}
              ${service ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #333;">Service:</td>
                <td style="padding: 10px; color: #666;">${service}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
                <td style="padding: 10px; color: #666;">${message}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #2c3e50; color: white; padding: 15px; border-radius: 0 0 10px 10px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">Received on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <p style="margin: 5px 0 0 0;">Please respond within 24 hours for best customer experience.</p>
          </div>
        </div>
      `
    };

    // Auto-reply email to customer
    const customerEmailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Samruddhi Gold Company',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(45deg, #d4af37, #ffd700); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="margin: 0; font-size: 24px;">✨ Thank You, ${name}!</h2>
            <p style="margin: 5px 0 0 0;">Samruddhi Gold Company</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9; line-height: 1.6;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              We have received your inquiry and appreciate your interest in our services.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37;">
              <h3 style="color: #d4af37; margin: 0 0 10px 0;">Your Message Summary:</h3>
              <p style="color: #666; margin: 0;"><strong>Service:</strong> ${service || 'General Inquiry'}</p>
              <p style="color: #666; margin: 5px 0 0 0;"><strong>Message:</strong> ${message}</p>
            </div>
            
            <p style="color: #333; margin: 20px 0;">
              Our team will review your inquiry and get back to you within <strong>24 hours</strong>. 
              For urgent matters, please feel free to call us directly.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #d4af37; margin: 0 0 15px 0;">Contact Information:</h3>
              <p style="margin: 5px 0; color: #666;">📍 Building, 29/2, 2nd Floor, Corner House, Nagappa St, 4th Block, Nehru Nagar, Seshadripuram, Bengaluru, Karnataka 560001</p>
              <p style="margin: 5px 0; color: #666;">📞 <a href="tel:+917760547888" style="color: #d4af37;">+91 77605 47888</a></p>
              <p style="margin: 5px 0; color: #666;">⏰ Mon-Sat: 10:00 AM - 7:00 PM, Sun: 11:00 AM - 5:00 PM</p>
            </div>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border: 1px solid #4caf50;">
              <p style="margin: 0; color: #2e7d32; font-weight: 500;">
                💡 <strong>Pro Tip:</strong> Bring your gold items for a free, no-obligation evaluation and get the best rates in Bengaluru!
              </p>
            </div>
          </div>
          
          <div style="background: #2c3e50; color: white; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Thank you for choosing Samruddhi Gold Company</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">Bengaluru's Most Trusted Gold Buying Experts</p>
          </div>
        </div>
      `
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(businessEmailOptions),
      transporter.sendMail(customerEmailOptions)
    ]);

    // Log the inquiry (you can expand this to save to database)
    console.log(`New inquiry from ${name} (${email}) - Service: ${service || 'General'}`);

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Don't expose internal errors to client
    res.status(500).json({
      error: 'There was an error sending your message. Please try again or call us directly at +91 77605 47888.'
    });
  }
});

// Newsletter subscription endpoint (optional)
app.post('/api/newsletter', contactLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address'
      });
    }

    // Here you can add the email to your newsletter service
    // For example, MailChimp, SendGrid, or your own database
    
    console.log(`Newsletter subscription: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      error: 'There was an error subscribing to the newsletter. Please try again.'
    });
  }
});

// Quote request endpoint for gold prices
app.post('/api/quote', contactLimiter, async (req, res) => {
  try {
    const { goldType, weight, purity, contactInfo } = req.body;

    if (!goldType || !weight || !contactInfo?.phone) {
      return res.status(400).json({
        error: 'Please provide gold type, weight, and contact information'
      });
    }

    // Here you would typically:
    // 1. Get current gold prices from an API
    // 2. Calculate estimated value
    // 3. Save the quote request to database
    // 4. Send notification to business owner

    const currentGoldPrice = 5500; // This should come from a live gold price API
    const estimatedValue = (weight * currentGoldPrice * (purity / 100)).toFixed(2);

    console.log(`Quote request: ${goldType}, ${weight}g, ${purity}% purity - Estimated: ₹${estimatedValue}`);

    res.status(200).json({
      success: true,
      estimatedValue,
      message: 'Quote calculated! Our team will contact you shortly for accurate evaluation.',
      disclaimer: 'This is an estimated value. Final price depends on accurate testing and current market rates.'
    });

  } catch (error) {
    console.error('Quote request error:', error);
    res.status(500).json({
      error: 'There was an error processing your quote request. Please try again.'
    });
  }
});

// Catch all handler for React app (must be last)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error'
  });
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;