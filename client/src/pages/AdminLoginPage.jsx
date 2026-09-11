import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, Loader2, ShieldCheck, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = ({ onShowToast }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@developer.com');
  const [password, setPassword] = useState('AdminPass123!');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      if (onShowToast) onShowToast('Please provide both email and password', 'error');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      if (onShowToast) onShowToast('Login successful! Welcome Admin.', 'success');
      navigate('/admin/dashboard');
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Invalid credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'var(--bg-primary)',
      position: 'relative'
    }}>
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'var(--accent-glow)',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: '440px' }}>
        <Link to="/" className="btn btn-outline btn-sm" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <div className="glass-card" style={{ padding: '2.5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              margin: '0 auto 1rem auto',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <ShieldCheck size={28} />
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>Admin Portal</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Sign in to manage projects, skills, messages, and profile.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@developer.com"
                  required
                  className="form-control"
                  style={{ paddingLeft: '42px' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Key size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="form-control"
                  style={{ paddingLeft: '42px' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock size={18} />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Seed Credentials Box */}
          <div style={{
            marginTop: '1.75rem',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
              🔑 Seed Admin Credentials:
            </strong>
            Email: <code style={{ color: 'var(--accent-primary)' }}>admin@developer.com</code><br/>
            Password: <code style={{ color: 'var(--accent-primary)' }}>AdminPass123!</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
