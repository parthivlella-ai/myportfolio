const Project = require('../models/Project');

// Helper to generate unique slug
const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// @desc    Get all projects (public)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    // Featured projects first, then newest
    const projects = await Project.find(filter).sort({ featured: -1, createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project by ID or Slug
// @route   GET /api/projects/:idOrSlug
// @access  Public
const getProjectByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let project = null;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(idOrSlug);
    }

    if (!project) {
      project = await Project.findOne({ slug: idOrSlug.toLowerCase() });
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new project (Admin)
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      fullDescription,
      problemStatement,
      features,
      technologies,
      githubUrl,
      liveUrl,
      image,
      category,
      featured,
      sourceType,
      sourceUrl,
      stars
    } = req.body;

    if (!title || !shortDescription) {
      return res.status(400).json({ success: false, message: 'Project title and short description are required' });
    }

    let baseSlug = createSlug(title);
    let slug = baseSlug;
    let count = 1;
    while (await Project.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const techArray = Array.isArray(technologies)
      ? technologies
      : (typeof technologies === 'string' ? technologies.split(',').map(t => t.trim()).filter(Boolean) : []);

    const project = await Project.create({
      title,
      slug,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      problemStatement: problemStatement || shortDescription,
      features: Array.isArray(features) ? features : [],
      technologies: techArray.length > 0 ? techArray : ['Full Stack'],
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      category: category || 'Full Stack',
      featured: Boolean(featured),
      sourceType: sourceType || 'manual',
      sourceUrl: sourceUrl || '',
      stars: stars ? Number(stars) : 0
    });

    res.status(201).json({
      success: true,
      project,
      message: 'Project created successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update project (Admin)
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (req.body.title && req.body.title !== project.title) {
      let baseSlug = createSlug(req.body.title);
      let slug = baseSlug;
      let count = 1;
      while (await Project.findOne({ slug, _id: { $ne: project._id } })) {
        slug = `${baseSlug}-${count++}`;
      }
      req.body.slug = slug;
    }

    if (req.body.technologies && typeof req.body.technologies === 'string') {
      req.body.technologies = req.body.technologies.split(',').map(t => t.trim()).filter(Boolean);
    }

    Object.assign(project, req.body);
    await project.save();

    res.json({
      success: true,
      project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete project (Admin)
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectByIdOrSlug,
  createProject,
  updateProject,
  deleteProject
};
