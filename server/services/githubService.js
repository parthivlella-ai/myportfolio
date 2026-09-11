const axios = require('axios');

/**
 * Extract owner and repo from various GitHub URL formats:
 * - https://github.com/owner/repo
 * - https://github.com/owner/repo.git
 * - github.com/owner/repo
 */
const parseGitHubUrl = (urlStr) => {
  if (!urlStr) return null;
  const cleanUrl = urlStr.trim().replace(/\.git$/, '').replace(/\/$/, '');
  const match = cleanUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/i);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
  return null;
};

/**
 * Fetch GitHub repository metadata server-side
 */
const fetchGitHubRepoData = async (githubUrl) => {
  const parsed = parseGitHubUrl(githubUrl);
  if (!parsed) {
    throw new Error('Invalid GitHub repository URL format. Example: https://github.com/username/repository');
  }

  const { owner, repo } = parsed;
  const headers = {
    'User-Agent': 'Portfolio-App',
    'Accept': 'application/vnd.github.v3+json'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const repoRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    const repoData = repoRes.data;

    // Try fetching README to extract problem statement / features if possible
    let readmeText = '';
    const branches = [repoData.default_branch || 'main', 'master'];
    for (const branch of branches) {
      try {
        const readmeRes = await axios.get(
          `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`,
          { headers: { 'User-Agent': 'Portfolio-App' } }
        );
        if (readmeRes.data && typeof readmeRes.data === 'string') {
          readmeText = readmeRes.data;
          break;
        }
      } catch (err) {
        // Continue to next branch check
      }
    }

    // Infer technologies from repo language, topics, and readme text
    const technologiesSet = new Set();
    if (repoData.language) technologiesSet.add(repoData.language);
    if (Array.isArray(repoData.topics)) {
      repoData.topics.forEach(t => technologiesSet.add(t));
    }

    // Basic README technology keyword scanner
    const commonTechs = ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Python', 'Docker', 'Socket.IO', 'Next.js', 'Redux', 'PostgreSQL'];
    commonTechs.forEach(tech => {
      if (readmeText.toLowerCase().includes(tech.toLowerCase())) {
        technologiesSet.add(tech);
      }
    });

    // Extract features from README bullet points if present
    const featureLines = [];
    const lines = readmeText.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if ((trimmed.startsWith('- ') || trimmed.startsWith('* ')) && trimmed.length > 5 && trimmed.length < 150) {
        featureLines.push(trimmed.replace(/^[-*]\s+/, ''));
      }
    });

    return {
      title: repoData.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      shortDescription: repoData.description || `A full-stack repository created by ${owner}.`,
      fullDescription: repoData.description ? `${repoData.description}\n\nRepository: ${repoData.html_url}` : `Repository: ${repoData.html_url}`,
      problemStatement: readmeText ? readmeText.slice(0, 300) + '...' : 'Designed to solve developer workflow and project management challenges efficiently.',
      features: featureLines.slice(0, 5),
      technologies: Array.from(technologiesSet).filter(Boolean),
      githubUrl: repoData.html_url,
      liveUrl: repoData.homepage || '',
      stars: repoData.stargazers_count || 0,
      sourceType: 'github',
      sourceUrl: repoData.html_url,
      category: 'Full Stack'
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`GitHub repository '${owner}/${repo}' was not found. Please verify the URL or repository visibility.`);
    }
    if (error.response && error.response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. You can still enter project details manually.');
    }
    throw new Error(`Failed to fetch GitHub repository data: ${error.message}`);
  }
};

module.exports = { parseGitHubUrl, fetchGitHubRepoData };
