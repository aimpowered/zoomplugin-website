const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Enable Cross-Origin Isolation
    server.use((req, res, next) => {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        next();
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(5000, (err) => {
        if (err) throw err;
        console.log('Server started on http://localhost:5000');
    });
});
