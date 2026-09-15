import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Star, Calendar, Code, CheckCircle, ShieldAlert } from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';

import { defaultProjects as fallbackProjects } from '../data/projectsData';

const ProjectDetailPage = () => {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projRes, profRes] = await Promise.allSettled([
          api.get(`/projects/${idOrSlug}`),
          api.get('/profile')
        ]);

        if (projRes.status === 'fulfilled' && projRes.value.data?.success) {
          setProject(projRes.value.data.project);
        } else {
          const match = fallbackProjects.find(p => p.slug === idOrSlug || p._id === idOrSlug);
          if (match) {
            setProject(match);
          } else {
            setError('Project not found.');
          }
        }

        if (profRes.status === 'fulfilled' && profRes.value.data?.success) {
          setProfile(profRes.value.data.profile);
        }
      } catch (err) {
        const match = fallbackProjects.find(p => p.slug === idOrSlug || p._id === idOrSlug);
        if (match) {
          setProject(match);
        } else {
          setError('Failed to load project details.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [idOrSlug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar profile={profile} />
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingSpinner label="Loading project details..." />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar profile={profile} />
        <div className="container" style={{ flexGrow: 1, paddingTop: '100px', paddingBottom: '50px', textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: '3rem', maxWidth: '500px', margin: '0 auto' }}>
            <ShieldAlert size={48} style={{ color: '#ef4444', margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Project Not Found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error || 'The requested project could not be found.'}</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              <ArrowLeft size={16} /> Back to Projects
            </button>
          </div>
        </div>
        <Footer profile={profile} />
      </div>
    );
  }

  const {
    title,
    fullDescription,
    shortDescription,
    problemStatement,
    features = [],
    technologies = [],
    githubUrl,
    liveUrl,
    image,
    category,
    stars,
    sourceType,
    createdAt
  } = project;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar profile={profile} />

      <main style={{ flexGrow: 1, paddingTop: 'calc(var(--navbar-height) + 2rem)', paddingBottom: '4rem' }}>
        <div className="container">
          {/* Back Navigation Button */}
          <Link to="/#projects" className="btn btn-outline btn-sm" style={{ marginBottom: '2rem' }}>
            <ArrowLeft size={16} />
            <span>Back to All Projects</span>
          </Link>

          {/* Project Header Title & Badges */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>{category}</span>
              {stars > 0 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#f59e0b', fontWeight: 600 }}>
                  <Star size={16} fill="#f59e0b" /> {stars} GitHub Stars
                </span>
              )}
              {sourceType && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                  Source: {sourceType}
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>{title}</h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.6 }}>
              {shortDescription}
            </p>
          </div>

          {/* Main Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.8fr',
            gap: '2.5rem'
          }} className="project-detail-grid">
            {/* Left Column: Image & Description & Features */}
            <div>
              {/* Large Project Image Banner */}
              <div className="glass-card" style={{
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '2rem',
                maxHeight: '450px'
              }}>
                <img
                  src={image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
                  alt={title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Full Description Card */}
              <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  Overview & Architecture
                </h3>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem', whiteSpace: 'pre-line' }}>
                  {fullDescription || shortDescription}
                </div>
              </div>

              {/* Problem Statement Card */}
              {problemStatement && (
                <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    Problem Statement
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
                    {problemStatement}
                  </p>
                </div>
              )}

              {/* Key Features List */}
              {features && features.length > 0 && (
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                    Key Features
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {features.map((feature, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <CheckCircle size={18} style={{ color: 'var(--accent-primary)', marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Metadata Sidebar Card */}
            <div>
              <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                  Project Links & Details
                </h3>

                {/* Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                  )}

                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ width: '100%' }}
                    >
                      <Github size={18} />
                      <span>View GitHub Source</span>
                    </a>
                  )}
                </div>

                {/* Technologies List */}
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                    TECHNOLOGIES USED:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {technologies.map((tech, i) => (
                      <span key={i} className="badge" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Metadata */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Category</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{category}</span>
                  </div>
                  {createdAt && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Added On</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                        {new Date(createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer profile={profile} />

      <style>{`
        @media (max-width: 900px) {
          .project-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailPage;
