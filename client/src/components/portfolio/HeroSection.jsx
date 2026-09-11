import React from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, Sparkles } from 'lucide-react';

const HeroSection = ({ profile }) => {
  const name = profile?.fullName || 'Lella Parthiv Reddy';
  const headline = profile?.headline || 'B.Tech Student | Full Stack Developer';
  const bio = profile?.bio || 'I build modern full-stack web applications using React, Node.js, Express and MongoDB.';

  const handleScroll = (href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 'calc(var(--navbar-height) + 3rem)',
      paddingBottom: '4rem',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center'
    }}>
      {/* Dynamic Ambient Background Glows */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '350px',
        borderRadius: '50%',
        background: 'var(--accent-glow)',
        filter: 'blur(100px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Availability Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--badge-bg)',
            color: 'var(--badge-text)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.75rem',
            border: '1px solid var(--border-color)'
          }}>
            <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
            <span>Available for Full Stack Internships</span>
          </div>

          <h1 style={{
            fontSize: '3.75rem',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            letterSpacing: '-1px'
          }} className="hero-title">
            Hi, I'm <span className="gradient-text">{name}</span>
          </h1>

          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem'
          }} className="hero-subtitle">
            {headline}
          </h2>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '680px'
          }}>
            {bio}
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}>
            <button
              onClick={() => handleScroll('#projects')}
              className="btn btn-primary"
            >
              <span>View Projects</span>
              <ArrowRight size={18} />
            </button>

            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Download size={17} />
                <span>Download Resume</span>
              </a>
            )}

            <button
              onClick={() => handleScroll('#contact')}
              className="btn btn-outline"
            >
              <Mail size={17} />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Follow Me:</span>
            {profile?.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                style={{
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Github size={22} />
              </a>
            )}
            {profile?.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                style={{
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Linkedin size={22} />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.75rem !important;
          }
          .hero-subtitle {
            font-size: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
