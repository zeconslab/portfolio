const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Usuario demo (luego DB)
const ADMIN_USER = {
  email: 'admin@demo.com',
  passwordHash: bcrypt.hashSync('123456', 10)
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_USER.email) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const valid = await bcrypt.compare(password, ADMIN_USER.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Firmar token incluyendo role para soporte de requireAdmin
  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET || 'secret-key-demo',
    { expiresIn: '1h' }
  );

  // Opcional: enviar cookie para facilitar consumo desde vistas
  if (req.cookies) {
    res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 });
  }

  res.json({ token });
});

module.exports = router;
