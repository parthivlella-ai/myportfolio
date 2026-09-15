import React, { useState } from 'react';
import { Code, Server, Database, Wrench, Layers } from 'lucide-react';

const SkillsSection = ({ categorizedSkills }) => {
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Other'];
  const [activeCategory, setActiveCategory] = useState('All');

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Frontend': return <Code size={17} />;
      case 'Backend': return <Server size={17} />;
      case 'Database': return <Database size={17} />;
      case 'Tools': return <Wrench size={17} />;
      default: return <Layers size={17} />;
    }
  };

  const getSkillsToDisplay = () => {
    if (!categorizedSkills) return [];
    if (activeCategory === 'All') {
      return Object.values(categorizedSkills).flat();
    }
    return categorizedSkills[activeCategory] || [];
  };

  const currentSkills = getSkillsToDisplay();

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
        <p className="section-subtitle">Technologies, frameworks, and programming languages I use to build scalable systems</p>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.5rem 1.35rem'
              }}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.25rem'
        }}>
          {currentSkills.map((skill) => (
            <div key={skill._id || skill.name} className="glass-card" style={{
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--badge-bg)',
                  color: 'var(--accent-secondary)',
                  border: '1px solid var(--badge-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem'
                }}>
                  {skill.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {skill.name}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {skill.category}
                  </span>
                </div>
              </div>

              {/* Proficiency Pill */}
              <div style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--accent-secondary)',
                background: 'var(--badge-bg)',
                border: '1px solid var(--badge-border)',
                padding: '3px 9px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-mono)'
              }}>
                {skill.proficiency || 85}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
