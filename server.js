const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function resolveFilePath(reqUrl) {
  let cleanUrl = reqUrl.split('?')[0].split('#')[0];
  if (cleanUrl === '/' || cleanUrl === '') {
    return path.join(PUBLIC_DIR, 'index.html');
  }

  let filePath = path.join(PUBLIC_DIR, decodeURIComponent(cleanUrl));

  // Security check
  if (!filePath.startsWith(PUBLIC_DIR)) {
    return null;
  }

  // 1. Direct file match (e.g., about.html, style.css)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return filePath;
  }

  // 2. Directory index match
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    let indexFile = path.join(filePath, 'index.html');
    if (fs.existsSync(indexFile)) {
      return indexFile;
    }
  }

  // 3. Clean URL without extension (e.g., /about -> about.html)
  if (!path.extname(filePath)) {
    let htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
      return htmlPath;
    }
  }

  return null;
}

const server = http.createServer((req, res) => {
  const targetFile = resolveFilePath(req.url);

  if (!targetFile) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>404 Page Not Found</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body style="display:flex; justify-content:center; align-items:center; min-height:100vh; text-align:center; background:#0B132B; color:#fff; font-family:sans-serif;">
        <div>
          <h1 style="font-size:3rem; margin-bottom:1rem; color:#E0A96D;">404 - Page Not Found</h1>
          <p style="margin-bottom:2rem; color:#A0AEC0;">The page you are looking for does not exist or has been moved.</p>
          <a href="/index.html" style="background:#E0A96D; color:#0B132B; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold;">Return to Home</a>
        </div>
      </body>
      </html>
    `);
    return;
  }

  const ext = path.extname(targetFile).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(targetFile, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Preview server active at http://localhost:${PORT}/`);
});
