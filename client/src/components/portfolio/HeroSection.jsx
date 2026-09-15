import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, Sparkles, Terminal, FileText, CheckCircle2 } from 'lucide-react';

const HeroSection = ({ profile }) => {
  const name = profile?.fullName || 'Lella Parthiv Reddy';
  const bio = profile?.bio || 'Highly motivated B.Tech Computer Science student specializing in building high-performance full-stack web applications and data systems with React, Node.js, Python & MongoDB.';
  const linkedinUrl = profile?.linkedinUrl || 'https://www.linkedin.com/in/parthiv-reddy-1608a33a3';
  const githubUrl = profile?.githubUrl || 'https://github.com/parthivlella-ai';
  const resumeUrl = profile?.resumeUrl || '/resume.pdf';

  // Typing Effect
  const roles = [
    'Full Stack Web Developer',
    'B.Tech CSE Student (CGPA: 8.0/10)',
    'React & Node.js Developer',
    'Python & Django Engineer'
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentFullRole = roles[currentRoleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentFullRole.substring(0, displayText.length - 1));
        setTypingSpeed(45);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentFullRole.substring(0, displayText.length + 1));
        setTypingSpeed(90);
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentFullRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      setTypingSpeed(300);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  const handleScroll = (href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = (e) => {
    // Direct download/open in new tab
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" style={{
      minHeight: '88vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 'calc(var(--navbar-height) + 2.5rem)',
      paddingBottom: '4.5rem',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center'
    }}>
      {/* Dynamic Ambient Emerald Background Glow */}
      <div className="pulse-glow" style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '580px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        filter: 'blur(90px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Status / Availability Tag */}
          <div className="float-slow" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.35rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--badge-bg)',
            color: 'var(--badge-text)',
            fontSize: '0.88rem',
            fontWeight: 600,
            marginBottom: '1.75rem',
            border: '1px solid var(--badge-border)',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent-secondary)',
              boxShadow: '0 0 8px var(--accent-secondary)'
            }}></span>
            <span>Available for Full-Stack Internships</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: '3.9rem',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.1rem',
            letterSpacing: '-1.5px'
          }} className="hero-title">
            Hi, I'm <span className="gradient-text">{name}</span>
          </h1>

          {/* Dynamic Interactive Typing Subtitle */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '2.5rem',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--text-secondary)'
            }} className="hero-subtitle">
              <span style={{ color: 'var(--text-muted)' }}>&gt; </span>
              <span style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>{displayText}</span>
              <span className="typed-cursor">|</span>
            </h2>
          </div>

          {/* Bio Description */}
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: '2.75rem',
            maxWidth: '720px'
          }}>
            {bio}
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            marginBottom: '2.75rem'
          }}>
            <button
              onClick={() => handleScroll('#projects')}
              className="btn btn-primary"
              style={{ fontSize: '1rem', padding: '0.85rem 1.8rem' }}
            >
              <span>Explore Projects</span>
              <ArrowRight size={18} />
            </button>

            {/* Direct PDF Resume Button */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Lella_Parthiv_Reddy_Resume.pdf"
              onClick={handleResumeClick}
              className="btn btn-secondary"
              style={{ fontSize: '1rem', padding: '0.85rem 1.8rem', cursor: 'pointer' }}
              title="Open / Download PDF Resume"
            >
              <FileText size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>View Resume (PDF)</span>
              <Download size={15} style={{ color: 'var(--text-muted)' }} />
            </a>

            <button
              onClick={() => handleScroll('#contact')}
              className="btn btn-outline"
              style={{ fontSize: '1rem', padding: '0.85rem 1.8rem' }}
            >
              <Mail size={18} />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Social Links & Quick Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>Connect:</span>
            
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              <Linkedin size={20} style={{ color: 'var(--accent-secondary)' }} />
              <span>LinkedIn</span>
            </a>

            <span style={{ color: 'var(--border-color)' }}>|</span>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              <Github size={20} style={{ color: 'var(--accent-secondary)' }} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.75rem !important;
          }
          .hero-subtitle {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
