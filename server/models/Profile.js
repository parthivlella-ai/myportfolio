const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: 'Lella Parthiv Reddy'
    },
    headline: {
      type: String,
      default: 'B.Tech CS Student (CGPA: 8.0) | Full Stack & Python Developer'
    },
    bio: {
      type: String,
      default: 'Highly motivated B.Tech student specializing in Computer Science at VFSTR. Experienced in building modern full-stack web applications and data-driven systems using React, Node.js, Python & MongoDB.'
    },
    aboutParagraphs: [
      { type: String }
    ],
    avatar: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: 'parthivlella@gmail.com'
    },
    githubUrl: {
      type: String,
      default: 'https://github.com/parthivlella-ai'
    },
    linkedinUrl: {
      type: String,
      default: 'https://www.linkedin.com/in/parthiv-reddy-1608a33a3'
    },
    resumeUrl: {
      type: String,
      default: '#'
    },
    location: {
      type: String,
      default: 'Chilakaluripet, Palnadu, Andhra Pradesh, India'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
