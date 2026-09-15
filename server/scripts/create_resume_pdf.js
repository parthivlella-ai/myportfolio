const fs = require('fs');
const path = require('path');

// Create a valid minimal standard PDF 1.4 document
function createMinimalPdf() {
  const contentStream = 
`BT
/F1 20 Tf
50 750 Td
(LELLA PARTHIV REDDY) Tj
0 -26 Td
/F1 12 Tf
(Full Stack Developer | B.Tech Computer Science | parthivlella@gmail.com) Tj
0 -18 Td
(LinkedIn: https://www.linkedin.com/in/parthiv-reddy-1608a33a3 | GitHub: https://github.com/parthivlella-ai) Tj
0 -30 Td
/F1 14 Tf
(EDUCATION) Tj
0 -18 Td
/F1 11 Tf
(1. B.Tech in CSE - Vignan's Foundation for Science, Tech & Research (VFSTR) [2024 - 2028] - CGPA: 8.0/10) Tj
0 -16 Td
(2. Intermediate MPC - Sri Chaitanya Junior College [2022 - 2024] - 94%) Tj
0 -16 Td
(3. SSC 10th Grade - Modern Stellar [2021 - 2022] - 91%) Tj
0 -28 Td
/F1 14 Tf
(TECHNICAL SKILLS) Tj
0 -18 Td
/F1 11 Tf
(Languages: Python, JavaScript (ES6+), Java, C, SQL) Tj
0 -16 Td
(Frontend: React.js, HTML5, CSS3, Responsive Web Design, Vite) Tj
0 -16 Td
(Backend: Node.js, Express.js, Django, REST APIs, WebSockets) Tj
0 -16 Td
(Databases: MongoDB, Mongoose, SQL) Tj
0 -16 Td
(Tools & Platforms: Git, GitHub, VS Code, Postman, Vercel) Tj
0 -28 Td
/F1 14 Tf
(FEATURED PROJECTS) Tj
0 -18 Td
/F1 11 Tf
(1. Real-Time Chat Application [React, Node.js, Express, Socket.io, MongoDB]) Tj
0 -14 Td
(   - Live: https://chat-application-navy-chi.vercel.app/) Tj
0 -14 Td
(   - GitHub: https://github.com/parthivlella-ai/chat-application-) Tj
0 -18 Td
(2. Cloud File Storage Application [React, Node.js, Express, Multer, MongoDB]) Tj
0 -14 Td
(   - Live: https://file-storage-omega-three.vercel.app/) Tj
0 -14 Td
(   - GitHub: https://github.com/parthivlella-ai/File-storage) Tj
ET`;

  const streamLength = Buffer.byteLength(contentStream, 'utf-8');

  let pdf = `%PDF-1.4\n`;
  const offsets = [];

  // Object 1: Catalog
  offsets.push(pdf.length);
  pdf += `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;

  // Object 2: Pages
  offsets.push(pdf.length);
  pdf += `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;

  // Object 3: Page
  offsets.push(pdf.length);
  pdf += `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`;

  // Object 4: Stream Content
  offsets.push(pdf.length);
  pdf += `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${contentStream}\nendstream\nendobj\n`;

  // Object 5: Font
  offsets.push(pdf.length);
  pdf += `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;

  // Xref
  const startXref = pdf.length;
  pdf += `xref\n0 6\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

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

const pdfBuffer = createMinimalPdf();

fs.writeFileSync(path.join(clientPublicDir, 'resume.pdf'), pdfBuffer);
fs.writeFileSync(path.join(clientPublicDir, 'Parthiv_Reddy_Resume.pdf'), pdfBuffer);
fs.writeFileSync(path.join(uploadsDir, 'resume.pdf'), pdfBuffer);

console.log('Successfully generated valid standard PDF resume at client/public/resume.pdf and server/uploads/resume.pdf');
