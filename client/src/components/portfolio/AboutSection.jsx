import React from 'react';
import { Code2, Lightbulb, Rocket, Sparkles, CheckCircle } from 'lucide-react';

const AboutSection = ({ profile }) => {
  const paragraphs = profile?.aboutParagraphs && profile.aboutParagraphs.length > 0
    ? profile.aboutParagraphs
    : [
        "Hello! I'm Lella Parthiv Reddy, a Computer Science & Engineering student at Vignan Foundation for Science Research and Technology (VFSTR) with a CGPA of 8.0/10.",
        "My core skill set revolves around full-stack development and intelligent systems: React.js on the frontend, paired with Node.js, Express, and MongoDB on the backend, alongside strong Python and Django expertise.",
        "Seeking an internship or software engineer opportunity where I can apply my development skills, solve real-world problems, and contribute to innovative engineering projects."
      ];

  const highlights = [
    {
      icon: <Code2 size={24} style={{ color: 'var(--accent-secondary)' }} />,
      title: 'Full-Stack Web Development',
      description: 'Building end-to-end web apps with React, Node.js, Express, and MongoDB.'
    },
    {
      icon: <Lightbulb size={24} style={{ color: 'var(--accent-tertiary)' }} />,
      title: 'Python & Intelligent Systems',
      description: 'Designing clean algorithms, RESTful APIs, Django backends, and data solutions.'
    },
    {
      icon: <Rocket size={24} style={{ color: 'var(--accent-primary)' }} />,
      title: 'Engineering Mindset & Growth',
      description: 'Eager to adopt modern frameworks, best engineering practices, and ship real products.'
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
        <p className="section-subtitle">Academic background, technical focus, and engineering passion</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="about-grid">
          {/* Bio Text Column */}
          <div className="glass-card" style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Sparkles size={20} style={{ color: 'var(--accent-secondary)' }} />
              <h3 style={{ fontSize: '1.45rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                Passionate Developer & Continuous Learner
              </h3>
            </div>

            {paragraphs.map((p, index) => (
              <p key={index} style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: '1.15rem',
                fontSize: '1.02rem'
              }}>
                {p}
              </p>
            ))}
          </div>

          {/* Highlights Cards Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {highlights.map((item, index) => (
              <div key={index} className="glass-card" style={{
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem'
              }}>
                <div style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
