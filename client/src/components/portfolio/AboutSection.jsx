import React from 'react';
import { GraduationCap, Code2, Cpu, Lightbulb, Rocket } from 'lucide-react';

const AboutSection = ({ profile }) => {
  const paragraphs = profile?.aboutParagraphs && profile.aboutParagraphs.length > 0
    ? profile.aboutParagraphs
    : [
        "Hello! I'm Parthiv Reddy, a Computer Science B.Tech student who enjoys building full-stack web applications from idea to deployment.",
        "My core skill set revolves around JavaScript technologies: React.js on the frontend, paired with Node.js, Express, and MongoDB on the backend. I have hands-on experience designing RESTful APIs, implementing user authentication, managing database models, and creating intuitive user interfaces.",
        "As an entry-level candidate seeking developer internships, I value clean code architecture, problem-solving, and continuous learning."
      ];

  const highlights = [
    {
      icon: <Code2 size={24} style={{ color: 'var(--accent-primary)' }} />,
      title: 'Full-Stack Development',
      description: 'Building end-to-end web apps with React, Node.js, Express, and MongoDB.'
    },
    {
      icon: <Lightbulb size={24} style={{ color: 'var(--accent-secondary)' }} />,
      title: 'Problem Solving',
      description: 'Translating complex user requirements into clean, scalable software solutions.'
    },
    {
      icon: <Rocket size={24} style={{ color: '#f59e0b' }} />,
      title: 'Learning Mindset',
      description: 'Eager to adopt modern frameworks, best engineering practices, and tools.'
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
        <p className="section-subtitle">A brief overview of my academic background and development passion</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="about-grid">
          {/* Bio Text Column */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Passionate Developer & Continuous Learner
            </h3>

            {paragraphs.map((p, index) => (
              <p key={index} style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '1rem',
                fontSize: '1rem'
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
                  padding: '0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
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
