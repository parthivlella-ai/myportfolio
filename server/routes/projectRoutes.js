const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectByIdOrSlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/', getProjects);
router.get('/:idOrSlug', getProjectByIdOrSlug);

// Protected Admin Routes
router.post('/', protectAdmin, createProject);
router.put('/:id', protectAdmin, updateProject);
router.delete('/:id', protectAdmin, deleteProject);

module.exports = router;
