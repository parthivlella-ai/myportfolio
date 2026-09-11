import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import EducationSection from '../components/portfolio/EducationSection';
import ContactSection from '../components/portfolio/ContactSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../services/api';

const HomePage = ({ onShowToast }) => {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [categorizedSkills, setCategorizedSkills] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const [profRes, skillRes, projRes] = await Promise.all([
          api.get('/profile'),
          api.get('/skills'),
          api.get('/projects')
        ]);

        if (profRes.data.success) {
          setProfile(profRes.data.profile);
          setEducation(profRes.data.education || []);
        }

        if (skillRes.data.success) {
          setCategorizedSkills(skillRes.data.categorized);
        }

        if (projRes.data.success) {
          setProjects(projRes.data.projects);
        }
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <LoadingSpinner label="Loading Developer Portfolio..." />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Navbar profile={profile} />

      <main style={{ flexGrow: 1 }}>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection categorizedSkills={categorizedSkills} />
        <ProjectsSection projects={projects} />
        <EducationSection educationList={education} />
        <ContactSection profile={profile} onShowToast={onShowToast} />
      </main>

      <Footer profile={profile} />
    </div>
  );
};

export default HomePage;
