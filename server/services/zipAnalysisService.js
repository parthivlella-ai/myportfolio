const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

/**
 * Safely inspect uploaded ZIP file in memory without running executable code.
 */
const analyzeZipFile = async (zipFilePath, originalFileName) => {
  if (!fs.existsSync(zipFilePath)) {
    throw new Error('Uploaded ZIP file not found on server.');
  }

  try {
    const zip = new AdmZip(zipFilePath);
    const zipEntries = zip.getEntries();

    let packageJsonContent = null;
    let readmeContent = null;
    let requirementsContent = null;
    let pomXmlContent = null;

    const detectedTechs = new Set();
    const projectFiles = [];

    // Scan zip entries for metadata files safely (prevent Zip Slip path traversal)
    zipEntries.forEach((entry) => {
      const entryName = entry.entryName;

      // Prevent Path Traversal attacks
      if (entryName.includes('..') || path.isAbsolute(entryName)) {
        return;
      }

      projectFiles.push(entryName);
      const baseName = path.basename(entryName).toLowerCase();

      if (baseName === 'package.json' && !packageJsonContent) {
        try {
          packageJsonContent = JSON.parse(zip.readAsText(entry));
        } catch (e) {}
      } else if (baseName === 'readme.md' && !readmeContent) {
        try {
          readmeContent = zip.readAsText(entry);
        } catch (e) {}
      } else if (baseName === 'requirements.txt' && !requirementsContent) {
        try {
          requirementsContent = zip.readAsText(entry);
        } catch (e) {}
      } else if (baseName === 'pom.xml' && !pomXmlContent) {
        try {
          pomXmlContent = zip.readAsText(entry);
        } catch (e) {}
      }
    });

    let title = originalFileName ? originalFileName.replace(/\.zip$/i, '').replace(/[-_]/g, ' ') : 'Uploaded Project';
    title = title.replace(/\b\w/g, c => c.toUpperCase());
    let shortDescription = 'Extracted and analyzed from uploaded ZIP project repository.';
    let fullDescription = 'Project created via ZIP upload analysis.';
    let problemStatement = 'Uploaded ZIP package containing project code and assets.';
    let features = [];
    let category = 'Full Stack';

    // Parse package.json if present
    if (packageJsonContent) {
      if (packageJsonContent.name) {
        title = packageJsonContent.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      }
      if (packageJsonContent.description) {
        shortDescription = packageJsonContent.description;
        fullDescription = packageJsonContent.description;
      }

      const allDeps = {
        ...(packageJsonContent.dependencies || {}),
        ...(packageJsonContent.devDependencies || {})
      };

      const depMap = {
        'react': 'React',
        'react-dom': 'React',
        'express': 'Express',
        'express.js': 'Express',
        'mongodb': 'MongoDB',
        'mongoose': 'MongoDB',
        'node': 'Node.js',
        'socket.io': 'Socket.IO',
        'socket.io-client': 'Socket.IO',
        'next': 'Next.js',
        'vite': 'Vite',
        'vue': 'Vue.js',
        'angular': 'Angular',
        'tailwindcss': 'Tailwind CSS',
        'bootstrap': 'Bootstrap',
        'jwt': 'JWT',
        'jsonwebtoken': 'JWT',
        'bcrypt': 'bcrypt',
        'axios': 'Axios'
      };

      Object.keys(allDeps).forEach((dep) => {
        const lowerDep = dep.toLowerCase();
        if (depMap[lowerDep]) {
          detectedTechs.add(depMap[lowerDep]);
        }
      });

      if (allDeps['react'] || allDeps['vue'] || allDeps['angular']) {
        detectedTechs.add('JavaScript');
      }
    }

    // Parse requirements.txt if present
    if (requirementsContent) {
      detectedTechs.add('Python');
      if (requirementsContent.includes('flask')) detectedTechs.add('Flask');
      if (requirementsContent.includes('django')) detectedTechs.add('Django');
      if (requirementsContent.includes('fastapi')) detectedTechs.add('FastAPI');
    }

    // Parse pom.xml if present
    if (pomXmlContent) {
      detectedTechs.add('Java');
      if (pomXmlContent.includes('spring-boot')) detectedTechs.add('Spring Boot');
    }

    // Scan README.md if present
    if (readmeContent) {
      const lines = readmeContent.split('\n');
      lines.forEach(line => {
        const trimmed = line.trim();
        if ((trimmed.startsWith('- ') || trimmed.startsWith('* ')) && trimmed.length > 5 && trimmed.length < 120) {
          features.push(trimmed.replace(/^[-*]\s+/, ''));
        }
      });
      if (!shortDescription || shortDescription.length < 20) {
        shortDescription = readmeContent.slice(0, 150).replace(/[#*`]/g, '') + '...';
      }
      problemStatement = readmeContent.slice(0, 300).replace(/[#*`]/g, '');
    }

    if (detectedTechs.size === 0) {
      detectedTechs.add('JavaScript');
      detectedTechs.add('HTML');
      detectedTechs.add('CSS');
    }

    return {
      title,
      shortDescription,
      fullDescription,
      problemStatement,
      features: features.slice(0, 5),
      technologies: Array.from(detectedTechs),
      category,
      sourceType: 'zip',
      sourceUrl: '',
      githubUrl: '',
      liveUrl: ''
    };
  } catch (error) {
    throw new Error(`ZIP Analysis failed: ${error.message}`);
  } finally {
    // Clean up temporary ZIP file safely
    try {
      if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
      }
    } catch (cleanupErr) {
      console.warn('[ZIP Cleanup] Failed to delete temp zip:', cleanupErr.message);
    }
  }
};

module.exports = { analyzeZipFile };
