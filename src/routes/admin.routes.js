const express = require('express');
const { authenticate, requireAdmin } = require('../middlewares/auth.middlewares');

const router = express.Router();

// Para las vistas admin todavía se renderiza HTML, pero las APIs bajo /admin/api
router.get('/', (req, res) => {
  res.render('admin/dashboard', { page: 'dashboard' });
});

router.get('/projects', (req, res) => {
  res.render('admin/projects', { page: 'projects' });
});

router.get('/timeline', (req, res) => {
  res.render('admin/timeline', { page: 'timeline' });
});

router.get('/skills', (req, res) => {
  res.render('admin/skills', { page: 'skills' });
});

router.get('/seo', (req, res) => {
  res.render('admin/seo', { page: 'seo' });
});

// Ejemplo de API admin protegido
router.get('/api/status', authenticate, requireAdmin, (req, res) => {
  res.json({ status: 'admin ok', user: req.user });
});

module.exports = router;
