const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/home/word/**',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
            pathRewrite: {
                '^/home/word': '', // Remove `/home/word` prefix when forwarding to the backend
            },
        })
    );

    app.use(
        '/token',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true
        })
    );

    app.use(
        '/spotifyLogin',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true
        })
    );

    app.use(
        '/callback',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true
        })
    );
};
