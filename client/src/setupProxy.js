const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const target = process.env.BACKEND_PORT
    ? `http://localhost:${process.env.BACKEND_PORT}`
    : 'http://localhost:3009';

  app.use(
    ['/api', '/api/**'],
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
      logLevel: 'silent',
    })
  );
};


