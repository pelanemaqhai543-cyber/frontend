const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://backend-ii3l.onrender.com',
      changeOrigin: true,
    })
  );
};












