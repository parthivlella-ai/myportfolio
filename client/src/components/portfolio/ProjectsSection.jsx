import React, { useState } from 'react';
import ProjectCard from '../common/ProjectCard';
import { Search, FolderGit2 } from 'lucide-react';

const ProjectsSection = ({ projects = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'Tool'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.technologies && project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
        <p className="section-subtitle">Real-world applications built with modern web technologies</p>

        {/* Filter and Search Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '450px' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="text"
              placeholder="Search projects by title or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '42px', borderRadius: 'var(--radius-full)' }}
            />
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProjects.map(project => (
              <ProjectCard key={project._id || project.slug} project={project} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="glass-card" style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <FolderGit2 size={48} style={{ color: 'var(--text-muted)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>No projects found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {searchQuery
                ? `No projects matching "${searchQuery}". Try clearing your search.`
                : 'No projects added yet. Add your first project from the Admin Dashboard.'}
            </p>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="btn btn-secondary btn-sm">
                Clear Search Filter
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
