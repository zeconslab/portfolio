const express = require('express');
const router = express.Router();

// Rutas públicas (vistas)
router.get('/', (req, res) => {
  // Página pública principal (se puede cambiar a una vista específica)
  res.render('public/welcome', { layout: false });
});

router.get('/login', (req, res) => {
  res.render('public/login', { layout: false });
});

module.exports = router;
