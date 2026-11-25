const slugify = require('slugify');
const Project = require('../models/Project');

/**
 * GET /api/projects
 * Get all projects. Optionally filter by ?category=MERN
 */
const getProjects = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/projects/:slug
 * Get single project by slug.
 */
const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      res.status(404);
      return next(new Error('Project not found'));
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/projects (Admin)
 * Create a new project.
 */
const createProject = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(400);
      return next(new Error('Title is required'));
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await Project.findOne({ slug });
    if (existing) {
      res.status(400);
      return next(new Error('A project with this title already exists'));
    }

    const project = await Project.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/projects/:id (Admin)
 * Update an existing project.
 */
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      return next(new Error('Project not found'));
    }

    // Regenerate slug if title changed
    if (req.body.title && req.body.title !== project.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/projects/:id (Admin)
 * Delete a project.
 */
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      return next(new Error('Project not found'));
    }
    await project.deleteOne();
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
