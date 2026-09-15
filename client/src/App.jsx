import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Toast from './components/common/Toast';

import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import InteractiveBackground from './components/common/InteractiveBackground';

function App() {
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 4000);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <InteractiveBackground />
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ message: '', type: 'success' })}
          />
          <Routes>
            <Route path="/" element={<HomePage onShowToast={showToast} />} />
            <Route path="/projects/:idOrSlug" element={<ProjectDetailPage />} />
            <Route path="/admin/login" element={<AdminLoginPage onShowToast={showToast} />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage onShowToast={showToast} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
