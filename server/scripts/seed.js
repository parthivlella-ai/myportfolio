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
        shortDescription: 'Modern real-time messaging application deployed on Vercel with WebSocket support.',
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
        shortDescription: 'Full-stack cloud file management application deployed on Vercel with secure uploads.',
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
      },
      {
        title: 'RESTful Task & Todo Management API',
        slug: 'restful-task-todo-api',
        shortDescription: 'Scalable RESTful API with full CRUD endpoints for task management built using Express.js.',
        fullDescription: 'A clean, performant RESTful API server engineered with Node.js and Express.js demonstrating full CRUD (Create, Read, Update, Delete) resource management, HTTP status code semantics, JSON request validation, and modular route handling.',
        problemStatement: 'Designing standard REST API endpoints for seamless cross-client task synchronization and data management.',
        features: [
          'Complete RESTful CRUD lifecycle (GET, POST, PUT, DELETE)',
          'Payload validation and structured JSON error responses',
          'Standardized HTTP response status codes (200, 201, 404, 500)',
          'Tested and verified via Postman API testing suites'
        ],
        technologies: ['Node.js', 'Express.js', 'REST API', 'JavaScript', 'Postman'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment%201%20fsd',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=80',
        category: 'Backend',
        featured: false,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment%201%20fsd',
        stars: 6
      },
      {
        title: 'Express Custom Middleware & Auth Guard',
        slug: 'express-middleware-auth-guard',
        shortDescription: 'Modular request logger, authorization header guards, and centralized error pipeline in Express.',
        fullDescription: 'An architectural showcase of Express.js middleware chaining. Includes timestamped request logging, token-based authorization verification headers for protecting administrative routes, and centralized application error handling.',
        problemStatement: 'Intercepting, inspecting, and filtering HTTP traffic securely before reaching business logic controllers.',
        features: [
          'Custom request logger tracking method, URL, and execution timestamps',
          'Header-based Authorization token guard for route protection',
          'Centralized catch-all error handling middleware',
          'Modular middleware pipeline execution order demonstration'
        ],
        technologies: ['Node.js', 'Express.js', 'Middleware', 'Security', 'REST API'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experinent-2%20fsd',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        category: 'Backend',
        featured: false,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experinent-2%20fsd',
        stars: 8
      },
      {
        title: 'JWT Authentication & Password Security Service',
        slug: 'jwt-auth-password-security-service',
        shortDescription: 'Secure authentication microservice featuring Bcrypt salt hashing and JSON Web Tokens (JWT).',
        fullDescription: 'Production-ready user authentication workflow implementing salt rounds password encryption with Bcrypt and stateless Bearer token generation via JSON Web Tokens (JWT). Features guarded private dashboard endpoints with token verification.',
        problemStatement: 'Securing user credentials and maintaining stateless, tamper-proof user sessions across web applications.',
        features: [
          'Secure user registration with 10-round salted Bcrypt password hashing',
          'JSON Web Token (JWT) issuance with configured expiration',
          'Bearer token extraction and verification middleware',
          'Protected private dashboard route with user context injection'
        ],
        technologies: ['Node.js', 'Express.js', 'JWT', 'Bcrypt', 'Authentication', 'Security'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment-3fsd',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        category: 'Backend',
        featured: true,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment-3fsd',
        stars: 11
      },
      {
        title: 'Native Node.js HTTP Server CRUD Engine',
        slug: 'native-nodejs-http-server-engine',
        shortDescription: 'Low-level RESTful API engineered purely with native Node.js HTTP module and data stream parsing.',
        fullDescription: 'Deep dive into Node.js core architecture by building a complete RESTful CRUD server without any third-party framework like Express. Leverages core http module, manual URL chunk parsing, stream buffering, and HTTP header controls.',
        problemStatement: 'Mastering raw Node.js internals and event-driven HTTP request/response stream processing without frameworks.',
        features: [
          'Pure Node.js core http module implementation without external dependencies',
          'Manual request body buffer streaming and JSON parsing',
          'Dynamic RESTful URL route matching and parameter extraction',
          'Custom status codes and Content-Type header dispatching'
        ],
        technologies: ['Node.js Core', 'HTTP Module', 'Streams', 'JavaScript', 'Low-Level API'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment-4%20fsd',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        category: 'Backend',
        featured: false,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment-4%20fsd',
        stars: 9
      },
      {
        title: 'Asynchronous Weather API & MongoDB Service',
        slug: 'async-weather-mongodb-service',
        shortDescription: 'Multi-paradigm async weather integration using Callbacks, Promises, and Async/Await with Mongoose storage.',
        fullDescription: 'Comprehensive backend service that interacts with OpenWeatherMap API while demonstrating all three asynchronous JavaScript programming models (Callbacks, Promises, Async/Await). Persists live meteorological readings directly into MongoDB using Mongoose schemas.',
        problemStatement: 'Handling asynchronous third-party REST API integrations reliably and persisting historical telemetry data.',
        features: [
          'Triple asynchronous paradigm implementation (Callbacks, Promises, Async/Await)',
          'Live OpenWeatherMap third-party REST API integration',
          'Mongoose schema modeling for historical weather data storage',
          'MongoDB database connection and document persistence'
        ],
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Axios', 'OpenWeatherMap API'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment-5%20fsd',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&q=80',
        category: 'Full Stack',
        featured: true,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment-5%20fsd',
        stars: 14
      },
      {
        title: 'Express Enterprise Error Handling System',
        slug: 'express-error-handling-system',
        shortDescription: 'Production-grade centralized error dispatching and custom exception handling architecture in Express.',
        fullDescription: 'An enterprise-grade error management setup for Express.js APIs. Implements four-argument error middleware, custom error constructors, stack trace logging, and standardized client-facing error schemas avoiding sensitive data leaks.',
        problemStatement: 'Preventing unhandled server crashes and delivering uniform, sanitized error responses to API clients.',
        features: [
          'Centralized four-argument error interceptor middleware (err, req, res, next)',
          'Uniform JSON error payload response structure',
          'Secure error formatting preventing sensitive server trace leaks in production',
          'Synchronous and asynchronous route exception forwarding'
        ],
        technologies: ['Node.js', 'Express.js', 'Error Handling', 'Architecture', 'REST API'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment-7',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
        category: 'Backend',
        featured: false,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment-7',
        stars: 7
      },
      {
        title: 'Node.js File System I/O Performance Suite',
        slug: 'nodejs-fs-sync-vs-async',
        shortDescription: 'Comparative benchmarking tool contrasting blocking synchronous vs non-blocking asynchronous file I/O in Node.js.',
        fullDescription: 'Exploratory tool and benchmark suite demonstrating how the Node.js event loop processes file operations. Contrasts synchronous blocking execution (fs.readFileSync) with non-blocking callback-driven asynchronous streaming (fs.readFile) under load.',
        problemStatement: 'Understanding thread-blocking pitfalls of synchronous I/O in high-concurrency Node.js servers.',
        features: [
          'Side-by-side execution analysis of fs.readFileSync vs fs.readFile',
          'Event loop non-blocking behavior demonstration',
          'Error handling for file I/O operations and missing descriptors',
          'Buffer and string character encoding conversions'
        ],
        technologies: ['Node.js', 'fs (File System)', 'Event Loop', 'Asynchronous I/O', 'Performance'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment%20-9%20fsd',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
        category: 'Tool',
        featured: false,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/experiment%20-9%20fsd',
        stars: 5
      },
      {
        title: 'Node.js Event Loop & Async Architecture Pipeline',
        slug: 'nodejs-event-loop-architecture',
        shortDescription: 'Deep dive investigation into Node.js libuv event loop phases, microtasks, timers, and non-blocking I/O.',
        fullDescription: 'Architectural exploration of Node.js event-driven runtime environment, libuv event loop phases (Timers, Poll, Check, Close), nextTick and Promise microtask priorities, and asynchronous event emitter communication.',
        problemStatement: 'Demystifying concurrency, call stack execution order, and microtask queues in Node.js single-threaded runtime.',
        features: [
          'Detailed analysis of libuv event loop phases and scheduling',
          'Microtask vs Macrotask queue prioritization benchmarks',
          'Custom EventEmitters and listener lifecycle handling',
          'Memory-efficient asynchronous concurrency patterns'
        ],
        technologies: ['Node.js', 'libuv', 'Event Loop', 'Architecture', 'Async JavaScript'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        category: 'Backend',
        featured: false,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main',
        stars: 10
      },
      {
        title: 'React Dynamic Product Catalog Showcase',
        slug: 'react-dynamic-product-catalog',
        shortDescription: 'Interactive React product catalog with props-driven component composition and responsive card grid.',
        fullDescription: 'Modern frontend application built with React demonstrating component reusability, one-way data binding, dynamic array mapping, responsive product showcase cards, and currency formatting.',
        problemStatement: 'Building responsive, modular, and reusable e-commerce UI components that handle dynamic inventory lists.',
        features: [
          'Reusable component hierarchy with parent-to-child props passing',
          'Dynamic array mapping for product items with key optimization',
          'Responsive multi-column CSS grid layout',
          'Dynamic image loading and price calculation utilities'
        ],
        technologies: ['React.js', 'JavaScript (ES6+)', 'CSS3', 'Component Architecture', 'UI/UX'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/react/exp-11',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        category: 'Frontend',
        featured: false,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/react/exp-11',
        stars: 8
      },
      {
        title: 'React Live User Directory & REST Consumer',
        slug: 'react-user-directory-app',
        shortDescription: 'Data-driven React application consuming external REST API with asynchronous state lifecycle and table UI.',
        fullDescription: 'A responsive React web app demonstrating asynchronous API fetching using the Fetch API and React\'s useEffect hook. Dynamically retrieves user records from JSONPlaceholder, handles loading and error states, and renders organized user profile records.',
        problemStatement: 'Consuming and presenting external remote API datasets reliably within a modern React user interface.',
        features: [
          'Asynchronous data fetching with React useEffect & useState hooks',
          'External REST API consumption from JSONPlaceholder',
          'Structured tabular presentation with customized table styling',
          'Graceful error capture and responsive container scaling'
        ],
        technologies: ['React.js', 'Fetch API', 'Hooks (useState, useEffect)', 'REST API', 'CSS3'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/react%2014/exp-14',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        category: 'Frontend',
        featured: false,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/react%2014/exp-14',
        stars: 7
      },
      {
        title: 'Live City Weather Forecast React App',
        slug: 'react-weather-forecast-app',
        shortDescription: 'Real-time reactive weather client built with React and Vite consuming OpenWeatherMap API.',
        fullDescription: 'Interactive frontend weather application powered by React and Vite. Allows users to query any global city in real-time to obtain instant meteorological metrics including temperature, atmospheric conditions, and localized weather descriptions.',
        problemStatement: 'Delivering instantaneous, responsive meteorological data updates based on dynamic user search queries.',
        features: [
          'Dynamic city search query input with reactive state updates',
          'Real-time OpenWeatherMap API query dispatching',
          'Metric units temperature calculation and condition display',
          'Clean, minimal, high-contrast user interface'
        ],
        technologies: ['React.js', 'Vite', 'OpenWeatherMap API', 'JavaScript', 'CSS3'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/react%2015/exp-15',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80',
        category: 'Frontend',
        featured: true,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/react%2015/exp-15',
        stars: 12
      },
      {
        title: 'Full Stack Book Management Application',
        slug: 'fullstack-book-management-app',
        shortDescription: 'End-to-end full stack web app with React Vite frontend, Express REST API backend, and CORS communication.',
        fullDescription: 'A complete Full Stack application comprising a modern React Vite frontend and an Express.js REST API backend. Implements full cross-origin resource sharing (CORS), stateful book catalogue management, and reactive POST addition workflows.',
        problemStatement: 'Connecting decoupled single-page React frontend clients with standalone Node.js REST API servers.',
        features: [
          'Decoupled client-server architecture with CORS cross-origin configuration',
          'Live book catalog retrieval and dynamic creation via POST requests',
          'Instant UI synchronization on new record submissions',
          'Production-ready folder structure separating client and server codebases'
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'CORS', 'Vite', 'REST API'],
        githubUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/exp%2016',
        liveUrl: '',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        category: 'Full Stack',
        featured: true,
        sourceType: 'github',
        sourceUrl: 'https://github.com/parthivlella-ai/fsd-projects/tree/main/exp%2016',
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
