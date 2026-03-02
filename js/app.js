'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const rootDir = path.resolve(__dirname, '..');

const mimeTypes = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

function resolvePath(urlPath) {
    const pathname = decodeURIComponent(urlPath.split('?')[0]);
    const requestedPath = pathname === '/' ? '/index.html' : pathname;
    const fullPath = path.normalize(path.join(rootDir, requestedPath));

    if (!fullPath.startsWith(rootDir)) {
        return null;
    }

    return fullPath;
}

const server = http.createServer((req, res) => {
    const filePath = resolvePath(req.url || '/');

    if (!filePath) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('Invalid request');
        return;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            const status = err.code === 'ENOENT' ? 404 : 500;
            res.writeHead(status, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end(status === 404 ? 'Not found' : 'Internal server error');
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[extension] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`Cerebro app running at http://localhost:${PORT}`);
});
