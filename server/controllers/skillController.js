const Skill = require('../models/Skill');

// @desc    Get all skills categorized
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, name: 1 });

    const categorized = {
      Frontend: [],
      Backend: [],
      Database: [],
      Tools: [],
      Other: []
    };

    skills.forEach(skill => {
      if (categorized[skill.category]) {
        categorized[skill.category].push(skill);
      } else {
        categorized.Other.push(skill);
      }
    });

    res.json({
      success: true,
      skills,
      categorized
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new skill (Admin)
// @route   POST /api/skills
// @access  Private (Admin)
const createSkill = async (req, res) => {
  try {
    const { name, category, icon, proficiency, order } = req.body;

    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Skill name and category are required' });
    }

    const skill = await Skill.create({
      name,
      category,
      icon: icon || 'Code',
      proficiency: proficiency || 80,
      order: order || 0
    });

    res.status(201).json({
      success: true,
      skill,
      message: 'Skill added successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update skill (Admin)
// @route   PUT /api/skills/:id
// @access  Private (Admin)
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    Object.assign(skill, req.body);
    await skill.save();

    res.json({
      success: true,
      skill,
      message: 'Skill updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete skill (Admin)
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    await Skill.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
};
