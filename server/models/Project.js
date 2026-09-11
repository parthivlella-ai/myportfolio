const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required']
    },
    fullDescription: {
      type: String,
      default: ''
    },
    problemStatement: {
      type: String,
      default: ''
    },
    features: [
      { type: String }
    ],
    technologies: [
      { type: String, required: true }
    ],
    githubUrl: {
      type: String,
      default: ''
    },
    liveUrl: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
    },
    category: {
      type: String,
      enum: ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Tool', 'Other'],
      default: 'Full Stack'
    },
    featured: {
      type: Boolean,
      default: false
    },
    sourceType: {
      type: String,
      enum: ['github', 'zip', 'manual'],
      default: 'manual'
    },
    sourceUrl: {
      type: String,
      default: ''
    },
    stars: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
