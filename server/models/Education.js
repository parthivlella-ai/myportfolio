const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    period: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    highlights: [
      { type: String }
    ],
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
