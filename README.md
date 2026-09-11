# Personal Developer Portfolio + Project Management System

A production-ready, highly aesthetic Developer Portfolio website integrated with an **Owner/Admin Project Management System** for **Parthiv Reddy**. Built with the MERN stack (MongoDB, Express, React, Node.js) and Vite.

---

## Key Updates & Features

### 🌟 Public Developer Portfolio
- **Hero Section**: Clean centered introduction for **Parthiv Reddy** ("Hi, I'm Parthiv Reddy - B.Tech Student | Full Stack Developer"), featuring call-to-action buttons (*View Projects*, *Download Resume*, *Contact Me*) and social media links. (Photo section removed for clean presentation).
- **About Section**: Professional summary highlighting academic status, full-stack interests (React, Node.js, Express, MongoDB), problem-solving skills, and a continuous learning mindset.
- **Skills Section**: Dynamically loaded from MongoDB, organized by categories (Frontend, Backend, Database, Tools, Other).
- **Projects Section**: Displays projects from MongoDB with category filter tabs, search functionality, technology badges, live demo, code, and details buttons. Starts with a clean state so you can add your custom projects!
- **Dedicated Project Details Page**: Deep dive into project architecture, problem statement, key features, and technology stack.
- **Education Section**: Dynamic timeline of academic background (fully editable from the Admin Dashboard).
- **Contact System**: Validated contact form saving messages directly into MongoDB with rate limiting protection.
- **Dark / Light Theme**: Instant dark/light mode toggle with state saved in `localStorage`.

---

### 👑 Owner/Admin Project Management System
- **Route**: `/admin/login` -> `/admin/dashboard`
- **Flexible Admin Authentication**: Sign in using either your **username** (`parthiv`) or **email** (`admin@developer.com`).
- **Admin Credentials**:
  - **Username**: `parthiv`
  - **Email**: `admin@developer.com`
  - **Password**: `AdminPass123!`
- **Account Credentials Management**: Easily update your Admin Username, Email, and Password directly from the Admin Dashboard!
- **Education Management**: Add, edit, and delete education entries directly from the Admin Dashboard.
- **Prominent `+ ADD PROJECT` Feature**:
  1. **GitHub Repository Import**: Server-side fetching of public repository details (title, description, language, topics, stars) and `README.md` features.
  2. **ZIP Upload Analysis**: Safe, isolated file upload via Multer and `adm-zip` that inspects `package.json`, `README.md`, `requirements.txt`, and `pom.xml` to auto-detect technologies without executing untrusted code.
  3. **Manual Entry**: Complete project creation form with image upload support and featured project toggle.

---

## Quick Start & Local Running

Backend Server (Port 5000):
```bash
cd server
npm start
```

Frontend Dev Server (Port 3000):
```bash
cd client
npm run dev
```

Open `http://localhost:3000` in your browser!
