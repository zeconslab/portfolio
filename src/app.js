const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

// Inicialización
const app = express();

// Configurar EJS con layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // Usar layout.ejs por defecto

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public'))); // Servir admin.js y otros archivos estáticos
app.use('/css', express.static(path.join(__dirname, '../../frontend/src/css')));

// Rutas de API
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Rutas públicas y admin (vistas)
const publicRoutes = require('./routes/public.routes');
const adminRoutes = require('./routes/admin.routes');

app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', backend: true });
});

// Rutas específicas
// Las rutas de login y admin ahora están en routers dedicados
module.exports = app;