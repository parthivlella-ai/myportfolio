require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const contactRoutes = require('./routes/contactRoutes');
const importRoutes = require('./routes/importRoutes');

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files static directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/import', importRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Personal Developer Portfolio API'
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect Database and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 Portfolio API Server running on port ${PORT}`);
    console.log(`🌍 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`==================================================`);
  });
});
