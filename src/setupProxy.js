const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://your-live-backend-url.com', 
      changeOrigin: true,
      secure: true, 
    })
  );
};













