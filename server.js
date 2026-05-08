const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const API_BASE = 'https://api.tcgapi.dev/v1';
const API_KEY = 'tcg_live_7b9bf797b73c3fbe85ccaf8b1dd5998c8e24042f';

const MIME = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.webp': 'image/webp',
};

http.createServer((req, res) => {
    if (req.url.startsWith('/api/')) {
        const targetPath = req.url.replace('/api', '');
        const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
        const options = new URL(API_BASE + targetPath);
        const proxyReq = https.request({
            hostname: options.hostname,
            path: options.pathname + options.search + qs,
            method: req.method,
            headers: {
                'X-API-Key': API_KEY,
                'Accept': 'application/json',
            },
        }, (proxyRes) => {
            res.writeHead(proxyRes.statusCode, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': proxyRes.headers['content-type'] || 'application/json',
            });
            proxyRes.pipe(res);
        });
        proxyReq.on('error', (e) => {
            res.writeHead(500);
            res.end(JSON.stringify({ error: e.message }));
        });
        proxyReq.end();
        return;
    }

    const filePath = req.url === '/' ? '/index.html' : req.url;
    const fullPath = path.join(__dirname, filePath);
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
    });
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
