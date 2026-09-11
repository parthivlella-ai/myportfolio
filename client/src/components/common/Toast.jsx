import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-sm font-medium transition-all transform animate-fade-in ${
      isSuccess ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-800' : 'bg-rose-950/90 text-rose-200 border border-rose-800'
    }`} style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 18px',
      borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      fontSize: '0.9rem',
      fontWeight: '500',
      background: isSuccess ? 'rgba(6, 78, 59, 0.95)' : 'rgba(136, 19, 55, 0.95)',
      color: isSuccess ? '#a7f3d0' : '#fecdd3',
      border: `1px solid ${isSuccess ? '#059669' : '#e11d48'}`,
      backdropFilter: 'blur(8px)'
    }}>
      {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      <span>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'inherit', marginLeft: '8px', cursor: 'pointer' }}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
