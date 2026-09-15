const fs = require('fs');
const path = require('path');

function generateExactResumePdf() {
  // Page 1 content
  const page1Stream = 
`BT
/F1 18 Tf
0 0.3 0.6 rg
50 780 Td
(LELLA PARTHIV REDDY) Tj
0 -18 Td
0 0 0 rg
/F1 10 Tf
(B.Tech - Computer Science and Engineering | VFSTR, India) Tj
0 -14 Td
/F2 9 Tf
(Phone: 7981685660 | Email: parthivlella@gmail.com | LinkedIn: linkedin.com/in/parthiv-reddy-1608a33a3) Tj
0 -12 Td
(Address: 205 Dasari Mansion, CR Colony, Chilakaluripet, Palnadu, Andhra Pradesh, India) Tj
ET

0.8 0.8 0.8 RG
1 w
50 722 m 545 722 l S

BT
0 0.25 0.5 rg
/F1 11 Tf
50 706 Td
(PROFESSIONAL SUMMARY) Tj
ET

0.8 0.8 0.8 RG
1 w
50 700 m 545 700 l S

BT
0 0 0 rg
/F2 9.5 Tf
50 686 Td
(Highly motivated B.Tech student specializing in Computer Science and Engineering at Vignan Foundation for) Tj
0 -13 Td
(Science Research and Technology (CGPA: 8.0/10). Passionate about Python programming, and intelligent system) Tj
0 -13 Td
(development. Proficient in full-stack web technologies and experienced in building data-driven applications.) Tj
0 -13 Td
(Seeking an internship or entry-level role to apply technical skills and contribute to innovative technology solutions.) Tj
ET

BT
0 0.25 0.5 rg
/F1 11 Tf
50 626 Td
(EDUCATION) Tj
ET

0.8 0.8 0.8 RG
1 w
50 620 m 545 620 l S

BT
0 0 0 rg
/F1 9.5 Tf
50 606 Td
(B.Tech in Computer Science and Engineering | CGPA: 8.0 / 10) Tj
0 -13 Td
/F2 9 Tf
(Vignan Foundation for Science Research and Technology (VFSTR), India  |  2024 - 2028 (Pursuing)) Tj
0 -16 Td
/F1 9.5 Tf
(Intermediate - MPC (Mathematics, Physics, Chemistry) | 94%) Tj
0 -13 Td
/F2 9 Tf
(Sri Chaitanya Junior College  |  2022 - 2024) Tj
0 -16 Td
/F1 9.5 Tf
(SSC (10th Grade) | 91%) Tj
0 -13 Td
/F2 9 Tf
(Modern Stellar, Chilakaluripet  |  2021 - 2022) Tj
ET

BT
0 0.25 0.5 rg
/F1 11 Tf
50 496 Td
(TECHNICAL SKILLS) Tj
ET

0.8 0.8 0.8 RG
1 w
50 490 m 545 490 l S

BT
0 0 0 rg
/F2 9.5 Tf
50 472 Td
(  * Python Programming                - Advanced) Tj
0 -14 Td
(  * Java Programming                  - Intermediate) Tj
0 -14 Td
(  * C Programming                     - Proficient) Tj
0 -14 Td
(  * HTML5 / CSS3                      - Proficient) Tj
0 -14 Td
(  * JavaScript (ES6+, React.js)       - Intermediate) Tj
0 -14 Td
(  * Django Framework / Node.js        - Proficient) Tj
0 -14 Td
(  * Data Science & ML                 - Intermediate) Tj
0 -14 Td
(  * SQL / Databases & MongoDB         - Intermediate) Tj
0 -14 Td
(  * Git & GitHub                      - Intermediate) Tj
0 -14 Td
(  * MS Office Suite                   - Advanced) Tj
ET

BT
0 0.25 0.5 rg
/F1 11 Tf
50 310 Td
(PROJECTS) Tj
ET

0.8 0.8 0.8 RG
1 w
50 304 m 545 304 l S

BT
0 0 0 rg
/F1 9.5 Tf
50 288 Td
(Real-Time Chat Application) Tj
0 -13 Td
/F2 9 Tf
(Technologies: React.js, Node.js, Express, MongoDB, Socket.IO, Vercel) Tj
0 -13 Td
(  * Built a feature-rich real-time messaging platform with instant socket communication.) Tj
0 -13 Td
(  * Implemented secure user authentication, responsive modern UI, and deployed live on Vercel.) Tj
0 -13 Td
(  * Live: https://chat-application-navy-chi.vercel.app/  |  GitHub: github.com/parthivlella-ai/chat-application-) Tj
0 -18 Td
/F1 9.5 Tf
(Cloud File Storage Application) Tj
0 -13 Td
/F2 9 Tf
(Technologies: React.js, Node.js, Express, MongoDB, Multer, Vercel) Tj
0 -13 Td
(  * Full-stack cloud file management application allowing users to upload, organize, and preview files.) Tj
0 -13 Td
(  * Implemented file categorization, storage analytics, and direct secure sharing links.) Tj
0 -13 Td
(  * Live: https://file-storage-omega-three.vercel.app/  |  GitHub: github.com/parthivlella-ai/File-storage) Tj
0 -18 Td
/F1 9.5 Tf
(Personal Developer Portfolio Website) Tj
0 -13 Td
/F2 9 Tf
(Technologies: React, Node.js, Express, MongoDB, CSS3, JavaScript) Tj
0 -13 Td
(  * Designed and developed a responsive developer portfolio showcasing projects, skills, and admin dashboard.) Tj
0 -13 Td
(  * Applied custom animations, glassmorphism, responsive flexbox/grid, and MongoDB project management.) Tj
ET
`;

  // Page 2 content
  const page2Stream =
`BT
0 0.25 0.5 rg
/F1 11 Tf
50 780 Td
(CERTIFICATIONS & COURSES) Tj
ET

0.8 0.8 0.8 RG
1 w
50 774 m 545 774 l S

BT
0 0 0 rg
/F2 9.5 Tf
50 756 Td
(  * Introduction to Python - NPTEL / Swayam) Tj
0 -15 Td
(  * Web Development Bootcamp (HTML, CSS, JavaScript) - Udemy) Tj
0 -15 Td
(  * MS Office Specialist (MOS) - Microsoft) Tj
ET

BT
0 0.25 0.5 rg
/F1 11 Tf
50 690 Td
(CORE COMPETENCIES & SOFT SKILLS) Tj
ET

0.8 0.8 0.8 RG
1 w
50 684 m 545 684 l S

BT
0 0 0 rg
/F2 9.5 Tf
50 666 Td
(  * Analytical & Problem-Solving Thinking            * Team Collaboration & Adaptability) Tj
0 -15 Td
(  * Effective Communication (English & Telugu)        * Time Management & Deadline Oriented) Tj
0 -15 Td
(  * Self-Motivated & Quick Learner                    * Creativity & UI/UX Design Sensibility) Tj
ET

BT
0 0.25 0.5 rg
/F1 11 Tf
50 598 Td
(LANGUAGES) Tj
ET

0.8 0.8 0.8 RG
1 w
50 592 m 545 592 l S

BT
0 0 0 rg
/F2 9.5 Tf
50 574 Td
(  * Telugu  - Native / Fluent) Tj
0 -15 Td
(  * English - Professional Working Proficiency (Read, Write & Speak)) Tj
ET

BT
0 0.25 0.5 rg
/F1 11 Tf
50 514 Td
(HOBBIES & INTERESTS) Tj
ET

0.8 0.8 0.8 RG
1 w
50 508 m 545 508 l S

BT
0 0 0 rg
/F2 9.5 Tf
50 490 Td
(  * Competitive Coding & Algorithm Problem Solving (LeetCode, HackerEarth)) Tj
0 -15 Td
(  * Graphic Designing & Digital Art) Tj
0 -15 Td
(  * Exploring new AI tools, frameworks, and emerging technologies) Tj
ET

BT
0 0.25 0.5 rg
/F1 11 Tf
50 420 Td
(DECLARATION) Tj
ET

0.8 0.8 0.8 RG
1 w
50 414 m 545 414 l S

BT
0 0 0 rg
/F2 9.5 Tf
50 396 Td
(I hereby declare that all the information provided in this resume is true and correct to the best of my knowledge) Tj
0 -14 Td
(and belief. I take full responsibility for the authenticity of the details mentioned above.) Tj
0 -30 Td
(Place: Palnadu, Andhra Pradesh) Tj
0 -16 Td
(Date:  _________________________) Tj
0 -26 Td
(Signature: _____________________) Tj
0 -16 Td
/F1 10 Tf
(( Lella Parthiv Reddy )) Tj
ET
`;

  const len1 = Buffer.byteLength(page1Stream, 'utf-8');
  const len2 = Buffer.byteLength(page2Stream, 'utf-8');

  let pdf = `%PDF-1.4\n`;
  const offsets = [];

  // Object 1: Catalog
  offsets.push(pdf.length);
  pdf += `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;

  // Object 2: Pages
  offsets.push(pdf.length);
  pdf += `2 0 obj\n<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>\nendobj\n`;

  // Object 3: Page 1
  offsets.push(pdf.length);
  pdf += `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 5 0 R /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> >>\nendobj\n`;

  // Object 4: Page 2
  offsets.push(pdf.length);
  pdf += `4 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 6 0 R /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> >>\nendobj\n`;

  // Object 5: Stream Page 1
  offsets.push(pdf.length);
  pdf += `5 0 obj\n<< /Length ${len1} >>\nstream\n${page1Stream}\nendstream\nendobj\n`;

  // Object 6: Stream Page 2
  offsets.push(pdf.length);
  pdf += `6 0 obj\n<< /Length ${len2} >>\nstream\n${page2Stream}\nendstream\nendobj\n`;

  // Object 7: Font Bold
  offsets.push(pdf.length);
  pdf += `7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`;

  // Object 8: Font Regular
  offsets.push(pdf.length);
  pdf += `8 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;

  // Xref
  const startXref = pdf.length;
  pdf += `xref\n0 9\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size 9 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

  return Buffer.from(pdf, 'utf-8');
}

const clientPublicDir = path.join(__dirname, '../../client/public');
if (!fs.existsSync(clientPublicDir)) {
  fs.mkdirSync(clientPublicDir, { recursive: true });
}

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const pdfBuffer = generateExactResumePdf();

fs.writeFileSync(path.join(clientPublicDir, 'resume.pdf'), pdfBuffer);
fs.writeFileSync(path.join(clientPublicDir, 'Parthiv_Reddy_Resume.pdf'), pdfBuffer);
fs.writeFileSync(path.join(uploadsDir, 'resume.pdf'), pdfBuffer);

console.log('Successfully updated Parthiv Reddy 2-page resume at client/public/resume.pdf and uploads');
