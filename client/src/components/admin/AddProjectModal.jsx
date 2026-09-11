import React, { useState } from 'react';
import { X, Github, Upload, Edit3, Loader2, CheckCircle2, Sparkles, Image, Star } from 'lucide-react';
import api from '../../services/api';

const AddProjectModal = ({ isOpen, onClose, onProjectSaved, onShowToast }) => {
  const [activeTab, setActiveTab] = useState('github'); // 'github' | 'zip' | 'manual'
  
  // Step 1 input states for GitHub & ZIP
  const [githubUrlInput, setGithubUrlInput] = useState('');
  const [zipFile, setZipFile] = useState(null);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);

  // Image Upload state
  const [uploadingImage, setUploadingImage] = useState(false);

  // Common pre-filled / manual project form state
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    problemStatement: '',
    features: '', // comma or newline separated
    technologies: '', // comma separated string
    githubUrl: '',
    liveUrl: '',
    image: '',
    category: 'Full Stack',
    featured: false,
    stars: 0,
    sourceType: 'manual',
    sourceUrl: ''
  });

  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({
      ...prev,
      sourceType: tab === 'github' ? 'github' : tab === 'zip' ? 'zip' : 'manual'
    }));
  };

  // Option 1: Fetch GitHub Repo Information
  const handleFetchGitHubRepo = async (e) => {
    e.preventDefault();
    if (!githubUrlInput) {
      onShowToast('Please enter a GitHub repository URL', 'error');
      return;
    }

    setIsFetchingInfo(true);
    try {
      const res = await api.post('/import/github', { githubUrl: githubUrlInput });
      if (res.data.success && res.data.data) {
        const repo = res.data.data;
        setFormData({
          title: repo.title || '',
          shortDescription: repo.shortDescription || '',
          fullDescription: repo.fullDescription || '',
          problemStatement: repo.problemStatement || '',
          features: Array.isArray(repo.features) ? repo.features.join('\n') : '',
          technologies: Array.isArray(repo.technologies) ? repo.technologies.join(', ') : '',
          githubUrl: repo.githubUrl || githubUrlInput,
          liveUrl: repo.liveUrl || '',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
          category: repo.category || 'Full Stack',
          featured: false,
          stars: repo.stars || 0,
          sourceType: 'github',
          sourceUrl: repo.githubUrl || githubUrlInput
        });
        onShowToast('Successfully imported GitHub repository info! You can now review and edit below.', 'success');
      }
    } catch (err) {
      onShowToast(err.response?.data?.message || 'Failed to fetch GitHub repo. You can enter details manually.', 'error');
    } finally {
      setIsFetchingInfo(false);
    }
  };

  // Option 2: Analyze ZIP File Upload
  const handleAnalyzeZip = async (e) => {
    e.preventDefault();
    if (!zipFile) {
      onShowToast('Please select a ZIP file to upload', 'error');
      return;
    }

    setIsFetchingInfo(true);
    const data = new FormData();
    data.append('zipFile', zipFile);

    try {
      const res = await api.post('/import/zip', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success && res.data.data) {
        const zipData = res.data.data;
        setFormData({
          title: zipData.title || '',
          shortDescription: zipData.shortDescription || '',
          fullDescription: zipData.fullDescription || '',
          problemStatement: zipData.problemStatement || '',
          features: Array.isArray(zipData.features) ? zipData.features.join('\n') : '',
          technologies: Array.isArray(zipData.technologies) ? zipData.technologies.join(', ') : '',
          githubUrl: zipData.githubUrl || '',
          liveUrl: zipData.liveUrl || '',
          image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&w=1200&q=80',
          category: zipData.category || 'Full Stack',
          featured: false,
          stars: 0,
          sourceType: 'zip',
          sourceUrl: ''
        });
        onShowToast('Successfully analyzed ZIP package metadata! Review and edit project details below.', 'success');
      }
    } catch (err) {
      onShowToast(err.response?.data?.message || 'Failed to analyze ZIP file.', 'error');
    } finally {
      setIsFetchingInfo(false);
    }
  };

  // Image Upload handler
  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append('imageFile', file);

    try {
      const res = await api.post('/import/image', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success && res.data.imageUrl) {
        setFormData(prev => ({ ...prev, image: res.data.imageUrl }));
        onShowToast('Project image uploaded successfully!', 'success');
      }
    } catch (err) {
      onShowToast('Failed to upload image.', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Final Project Save Handler
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription) {
      onShowToast('Please fill out the Project Title and Short Description.', 'error');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        features: formData.features ? formData.features.split('\n').map(f => f.trim()).filter(Boolean) : [],
        technologies: formData.technologies ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean) : ['Full Stack']
      };

      const res = await api.post('/projects', payload);
      if (res.data.success) {
        onShowToast('Project created and published to portfolio successfully!', 'success');
        onProjectSaved(res.data.project);
        onClose();
      }
    } catch (err) {
      onShowToast(err.response?.data?.message || 'Failed to create project.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-card animate-fade-in" style={{
        width: '100%',
        maxWidth: '750px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>+ Add New Project</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Choose how to import or create your project entry</p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* 3 Import Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.75rem',
          marginBottom: '1.75rem'
        }}>
          <button
            onClick={() => handleTabChange('github')}
            className={`btn ${activeTab === 'github' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.85rem', padding: '0.65rem 0.5rem' }}
          >
            <Github size={16} />
            <span>GitHub Repo</span>
          </button>

          <button
            onClick={() => handleTabChange('zip')}
            className={`btn ${activeTab === 'zip' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.85rem', padding: '0.65rem 0.5rem' }}
          >
            <Upload size={16} />
            <span>Upload ZIP</span>
          </button>

          <button
            onClick={() => handleTabChange('manual')}
            className={`btn ${activeTab === 'manual' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.85rem', padding: '0.65rem 0.5rem' }}
          >
            <Edit3 size={16} />
            <span>Add Manually</span>
          </button>
        </div>

        {/* TAB 1: GITHUB REPO IMPORT */}
        {activeTab === 'github' && (
          <div style={{
            background: 'var(--bg-primary)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            marginBottom: '1.5rem'
          }}>
            <label className="form-label">Enter Public GitHub Repository URL</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                value={githubUrlInput}
                onChange={(e) => setGithubUrlInput(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="form-control"
              />
              <button
                type="button"
                onClick={handleFetchGitHubRepo}
                disabled={isFetchingInfo}
                className="btn btn-primary"
                style={{ flexShrink: 0 }}
              >
                {isFetchingInfo ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                <span>Fetch Repo Info</span>
              </button>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'block' }}>
              Extracts title, description, topics, stars, and README features server-side.
            </span>
          </div>
        )}

        {/* TAB 2: ZIP FILE UPLOAD */}
        {activeTab === 'zip' && (
          <div style={{
            background: 'var(--bg-primary)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            marginBottom: '1.5rem'
          }}>
            <label className="form-label">Select Project ZIP Archive (.zip)</label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                type="file"
                accept=".zip"
                onChange={(e) => setZipFile(e.target.files[0])}
                className="form-control"
                style={{ padding: '0.4rem' }}
              />
              <button
                type="button"
                onClick={handleAnalyzeZip}
                disabled={isFetchingInfo || !zipFile}
                className="btn btn-primary"
                style={{ flexShrink: 0 }}
              >
                {isFetchingInfo ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                <span>Analyze ZIP</span>
              </button>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'block' }}>
              Safe analysis of package.json and README.md metadata without executing any uploaded files.
            </span>
          </div>
        )}

        {/* PROJECT DETAILS REVIEW & EDIT FORM */}
        <form onSubmit={handleSaveProject}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Project Details & Metadata
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Project Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. ConnectX Chat App"
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="form-control"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile</option>
                <option value="Tool">Tool</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Short Description *</label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="Brief 1-2 sentence overview for the project card"
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technologies (comma separated)</label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
              placeholder="React, Node.js, Express, MongoDB, Socket.IO, JWT"
              className="form-control"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">GitHub Repository URL</label>
              <input
                type="text"
                value={formData.githubUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                placeholder="https://github.com/username/project"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Live Demo URL</label>
              <input
                type="text"
                value={formData.liveUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                placeholder="https://myproject-demo.example.com"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Project Image (URL or Upload)</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
                className="form-control"
              />
              <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Image size={15} />
                <span>Upload Image</span>
                <input type="file" accept="image/*" onChange={handleImageFileChange} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Overview & Technical Description</label>
            <textarea
              rows="3"
              value={formData.fullDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
              placeholder="Detailed description of features, tech decisions, and implementation..."
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Problem Statement</label>
            <textarea
              rows="2"
              value={formData.problemStatement}
              onChange={(e) => setFormData(prev => ({ ...prev, problemStatement: e.target.value }))}
              placeholder="What problem does this project solve?"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Key Features (One per line)</label>
            <textarea
              rows="3"
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
              placeholder="Instant real-time messaging&#10;JWT Session security&#10;Dark theme interface"
              className="form-control"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
              />
              <span>Mark as Featured Project ★</span>
            </label>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
              <span>Save & Publish Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
