import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const EducationSection = ({ educationList = [] }) => {
  const fallbackEducation = [
    {
      _id: 'default-edu',
      degree: 'Bachelor of Technology (B.Tech) in Computer Science',
      institution: 'University College of Engineering & Technology',
      period: '2022 - 2026',
      description: 'Specializing in Web Technologies, Data Structures & Algorithms, Software Engineering, and Database Systems.',
      highlights: [
        'Maintained high academic performance with focus on Full Stack Development',
        'Lead developer for student web development club projects',
        'Completed multiple full-stack capstone applications'
      ]
    }
  ];

  const list = educationList.length > 0 ? educationList : fallbackEducation;

  return (
    <section id="education" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="section-title">Education & <span className="gradient-text">Background</span></h2>
        <p className="section-subtitle">Academic qualifications and engineering foundation</p>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {list.map((item, index) => (
            <div key={item._id || index} className="glass-card" style={{
              padding: '2rem',
              position: 'relative',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--badge-bg)',
                    color: 'var(--accent-primary)'
                  }}>
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.degree}
                    </h3>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {item.institution}
                    </h4>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  background: 'var(--bg-primary)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)'
                }}>
                  <Calendar size={14} />
                  <span>{item.period}</span>
                </div>
              </div>

              {item.description && (
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                  {item.description}
                </p>
              )}

              {item.highlights && item.highlights.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                    KEY HIGHLIGHTS:
                  </span>
                  <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {item.highlights.map((h, i) => (
                      <li key={i} style={{ marginBottom: '0.3rem' }}>{h}</li>
                    ))}
                  </ul>
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
