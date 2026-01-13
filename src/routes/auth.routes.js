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

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET || 'secret-key-demo',
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;
