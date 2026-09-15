import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import EducationSection from '../components/portfolio/EducationSection';
import ContactSection from '../components/portfolio/ContactSection';
import api from '../services/api';

const defaultProfile = {
  fullName: 'Lella Parthiv Reddy',
  headline: 'B.Tech CS Student (CGPA: 8.0) | Full Stack & Python Developer',
  bio: 'Highly motivated B.Tech student specializing in Computer Science at VFSTR. Experienced in building modern full-stack web applications and data-driven systems using React, Node.js, Python & MongoDB.',
  aboutParagraphs: [
    "Hello! I am Lella Parthiv Reddy, a Computer Science & Engineering student at Vignan Foundation for Science Research and Technology (VFSTR), India (CGPA: 8.0/10).",
    "I am passionate about Python programming, full-stack web development, and intelligent system development. My primary technical stack includes React.js, Node.js, Express, MongoDB, and Django.",
    "Seeking an internship or entry-level software role to apply my technical skills, contribute to innovative real-world projects, and continuously grow as an engineer."
  ],
  email: 'parthivlella@gmail.com',
  githubUrl: 'https://github.com/parthivlella-ai',
  linkedinUrl: 'https://www.linkedin.com/in/parthiv-reddy-1608a33a3',
  resumeUrl: '/resume.pdf',
  location: 'Chilakaluripet, Palnadu, Andhra Pradesh, India'
};

const defaultProjects = [
  {
    _id: 'default-chat-app',
    title: 'Real-Time Chat Application',
    slug: 'real-time-chat-app',
    shortDescription: 'Modern real-time messaging application deployed on Vercel.',
    fullDescription: 'A feature-rich real-time communication platform designed for instant messaging and seamless online collaboration. Built with React and Node.js backend services, featuring instant message dispatching, user session security, and dark theme UI.',
    problemStatement: 'Providing lightweight, fast, and responsive real-time messaging without complex desktop installation.',
    features: [
      'Instant messaging with real-time web socket connections',
      'Secure user authentication and chat room management',
      'Responsive UI optimized for desktop and mobile devices',
      'Deployed live on Vercel cloud hosting'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Vercel'],
    githubUrl: 'https://github.com/parthivlella-ai/chat-application-',
    liveUrl: 'https://chat-application-navy-chi.vercel.app/',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80',
    category: 'Full Stack',
    featured: true,
    stars: 12
  },
  {
    _id: 'default-file-storage',
    title: 'Cloud File Storage Application',
    slug: 'cloud-file-storage-app',
    shortDescription: 'Full-stack cloud file management application deployed on Vercel.',
    fullDescription: 'A complete web file management system allowing users to securely upload, categorize, preview, and share documents online. Built with a React frontend and Express backend, featuring extension validation and storage analytics.',
    problemStatement: 'User-friendly cloud document management with fast access and file categorization.',
    features: [
      'Secure document upload and folder categorization',
      'Search and filter files by name and file extension',
      'Storage analytics and direct document download links',
      'Deployed live on Vercel cloud hosting'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Multer', 'Vercel'],
    githubUrl: 'https://github.com/parthivlella-ai/File-storage',
    liveUrl: 'https://file-storage-omega-three.vercel.app/',
    image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&w=1200&q=80',
    category: 'Full Stack',
    featured: true,
    stars: 15
  }
];

const defaultSkills = {
  Frontend: [
    { name: 'HTML5 / CSS3', category: 'Frontend', proficiency: 95 },
    { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 85 },
    { name: 'React.js', category: 'Frontend', proficiency: 88 }
  ],
  Backend: [
    { name: 'Python Programming', category: 'Backend', proficiency: 92 },
    { name: 'Django Framework', category: 'Backend', proficiency: 88 },
    { name: 'Node.js & Express.js', category: 'Backend', proficiency: 85 },
    { name: 'Java Programming', category: 'Backend', proficiency: 78 },
    { name: 'C Programming', category: 'Backend', proficiency: 80 }
  ],
  Database: [
    { name: 'SQL / Databases', category: 'Database', proficiency: 82 },
    { name: 'MongoDB & Mongoose', category: 'Database', proficiency: 85 }
  ],
  Tools: [
    { name: 'Git & GitHub', category: 'Tools', proficiency: 85 },
    { name: 'VS Code & Postman', category: 'Tools', proficiency: 90 }
  ],
  Other: [
    { name: 'Data Science & ML', category: 'Other', proficiency: 80 },
    { name: 'Socket.IO & JWT', category: 'Other', proficiency: 84 }
  ]
};

const defaultEducation = [
  {
    _id: 'edu-1',
    degree: 'B.Tech in Computer Science and Engineering (CGPA: 8.0 / 10)',
    institution: 'Vignan Foundation for Science Research and Technology (VFSTR)',
    period: '2024 – 2028 (Pursuing)',
    description: 'Specializing in Computer Science & Engineering, Web Development, Data Structures, and System Design.',
    highlights: [
      'Maintained high academic standing with CGPA: 8.0 / 10',
      'Specializing in Python programming, full stack web apps, and data science',
      'Active developer building production React & Node.js web applications'
    ],
    order: 1
  },
  {
    _id: 'edu-2',
    degree: 'Intermediate – MPC (Mathematics, Physics, Chemistry) | 94%',
    institution: 'Sri Chaitanya Junior College',
    period: '2022 – 2024',
    description: 'Completed Senior Secondary Education with distinction in Mathematics, Physics, and Chemistry.',
    highlights: [
      'Secured 94% aggregate score in Board examinations'
    ],
    order: 2
  },
  {
    _id: 'edu-3',
    degree: 'SSC (10th Grade) | 91%',
    institution: 'Modern Stellar, Chilakaluripet',
    period: '2021 – 2022',
    description: 'Completed Secondary School Certificate with outstanding academic achievements.',
    highlights: [
      'Secured 91% aggregate score in SSC Board examinations'
    ],
    order: 3
  }
];

const HomePage = ({ onShowToast }) => {
  const [profile, setProfile] = useState(defaultProfile);
  const [education, setEducation] = useState(defaultEducation);
  const [categorizedSkills, setCategorizedSkills] = useState(defaultSkills);
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [profRes, skillRes, projRes] = await Promise.allSettled([
          api.get('/profile'),
          api.get('/skills'),
          api.get('/projects')
        ]);

        if (profRes.status === 'fulfilled' && profRes.value.data?.success && profRes.value.data?.profile) {
          setProfile(profRes.value.data.profile);
          if (profRes.value.data.education && profRes.value.data.education.length > 0) {
            setEducation(profRes.value.data.education);
          }
        }

        if (skillRes.status === 'fulfilled' && skillRes.value.data?.success && skillRes.value.data?.categorized) {
          setCategorizedSkills(skillRes.value.data.categorized);
        }

        if (projRes.status === 'fulfilled' && projRes.value.data?.success && projRes.value.data?.projects && projRes.value.data.projects.length > 0) {
          setProjects(projRes.value.data.projects);
        }
      } catch (err) {
        console.warn('Using default portfolio data:', err);
      }
    };

    fetchPortfolioData();
  }, []);

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
