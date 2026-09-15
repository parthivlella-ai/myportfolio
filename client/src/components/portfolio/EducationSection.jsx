import React from 'react';
import { GraduationCap, Calendar, Award, CheckCircle2 } from 'lucide-react';

const EducationSection = ({ educationList = [] }) => {
  const fallbackEducation = [
    {
      _id: 'default-edu',
      degree: 'B.Tech in Computer Science and Engineering (CGPA: 8.0 / 10)',
      institution: 'Vignan Foundation for Science Research and Technology (VFSTR)',
      period: '2024 – 2028 (Pursuing)',
      description: 'Specializing in Computer Science & Engineering, Web Development, Data Structures, and System Design.',
      highlights: [
        'Maintained high academic standing with CGPA: 8.0 / 10',
        'Specializing in Python programming, full stack web apps, and data science',
        'Active developer building production React & Node.js web applications'
      ]
    }
  ];

  const list = educationList.length > 0 ? educationList : fallbackEducation;

  return (
    <section id="education" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <h2 className="section-title">Education & <span className="gradient-text">Background</span></h2>
        <p className="section-subtitle">Academic qualifications and engineering foundation</p>

        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          {list.map((item, index) => (
            <div key={item._id || index} className="glass-card" style={{
              padding: '2.25rem',
              position: 'relative',
              marginBottom: '1.75rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
                  <div style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--badge-bg)',
                    color: 'var(--accent-secondary)',
                    border: '1px solid var(--badge-border)'
                  }}>
                    <GraduationCap size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.degree}
                    </h3>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>
                      {item.institution}
                    </h4>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  background: 'var(--bg-surface)',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  <Calendar size={14} style={{ color: 'var(--accent-tertiary)' }} />
                  <span>{item.period}</span>
                </div>
              </div>

              {item.description && (
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem', fontSize: '0.98rem' }}>
                  {item.description}
                </p>
              )}

              {item.highlights && item.highlights.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.15rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem', letterSpacing: '0.5px' }}>
                    KEY HIGHLIGHTS:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {item.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '3px' }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
