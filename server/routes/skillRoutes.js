const express = require('express');
const router = express.Router();
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/', getSkills);

// Protected Admin Routes
router.post('/', protectAdmin, createSkill);
router.put('/:id', protectAdmin, updateSkill);
router.delete('/:id', protectAdmin, deleteSkill);

module.exports = router;
