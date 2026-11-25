const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Protected admin routes
router.post('/', protect, adminOnly, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

module.exports = router;
