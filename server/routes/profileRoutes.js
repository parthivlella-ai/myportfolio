const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  createEducation,
  updateEducation,
  deleteEducation,
  uploadResumeFile
} = require('../controllers/profileController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { uploadResume } = require('../middleware/fileUpload');

router.get('/', getProfile);

// Protected Admin Routes for Profile & Education
router.put('/', protectAdmin, updateProfile);
router.post('/resume', protectAdmin, uploadResume.single('resumeFile'), uploadResumeFile);
router.post('/education', protectAdmin, createEducation);
router.put('/education/:id', protectAdmin, updateEducation);
router.delete('/education/:id', protectAdmin, deleteEducation);

module.exports = router;

