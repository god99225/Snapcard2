import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import '../style/Support.css';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the API call to send the form data
    setFormSubmitted(true);
  };

  return (
      <div className="contact-page">
                <Sidebar />
      <div className="contact-main-content">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-intro">We’re here to help! Please fill out the form below.</p>
        
        {formSubmitted ? (
          <div className="contact-success-message">
            <h2>Thank You!</h2>
            <p>Your message has been sent successfully. We'll get back to you soon!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="contact-submit-button">Send Message</button>
          </form>
        )}

        <div className="contact-details">
          <h3>Contact Details</h3>
          <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
          <p>Phone: <a href="tel:+1234567890">+123 456 7890</a></p>
        </div>

        <div className="contact-features">
          <h3>20 Features to Enhance Your Experience</h3>
          <ul>
            <li>Feature 1: Personalized support for your needs.</li>
            <li>Feature 2: 24/7 customer service availability.</li>
            <li>Feature 3: Quick response times for inquiries.</li>
            <li>Feature 4: Comprehensive FAQs to assist you.</li>
            <li>Feature 5: Live chat support during business hours.</li>
            <li>Feature 6: Access to user guides and tutorials.</li>
            <li>Feature 7: Email support for detailed queries.</li>
            <li>Feature 8: Phone support for urgent issues.</li>
            <li>Feature 9: Community forums for peer assistance.</li>
            <li>Feature 10: Feedback options to improve our service.</li>
            <li>Feature 11: Multi-language support for global users.</li>
            <li>Feature 12: Ticketing system for tracking issues.</li>
            <li>Feature 13: Knowledge base for self-help.</li>
            <li>Feature 14: Regular updates and announcements.</li>
            <li>Feature 15: Easy account management tools.</li>
            <li>Feature 16: Secure data handling and privacy protection.</li>
            <li>Feature 17: In-app messaging for quick queries.</li>
            <li>Feature 18: Scheduled callbacks for complex issues.</li>
            <li>Feature 19: Resource library with downloadable materials.</li>
            <li>Feature 20: Integration with third-party tools for better experience.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Support;
