require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const { connectDB, closeDB } = require('../config/db');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const ContactMessage = require('../models/ContactMessage');

const seedData = async () => {
  try {
    await connectDB();
    console.log('[Seed] Clearing existing collections...');

    await User.deleteMany({});
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await ContactMessage.deleteMany({});

    console.log('[Seed] Seeding Admin User...');
    await User.create({
      username: 'parthiv',
      email: 'parthivlella@gmail.com',
      password: 'AdminPass123!',
      role: 'admin'
    });
    console.log(`[Seed] Admin Created: username=parthiv, email=parthivlella@gmail.com, password=AdminPass123!`);

    console.log('[Seed] Seeding Developer Profile...');
    await Profile.create({
      fullName: 'Lella Parthiv Reddy',
      headline: 'B.Tech CS Student (CGPA: 8.0) | Full Stack & Python Developer',
      bio: 'Highly motivated B.Tech student specializing in Computer Science at VFSTR. Experienced in building modern full-stack web applications and data-driven systems using React, Node.js, Python & MongoDB.',
      aboutParagraphs: [
        "Hello! I am Lella Parthiv Reddy, a Computer Science & Engineering student at Vignan Foundation for Science Research and Technology (VFSTR), India (CGPA: 8.0/10).",
        "I am passionate about Python programming, full-stack web development, and intelligent system development. My primary technical stack includes React.js, Node.js, Express, MongoDB, and Django.",
        "Seeking an internship or entry-level software role to apply my technical skills, contribute to innovative real-world projects, and continuously grow as an engineer."
      ],
      avatar: '',
      email: 'parthivlella@gmail.com',
      githubUrl: 'https://github.com/parthivlella-ai',
      linkedinUrl: 'https://www.linkedin.com/in/parthiv-reddy-1608a33a3',
      resumeUrl: '/resume.pdf',
      location: 'Chilakaluripet, Palnadu, Andhra Pradesh, India'
    });

    console.log('[Seed] Seeding Resume Skills...');
    const skills = [
      // Frontend
      { name: 'HTML5 / CSS3', category: 'Frontend', icon: 'Layout', proficiency: 95, order: 1 },
      { name: 'JavaScript (ES6+)', category: 'Frontend', icon: 'FileCode', proficiency: 85, order: 2 },
      { name: 'React.js', category: 'Frontend', icon: 'Atom', proficiency: 88, order: 3 },
      
      // Backend & Languages
      { name: 'Python Programming', category: 'Backend', icon: 'Code', proficiency: 92, order: 4 },
      { name: 'Django Framework', category: 'Backend', icon: 'Zap', proficiency: 88, order: 5 },
      { name: 'Node.js & Express.js', category: 'Backend', icon: 'Server', proficiency: 85, order: 6 },
      { name: 'Java Programming', category: 'Backend', icon: 'Coffee', proficiency: 78, order: 7 },
      { name: 'C Programming', category: 'Backend', icon: 'Terminal', proficiency: 80, order: 8 },

      // Database
      { name: 'SQL / Databases', category: 'Database', icon: 'Database', proficiency: 82, order: 9 },
      { name: 'MongoDB & Mongoose', category: 'Database', icon: 'Layers', proficiency: 85, order: 10 },

      // Tools & AI
      { name: 'Git & GitHub', category: 'Tools', icon: 'GitBranch', proficiency: 85, order: 11 },
      { name: 'VS Code & Postman', category: 'Tools', icon: 'Terminal', proficiency: 90, order: 12 },
      { name: 'Data Science & ML', category: 'Other', icon: 'Cpu', proficiency: 80, order: 13 },
      { name: 'Socket.IO & JWT', category: 'Other', icon: 'Lock', proficiency: 84, order: 14 }
    ];

    await Skill.insertMany(skills);

    console.log('[Seed] Seeding Resume Education Entries...');
    await Education.create([
      {
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
        degree: 'SSC (10th Grade) | 91%',
        institution: 'Modern Stellar, Chilakaluripet',
        period: '2021 – 2022',
        description: 'Completed Secondary School Certificate with outstanding academic achievements.',
        highlights: [
          'Secured 91% aggregate score in SSC Board examinations'
        ],
        order: 3
      }
    ]);

    console.log('[Seed] Seeding Resume & Deployed Projects...');
    const projects = [
      {
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
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/chat-application-',
        stars: 12
      },
      {
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
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/File-storage',
        stars: 15
      }
    ];

    await Project.insertMany(projects);

    console.log('[Seed] Database seeding completed successfully for Lella Parthiv Reddy!');
    await closeDB();
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
