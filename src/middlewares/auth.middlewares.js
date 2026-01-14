const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || req.cookies && req.cookies.authToken;

  let token;
  if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.authToken) {
    token = req.cookies.authToken;
  }

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret-key-demo');
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Autenticación requerida' });

  const adminEmail = process.env.ADMIN_USER_EMAIL || process.env.ADMIN_USER || 'admin@demo.com';

  // Si el token incluye un role, comprobarlo; si no, validar contra email admin por defecto
  if (req.user.role === 'admin' || req.user.email === adminEmail) {
    return next();
  }

  return res.status(403).json({ message: 'Se requiere rol de administrador' });
}

module.exports = { authenticate, requireAdmin };
