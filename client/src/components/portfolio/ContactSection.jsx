import React, { useState } from 'react';
import { Send, Mail, MapPin, User, MessageSquare, Loader2 } from 'lucide-react';
import api from '../../services/api';

const ContactSection = ({ profile, onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Please fill out all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/contact', formData);
      if (res.data.success) {
        onShowToast('Message sent successfully! I will respond soon.', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to send message. Please try again.';
      onShowToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
        <p className="section-subtitle">Have a project in mind or interested in hiring? Send a message below.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.8fr 1.2fr',
          gap: '3rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }} className="contact-grid">
          {/* Contact Details Info Card */}
          <div className="glass-card" style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '2rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Contact Information
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                I am actively looking for full-stack developer internships. Feel free to reach out directly via email or message.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--badge-bg)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Email</span>
                    <a href={`mailto:${profile?.email || 'parthivlella@gmail.com'}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {profile?.email || 'parthivlella@gmail.com'}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--badge-bg)',
                    color: 'var(--accent-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Location</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {profile?.location || 'India'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-secondary)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                ⚡ Quick Response
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Usually responds within 24 hours on business days.
              </span>
            </div>
          </div>

          {/* Contact Submission Form */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Internship Opportunity / Inquiry"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Parthiv, I came across your portfolio and..."
                  required
                  className="form-control"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
