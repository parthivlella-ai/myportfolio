import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ label = 'Loading...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem',
      gap: '1rem',
      color: 'var(--text-secondary)'
    }}>
      <Loader2 size={32} className="animate-spin" style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-primary)' }} />
      <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{label}</span>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
