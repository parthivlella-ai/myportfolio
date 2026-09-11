import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart, Lock } from 'lucide-react';

const Footer = ({ profile }) => {
  const currentYear = new Date().getFullYear();
  const name = profile?.fullName || 'Lella Parthiv Reddy';

  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      padding: '3rem 0 2rem 0',
      color: 'var(--text-secondary)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
          <span>{name}<span style={{ color: 'var(--accent-primary)' }}>.dev</span></span>
        </div>

        <p style={{ maxWidth: '500px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {profile?.headline || 'B.Tech Student & Full Stack Web Developer building modern React & Node.js applications.'}
        </p>

        {/* Social Media Links */}
        <div style={{ display: 'flex', gap: '1.25rem', margin: '0.5rem 0' }}>
          {profile?.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            >
              <Github size={18} />
            </a>
          )}

          {profile?.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            >
              <Linkedin size={18} />
            </a>
          )}

          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            >
              <Mail size={18} />
            </a>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.5rem',
          width: '100%',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <span>© {currentYear} {name}. All rights reserved.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Built with React, Node & MongoDB
            </span>
            <Link to="/admin/login" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Lock size={12} /> Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
