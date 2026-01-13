const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Inicialización
const app = express();

// Configurar EJS con layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // Usar layout.ejs por defecto

// Middlewares
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public'))); // Servir admin.js y otros archivos estáticos
app.use('/css', express.static(path.join(__dirname, '../../frontend/src/css')));

// Rutas de API
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', backend: true });
});

// Rutas específicas
app.get('/login', (req, res) => {
  res.render('login', { layout: false }); // Sin layout para login
});
app.get('/admin', (req, res) => {
  res.render('dashboard', { page: 'dashboard' });
});

app.get('/admin/projects', (req, res) => {
  res.render('projects', { page: 'projects' });
});

app.get('/admin/timeline', (req, res) => {
  res.render('timeline', { page: 'timeline' });
});

app.get('/admin/skills', (req, res) => {
  res.render('skills', { page: 'skills' });
});

app.get('/admin/seo', (req, res) => {
  res.render('seo', { page: 'seo' });
});
module.exports = app;