const Profile = require('../models/Profile');
const Education = require('../models/Education');

// @desc    Get public developer profile & education
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }

    const education = await Education.find().sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      profile,
      education
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update profile (Admin only)
// @route   PUT /api/profile
// @access  Private (Admin)
const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }

    await profile.save();

    res.json({
      success: true,
      profile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new Education entry (Admin)
// @route   POST /api/profile/education
// @access  Private (Admin)
const createEducation = async (req, res) => {
  try {
    const { degree, institution, period, description, highlights } = req.body;

    if (!degree || !institution || !period) {
      return res.status(400).json({ success: false, message: 'Degree, institution, and period are required.' });
    }

    const education = await Education.create({
      degree,
      institution,
      period,
      description: description || '',
      highlights: Array.isArray(highlights) ? highlights : (typeof highlights === 'string' ? highlights.split('\n').map(h => h.trim()).filter(Boolean) : [])
    });

    res.status(201).json({
      success: true,
      education,
      message: 'Education entry created successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Education entry (Admin)
// @route   PUT /api/profile/education/:id
// @access  Private (Admin)
const updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education entry not found' });
    }

    if (req.body.highlights && typeof req.body.highlights === 'string') {
      req.body.highlights = req.body.highlights.split('\n').map(h => h.trim()).filter(Boolean);
    }

    Object.assign(education, req.body);
    await education.save();

    res.json({
      success: true,
      education,
      message: 'Education entry updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete Education entry (Admin)
// @route   DELETE /api/profile/education/:id
// @access  Private (Admin)
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education entry not found' });
    }

    await Education.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Education entry deleted'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  createEducation,
  updateEducation,
  deleteEducation
};
