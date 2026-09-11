import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, Star } from 'lucide-react';

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

  const projectImage = image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Featured Badge */}
      {featured && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
          color: '#ffffff',
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-md)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          ★ Featured
        </div>
      )}

      {/* Project Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '200px',
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
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
            {stars > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>
                <Star size={14} fill="#f59e0b" /> {stars}
              </span>
            )}
          </div>

          {/* Description */}
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.5,
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
