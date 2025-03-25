import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../style/Help.css';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    { question: 'How do I create a business card?', answer: 'To create a business card, go to the dashboard and click on the "Create Card" button.' },
    { question: 'Can I edit my business card after creation?', answer: 'Yes, you can edit your business card at any time from the dashboard by selecting the card you wish to modify.' },
    { question: 'How do I share my business card?', answer: 'You can share your business card through email, social media, or by generating a unique link.' },
    { question: 'What formats are available for downloading business cards?', answer: 'You can download your business cards in PDF, JPEG, and PNG formats.' },
    // Add more FAQs as needed
  ];

  const troubleshootingTips = [
    'Ensure you have a stable internet connection.',
    'Clear your browser cache and cookies.',
    'Try using a different browser or device.',
    'Make sure your browser is updated to the latest version.',
    'Disable any browser extensions that might interfere with the application.'
  ];

  const userGuides = [
    { title: 'Creating a Business Card', link: '#creating-card' },
    { title: 'Sharing Your Business Card', link: '#sharing-card' },
    { title: 'Editing Your Card', link: '#editing-card' },
    { title: 'Understanding Your Dashboard', link: '#dashboard' },
    { title: 'Managing Your Account', link: '#managing-account' },
  ];

  const supportContact = {
    email: 'support@yourapp.com',
    phone: '+1 (555) 012-3456',
  };

  const filteredFAQs = faqs.filter(faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="help-page">
      <Sidebar />
      <div className="help-main-content">
        <h2 className="help-title">Help Center</h2>
        
        {/* Search Bar */}
        <div className="help-search-bar">
          <input
            type="text"
            placeholder="Search for help..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQs Section */}
        <div className="help-faq-section">
          <h3>Frequently Asked Questions</h3>
          {filteredFAQs.length === 0 ? (
            <p>No results found.</p>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                </div>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))
          )}
        </div>

        {/* Troubleshooting Tips Section */}
        <div className="help-troubleshooting-section">
          <h3>Troubleshooting Tips</h3>
          <ul>
            {troubleshootingTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* User Guides Section */}
        <div className="help-user-guides-section">
          <h3>User Guides</h3>
          <ul>
            {userGuides.map((guide, index) => (
              <li key={index}>
                <a href={guide.link}>{guide.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Contact Section */}
        <div className="help-support-contact">
          <h3>Contact Support</h3>
          <p>If you can't find the answer you're looking for, reach out to our support team:</p>
          <p>Email: <a href={`mailto:${supportContact.email}`}>{supportContact.email}</a></p>
          <p>Phone: <a href={`tel:${supportContact.phone}`}>{supportContact.phone}</a></p>
        </div>

        {/* Additional Features Section */}
        <div className="help-additional-features">
          <h3>Additional Features</h3>
          <ul>
            <li>User Account Management</li>
            <li>Notifications for Updates</li>
            <li>Privacy Settings</li>
            <li>Integrations with Other Apps</li>
            <li>Mobile App Availability</li>
            <li>Feedback Submission</li>
            <li>Feature Requests</li>
            <li>Product Announcements</li>
            <li>Community Forum Access</li>
            <li>Video Tutorials</li>
            <li>Webinars and Live Support Sessions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Help;
