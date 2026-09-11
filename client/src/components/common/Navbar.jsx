import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, FileText, Lock, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ profile }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const name = profile?.fullName || 'Lella Parthiv Reddy';

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--navbar-height)',
      zIndex: 1000,
      background: scrolled ? 'var(--bg-glass)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      transition: 'all var(--transition-normal)'
    }}>
      <div className="container" style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.2rem',
            boxShadow: 'var(--shadow-glow)'
          }}>
            {name.charAt(0)}
          </div>
          <span>{name}<span style={{ color: 'var(--accent-primary)' }}>.dev</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '0.92rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions (Theme Toggle, Resume Button, Admin Dashboard Link) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm desktop-only"
            >
              <FileText size={15} />
              <span>Resume</span>
            </a>
          )}

          {isAuthenticated ? (
            <Link to="/admin/dashboard" className="btn btn-secondary btn-sm">
              <LayoutDashboard size={15} />
              <span className="desktop-only">Dashboard</span>
            </Link>
          ) : (
            <Link to="/admin/login" aria-label="Admin Login" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '6px' }}>
              <Lock size={16} />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle"
            aria-label="Toggle Navigation Menu"
            style={{
              padding: '6px',
              color: 'var(--text-primary)',
              display: 'none'
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 'var(--navbar-height)',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}
            >
              {link.name}
            </a>
          ))}
          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <FileText size={16} />
              <span>Download Resume</span>
            </a>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 850px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
