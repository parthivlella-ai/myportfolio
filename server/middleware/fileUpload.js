const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directories exist
const uploadDir = path.join(__dirname, '../uploads');
const zipDir = path.join(uploadDir, 'zips');
const imageDir = path.join(uploadDir, 'images');

[uploadDir, zipDir, imageDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Disk storage configuration for ZIP files
const zipStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, zipDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${uniqueSuffix}-${safeName}`);
  }
});

// Disk storage configuration for Images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `img-${uniqueSuffix}${ext}`);
  }
});

// ZIP file filter
const zipFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.zip' || file.mimetype === 'application/zip' || file.mimetype === 'application/x-zip-compressed') {
    cb(null, true);
  } else {
    cb(new Error('Only ZIP files are allowed!'), false);
  }
};

// Image file filter
const imageFileFilter = (req, file, cb) => {
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, jpeg, png, webp, svg, gif) are allowed!'), false);
  }
};

const uploadZip = multer({
  storage: zipStorage,
  fileFilter: zipFileFilter,
  limits: { fileSize: 25 * 1024 * 1024 } // 25 MB limit
});

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

module.exports = { uploadZip, uploadImage };
