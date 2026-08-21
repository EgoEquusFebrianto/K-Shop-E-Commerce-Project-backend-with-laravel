import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "./contact.css"

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulasi pengiriman
    toast.success("Message sent successfully! We'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>
            Have questions or feedback? I'd love to hear from you. 
            Reach out to me through any of the channels below.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Information Cards */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>febrianto.kudadiri.04@gmail.com</p>
              <p className="info-desc">I'll respond within 24 hours</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🐙</div>
              <h3>GitHub</h3>
              <a 
                href="https://github.com/EgoEquusFebrianto" 
                target="_blank" 
                rel="noopener noreferrer"
                className="info-link"
              >
                github.com/EgoEquusFebrianto
              </a>
              <p className="info-desc">Check out my open source projects</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🔗</div>
              <h3>LinkedIn</h3>
              <a 
                href="https://www.linkedin.com/in/febrianto-kudadiri-9098a2254/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="info-link"
              >
                linkedin.com/in/febrianto-kudadiri
              </a>
              <p className="info-desc">Connect with me professionally</p>
            </div>

            <div className="info-card">
              <div className="info-icon">💬</div>
              <h3>WhatsApp</h3>
              <a 
                href="https://wa.me/6282163306070" 
                target="_blank" 
                rel="noopener noreferrer"
                className="info-link"
              >
                +62 821-6330-6070
              </a>
              <p className="info-desc">Fast response via WhatsApp</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>Medan, Sumatera Utara</p>
              <p className="info-desc">Indonesia</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2>Send me a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="How can I help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};