const express = require('express');
const router = express.Router();
const {
  importGitHubRepo,
  importZipFile,
  uploadProjectImage
} = require('../controllers/importController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { uploadZip, uploadImage } = require('../middleware/fileUpload');

router.post('/github', protectAdmin, importGitHubRepo);
router.post('/zip', protectAdmin, uploadZip.single('zipFile'), importZipFile);
router.post('/image', protectAdmin, uploadImage.single('imageFile'), uploadProjectImage);

module.exports = router;
