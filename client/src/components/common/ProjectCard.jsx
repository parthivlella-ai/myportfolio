import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, Star, Sparkles } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const {
    _id,
    title,
    slug,
    shortDescription,
    technologies = [],
    githubUrl,
    liveUrl,
    image,
    featured,
    stars
  } = project;

  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const projectImage = image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';

  // 3D Card Tilt & Dynamic Glare Effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transform: transformStyle,
        transition: 'transform 0.15s ease-out, box-shadow 0.2s ease, border-color 0.2s ease',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glare spotlight overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(0, 245, 160, ${glarePosition.opacity}) 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 15,
          transition: 'background 0.1s ease-out'
        }}
      />

      {/* Featured Badge */}
      {featured && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 20,
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
          color: '#032014',
          fontSize: '0.72rem',
          fontWeight: 800,
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-glow)',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          display: 'flex',
          alignItems: 'center',
          gap: '3px'
        }}>
          <Star size={12} fill="#032014" />
          <span>Featured</span>
        </div>
      )}

      {/* Project Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '210px',
        overflow: 'hidden',
        background: 'var(--bg-secondary)'
      }}>
        <img
          src={projectImage}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Project Body Content */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Header & Stars */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
            {stars > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.82rem', color: '#fbbf24', fontWeight: 700 }}>
                <Star size={14} fill="#fbbf24" /> {stars}
              </span>
            )}
          </div>

          {/* Description */}
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.92rem',
            lineHeight: 1.55,
            marginBottom: '1.25rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {shortDescription}
          </p>

          {/* Tech Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
            {technologies.map((tech, index) => (
              <span key={index} className="badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                title="Live Demo"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                title="GitHub Repository"
              >
                <Github size={14} />
                <span>Code</span>
              </a>
            )}
          </div>

          <Link
            to={`/projects/${slug || _id}`}
            className="btn btn-outline btn-sm"
            style={{ fontSize: '0.82rem' }}
          >
            <span>Details</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
