const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
      required: [true, 'Category is required']
    },
    icon: {
      type: String,
      default: 'Code'
    },
    proficiency: {
      type: Number,
      min: 1,
      max: 100,
      default: 80
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
