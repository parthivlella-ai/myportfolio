import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FolderGit2,
  Code2,
  Mail,
  User,
  Plus,
  Trash2,
  Edit,
  LogOut,
  Star,
  CheckCircle,
  Eye,
  Home,
  ShieldCheck,
  GraduationCap,
  Key,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import AddProjectModal from '../components/admin/AddProjectModal';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminDashboardPage = ({ onShowToast }) => {
  const { admin, isAuthenticated, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'education' | 'skills' | 'messages' | 'profile' | 'credentials'
  
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);
  const [profile, setProfile] = useState({});

  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Education Form State
  const [eduForm, setEduForm] = useState({ degree: '', institution: '', period: '', description: '', highlights: '' });
  const [editingEduId, setEditingEduId] = useState(null);

  // Skill Form State
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', proficiency: 85 });
  const [editingSkillId, setEditingSkillId] = useState(null);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    headline: '',
    bio: '',
    email: '',
    githubUrl: '',
    linkedinUrl: '',
    resumeUrl: '',
    location: ''
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Admin Credentials Edit State
  const [credForm, setCredForm] = useState({ username: '', email: '', newPassword: '' });
  const [updatingCreds, setUpdatingCreds] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [projRes, skillRes, msgRes, profRes] = await Promise.all([
        api.get('/projects'),
        api.get('/skills'),
        api.get('/contact'),
        api.get('/profile')
      ]);

      if (projRes.data.success) setProjects(projRes.data.projects);
      if (skillRes.data.success) setSkills(skillRes.data.skills);
      if (msgRes.data.success) {
        setMessages(msgRes.data.messages);
        setUnreadMsgCount(msgRes.data.unreadCount || 0);
      }
      if (profRes.data.success && profRes.data.profile) {
        setProfile(profRes.data.profile);
        setEducation(profRes.data.education || []);
        setProfileForm({
          fullName: profRes.data.profile.fullName || '',
          headline: profRes.data.profile.headline || '',
          bio: profRes.data.profile.bio || '',
          email: profRes.data.profile.email || '',
          githubUrl: profRes.data.profile.githubUrl || '',
          linkedinUrl: profRes.data.profile.linkedinUrl || '',
          resumeUrl: profRes.data.profile.resumeUrl || '',
          location: profRes.data.profile.location || ''
        });
        setCredForm({
          username: admin?.username || 'parthiv',
          email: admin?.email || 'admin@developer.com',
          newPassword: ''
        });
      }
    } catch (err) {
      if (onShowToast) onShowToast(err.response?.data?.message || 'Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  // Handle Project Delete
  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}"?`)) return;
    try {
      const res = await api.delete(`/projects/${id}`);
      if (res.data.success) {
        if (onShowToast) onShowToast(`Project "${title}" deleted successfully.`, 'success');
        setProjects(prev => prev.filter(p => p._id !== id));
      }
    } catch (err) {
      if (onShowToast) onShowToast('Failed to delete project.', 'error');
    }
  };

  // Handle Featured Toggle
  const handleToggleFeatured = async (project) => {
    try {
      const res = await api.put(`/projects/${project._id}`, { featured: !project.featured });
      if (res.data.success) {
        setProjects(prev => prev.map(p => p._id === project._id ? res.data.project : p));
        if (onShowToast) onShowToast(`Featured status updated for "${project.title}".`, 'success');
      }
    } catch (err) {
      if (onShowToast) onShowToast('Failed to update featured status.', 'error');
    }
  };

  // Handle Save Education
  const handleSaveEducation = async (e) => {
    e.preventDefault();
    if (!eduForm.degree || !eduForm.institution || !eduForm.period) {
      if (onShowToast) onShowToast('Degree, Institution, and Period are required.', 'error');
      return;
    }

    try {
      if (editingEduId) {
        const res = await api.put(`/profile/education/${editingEduId}`, eduForm);
        if (res.data.success) {
          if (onShowToast) onShowToast('Education updated successfully', 'success');
          setEducation(prev => prev.map(eItem => eItem._id === editingEduId ? res.data.education : eItem));
          setEditingEduId(null);
        }
      } else {
        const res = await api.post('/profile/education', eduForm);
        if (res.data.success) {
          if (onShowToast) onShowToast('Education entry added successfully', 'success');
          setEducation(prev => [res.data.education, ...prev]);
        }
      }
      setEduForm({ degree: '', institution: '', period: '', description: '', highlights: '' });
    } catch (err) {
      if (onShowToast) onShowToast('Failed to save education.', 'error');
    }
  };

  // Handle Delete Education
  const handleDeleteEducation = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      const res = await api.delete(`/profile/education/${id}`);
      if (res.data.success) {
        setEducation(prev => prev.filter(eItem => eItem._id !== id));
        if (onShowToast) onShowToast('Education entry deleted', 'success');
      }
    } catch (err) {
      if (onShowToast) onShowToast('Failed to delete education entry.', 'error');
    }
  };

  // Handle Skill Save
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;
    try {
      if (editingSkillId) {
        const res = await api.put(`/skills/${editingSkillId}`, newSkill);
        if (res.data.success) {
          if (onShowToast) onShowToast('Skill updated successfully', 'success');
          setSkills(prev => prev.map(s => s._id === editingSkillId ? res.data.skill : s));
          setEditingSkillId(null);
        }
      } else {
        const res = await api.post('/skills', newSkill);
        if (res.data.success) {
          if (onShowToast) onShowToast('Skill added successfully', 'success');
          setSkills(prev => [...prev, res.data.skill]);
        }
      }
      setNewSkill({ name: '', category: 'Frontend', proficiency: 85 });
    } catch (err) {
      if (onShowToast) onShowToast('Failed to save skill.', 'error');
    }
  };

  // Handle Skill Delete
  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      const res = await api.delete(`/skills/${id}`);
      if (res.data.success) {
        setSkills(prev => prev.filter(s => s._id !== id));
        if (onShowToast) onShowToast('Skill deleted', 'success');
      }
    } catch (err) {
      if (onShowToast) onShowToast('Failed to delete skill', 'error');
    }
  };

  // Handle Mark Message Read
  const handleMarkRead = async (id) => {
    try {
      const res = await api.put(`/contact/${id}/read`);
      if (res.data.success) {
        setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true } : m));
        setUnreadMsgCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {}
  };

  // Handle Delete Message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete message?')) return;
    try {
      const res = await api.delete(`/contact/${id}`);
      if (res.data.success) {
        setMessages(prev => prev.filter(m => m._id !== id));
        if (onShowToast) onShowToast('Message deleted', 'success');
      }
    } catch (err) {}
  };

  // Handle Save Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const res = await api.put('/profile', profileForm);
      if (res.data.success) {
        if (onShowToast) onShowToast('Profile settings updated successfully!', 'success');
        setProfile(res.data.profile);
      }
    } catch (err) {
      if (onShowToast) onShowToast('Failed to update profile.', 'error');
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Handle Save Admin Credentials (Username & Password)
  const handleSaveCredentials = async (e) => {
    e.preventDefault();
    setUpdatingCreds(true);
    try {
      const res = await api.put('/auth/credentials', credForm);
      if (res.data.success) {
        if (onShowToast) onShowToast('Admin login credentials updated successfully!', 'success');
        setCredForm(prev => ({ ...prev, newPassword: '' }));
      }
    } catch (err) {
      if (onShowToast) onShowToast(err.response?.data?.message || 'Failed to update credentials.', 'error');
    } finally {
      setUpdatingCreds(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <LoadingSpinner label="Loading Admin Dashboard..." />
      </div>
    );
  }

  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Admin Header */}
      <header style={{
        height: '70px',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Admin Management Portal</h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>User: {admin?.username || admin?.email}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Prominent + ADD PROJECT Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary"
            style={{ fontWeight: 700, padding: '0.55rem 1.15rem' }}
          >
            <Plus size={18} />
            <span>+ ADD PROJECT</span>
          </button>

          <Link to="/" className="btn btn-secondary btn-sm" title="View Public Site">
            <Home size={16} />
            <span className="desktop-only">Public Portfolio</span>
          </Link>

          <button onClick={logout} className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <LogOut size={16} />
            <span className="desktop-only">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <div className="container" style={{ flexGrow: 1, padding: '2rem 1.5rem' }}>
        {/* STATS OVERVIEW CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-primary)' }}>
              <FolderGit2 size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Total Projects</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{projects.length}</h3>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <Star size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Featured</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{featuredCount}</h3>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-secondary)' }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Education</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{education.length}</h3>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Code2 size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Total Skills</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{skills.length}</h3>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
              <Mail size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Messages</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{messages.length}</h3>
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION BAR */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('projects')}
            style={{
              padding: '0.75rem 1.15rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: activeTab === 'projects' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'projects' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FolderGit2 size={17} /> Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('education')}
            style={{
              padding: '0.75rem 1.15rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: activeTab === 'education' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'education' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <GraduationCap size={17} /> Education ({education.length})
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            style={{
              padding: '0.75rem 1.15rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: activeTab === 'skills' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'skills' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Code2 size={17} /> Skills ({skills.length})
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            style={{
              padding: '0.75rem 1.15rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: activeTab === 'messages' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'messages' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Mail size={17} /> Messages ({messages.length})
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '0.75rem 1.15rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: activeTab === 'profile' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'profile' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <User size={17} /> Profile
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            style={{
              padding: '0.75rem 1.15rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: activeTab === 'credentials' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'credentials' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Key size={17} /> Admin Login & Account
          </button>
        </div>

        {/* TAB 1: PROJECTS TAB CONTENT */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Projects ({projects.length})</h2>
              <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary btn-sm">
                <Plus size={16} /> + Add Project
              </button>
            </div>

            {projects.length > 0 ? (
              <div className="glass-card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '1rem' }}>Project</th>
                      <th style={{ padding: '1rem' }}>Category</th>
                      <th style={{ padding: '1rem' }}>Source</th>
                      <th style={{ padding: '1rem' }}>Technologies</th>
                      <th style={{ padding: '1rem' }}>Featured</th>
                      <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(project => (
                      <tr key={project._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={project.image} alt="" style={{ width: '45px', height: '35px', objectFit: 'cover', borderRadius: '4px' }} />
                          <div>
                            <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{project.title}</strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/{project.slug}</span>
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span className="badge">{project.category}</span>
                        </td>
                        <td style={{ padding: '1rem', textTransform: 'capitalize', color: 'var(--text-secondary)' }}>
                          {project.sourceType}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '250px' }}>
                            {project.technologies.slice(0, 3).map((t, i) => (
                              <span key={i} style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                                {t}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>+{project.technologies.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <button
                            onClick={() => handleToggleFeatured(project)}
                            style={{ color: project.featured ? '#f59e0b' : 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Star size={16} fill={project.featured ? '#f59e0b' : 'none'} />
                            <span>{project.featured ? 'Yes' : 'No'}</span>
                          </button>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <Link to={`/projects/${project.slug || project._id}`} target="_blank" className="btn btn-outline btn-sm" title="Preview Public Page">
                              <Eye size={14} />
                            </Link>
                            <button
                              onClick={() => handleDeleteProject(project._id, project.title)}
                              className="btn btn-outline btn-sm"
                              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                              title="Delete Project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <FolderGit2 size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                <h3>No Projects Yet</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Click below to add your first project using GitHub, ZIP, or Manual Entry.</p>
                <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
                  <Plus size={16} /> + Add Project Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EDUCATION MANAGEMENT TAB CONTENT */}
        {activeTab === 'education' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
            {/* Add / Edit Education Form */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                {editingEduId ? 'Edit Education Entry' : 'Add New Education Entry'}
              </h3>
              <form onSubmit={handleSaveEducation}>
                <div className="form-group">
                  <label className="form-label">Degree / Certificate *</label>
                  <input
                    type="text"
                    value={eduForm.degree}
                    onChange={(e) => setEduForm(prev => ({ ...prev, degree: e.target.value }))}
                    placeholder="e.g. B.Tech in Computer Science"
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Institution / University *</label>
                  <input
                    type="text"
                    value={eduForm.institution}
                    onChange={(e) => setEduForm(prev => ({ ...prev, institution: e.target.value }))}
                    placeholder="e.g. ABC Institute of Technology"
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Period / Duration *</label>
                  <input
                    type="text"
                    value={eduForm.period}
                    onChange={(e) => setEduForm(prev => ({ ...prev, period: e.target.value }))}
                    placeholder="e.g. 2022 - 2026"
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    rows="3"
                    value={eduForm.description}
                    onChange={(e) => setEduForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of course specialization or grades..."
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Key Highlights (One per line)</label>
                  <textarea
                    rows="3"
                    value={eduForm.highlights}
                    onChange={(e) => setEduForm(prev => ({ ...prev, highlights: e.target.value }))}
                    placeholder="High academic performance&#10;Lead full stack project developer"
                    className="form-control"
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    {editingEduId ? 'Update Entry' : 'Add Education Entry'}
                  </button>
                  {editingEduId && (
                    <button
                      type="button"
                      onClick={() => { setEditingEduId(null); setEduForm({ degree: '', institution: '', period: '', description: '', highlights: '' }); }}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Education List */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Education Background ({education.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {education.map(item => (
                  <div key={item._id} style={{
                    padding: '1.25rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'block' }}>{item.degree}</strong>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.institution}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', display: 'block', marginTop: '2px' }}>{item.period}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingEduId(item._id);
                            setEduForm({
                              degree: item.degree || '',
                              institution: item.institution || '',
                              period: item.period || '',
                              description: item.description || '',
                              highlights: Array.isArray(item.highlights) ? item.highlights.join('\n') : ''
                            });
                          }}
                          className="btn btn-outline btn-sm"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteEducation(item._id)}
                          className="btn btn-outline btn-sm"
                          style={{ color: '#ef4444' }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {item.description && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS TAB CONTENT */}
        {activeTab === 'skills' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                {editingSkillId ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <form onSubmit={handleSaveSkill}>
                <div className="form-group">
                  <label className="form-label">Skill Name *</label>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. React.js"
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                    className="form-control"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Tools">Tools</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Proficiency Level ({newSkill.proficiency}%)</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={newSkill.proficiency}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, proficiency: Number(e.target.value) }))}
                    className="form-control"
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    {editingSkillId ? 'Update Skill' : 'Add Skill'}
                  </button>
                  {editingSkillId && (
                    <button
                      type="button"
                      onClick={() => { setEditingSkillId(null); setNewSkill({ name: '', category: 'Frontend', proficiency: 85 }); }}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Managed Skills ({skills.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto' }}>
                {skills.map(skill => (
                  <div key={skill._id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div>
                      <strong style={{ fontSize: '0.95rem' }}>{skill.name}</strong>
                      <span className="badge" style={{ marginLeft: '0.75rem' }}>{skill.category}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{skill.proficiency}%</span>
                      <button
                        onClick={() => { setEditingSkillId(skill._id); setNewSkill({ name: skill.name, category: skill.category, proficiency: skill.proficiency }); }}
                        style={{ color: 'var(--text-secondary)' }}
                        title="Edit Skill"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill._id)}
                        style={{ color: '#ef4444' }}
                        title="Delete Skill"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MESSAGES TAB CONTENT */}
        {activeTab === 'messages' && (
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Contact Messages ({messages.length})
            </h2>

            {messages.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map(msg => (
                  <div key={msg._id} className="glass-card" style={{
                    padding: '1.5rem',
                    borderLeft: msg.isRead ? '4px solid var(--border-color)' : '4px solid var(--accent-primary)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{msg.name}</strong>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.75rem' }}>({msg.email})</span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '0.2rem', color: 'var(--accent-secondary)' }}>
                          Subject: {msg.subject}
                        </h4>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        {!msg.isRead && (
                          <button onClick={() => handleMarkRead(msg._id)} className="btn btn-outline btn-sm">
                            <CheckCircle size={14} /> Mark Read
                          </button>
                        )}
                        <button onClick={() => handleDeleteMessage(msg._id)} className="btn btn-outline btn-sm" style={{ color: '#ef4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <Mail size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                <h3>No Messages Received Yet</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Contact form submissions will appear here.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROFILE SETTINGS CONTENT */}
        {activeTab === 'profile' && (
          <div className="glass-card" style={{ padding: '2rem', maxWidth: '700px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Developer Profile Settings</h2>

            <form onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Headline / Subtitle</label>
                <input
                  type="text"
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, headline: e.target.value }))}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hero Bio Summary</label>
                <textarea
                  rows="3"
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                  className="form-control"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Contact Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, location: e.target.value }))}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">GitHub Profile URL</label>
                <input
                  type="text"
                  value={profileForm.githubUrl}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={profileForm.linkedinUrl}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                  placeholder="https://www.linkedin.com/in/parthiv-reddy-1608a33a3"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Resume URL / Link</label>
                <input
                  type="text"
                  value={profileForm.resumeUrl}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, resumeUrl: e.target.value }))}
                  placeholder="/resume.pdf or https://drive.google.com/..."
                  className="form-control"
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.35rem' }}>
                  Default is <code>/resume.pdf</code>. You can also upload your own resume PDF file below:
                </span>
              </div>

              {/* Upload New Resume PDF File */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px dashed var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                marginBottom: '1.25rem'
              }}>
                <label className="form-label" style={{ marginBottom: '0.5rem' }}>Upload Custom Resume (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append('resumeFile', file);
                    try {
                      const res = await api.post('/profile/resume', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                      });
                      if (res.data.success) {
                        setProfileForm(prev => ({ ...prev, resumeUrl: '/resume.pdf' }));
                        if (onShowToast) onShowToast('Resume PDF uploaded successfully!', 'success');
                      }
                    } catch (err) {
                      if (onShowToast) onShowToast(err.response?.data?.message || 'Failed to upload PDF resume.', 'error');
                    }
                  }}
                  style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}
                />
              </div>

              <button type="submit" disabled={updatingProfile} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                {updatingProfile ? 'Saving...' : 'Save Profile Settings'}
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: ADMIN ACCOUNT CREDENTIALS */}
        {activeTab === 'credentials' && (
          <div className="glass-card" style={{ padding: '2rem', maxWidth: '550px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Admin Credentials</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Update your admin username, login email, or change password.
            </p>

            <form onSubmit={handleSaveCredentials}>
              <div className="form-group">
                <label className="form-label">Admin Username</label>
                <input
                  type="text"
                  value={credForm.username}
                  onChange={(e) => setCredForm(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="e.g. parthiv"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Admin Login Email</label>
                <input
                  type="email"
                  value={credForm.email}
                  onChange={(e) => setCredForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@developer.com"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password (leave blank to keep current)</label>
                <input
                  type="password"
                  value={credForm.newPassword}
                  onChange={(e) => setCredForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="••••••••"
                  className="form-control"
                />
              </div>

              <button type="submit" disabled={updatingCreds} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                {updatingCreds ? 'Updating...' : 'Update Admin Credentials'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Add Project Modal Popup */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProjectSaved={(newProj) => {
          setProjects(prev => [newProj, ...prev]);
        }}
        onShowToast={onShowToast}
      />
    </div>
  );
};

export default AdminDashboardPage;
