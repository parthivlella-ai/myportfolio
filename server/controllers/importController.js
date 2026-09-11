const { fetchGitHubRepoData } = require('../services/githubService');
const { analyzeZipFile } = require('../services/zipAnalysisService');

// @desc    Import metadata from a GitHub repository
// @route   POST /api/import/github
// @access  Private (Admin)
const importGitHubRepo = async (req, res) => {
  try {
    const { githubUrl } = req.body;
    if (!githubUrl) {
      return res.status(400).json({ success: false, message: 'GitHub URL is required' });
    }

    const repoData = await fetchGitHubRepoData(githubUrl);

    res.json({
      success: true,
      data: repoData,
      message: 'Successfully imported repository details from GitHub'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Analyze uploaded ZIP file and extract project metadata
// @route   POST /api/import/zip
// @access  Private (Admin)
const importZipFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a ZIP file' });
    }

    const zipFilePath = req.file.path;
    const originalName = req.file.originalname;

    const zipData = await analyzeZipFile(zipFilePath, originalName);

    res.json({
      success: true,
      data: zipData,
      message: 'Successfully analyzed project ZIP metadata'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Upload project image
// @route   POST /api/import/image
// @access  Private (Admin)
const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file' });
    }

    const imageUrl = `/uploads/images/${req.file.filename}`;

    res.json({
      success: true,
      imageUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  importGitHubRepo,
  importZipFile,
  uploadProjectImage
};
