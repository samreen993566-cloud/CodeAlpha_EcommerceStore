const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    console.log('Auth header:', req.headers.authorization);
    
    let token = req.headers.authorization?.split(' ')[1];
    
    // Quotes hata do agar hain
    if (token) {
      token = token.replace(/"/g, '');
    }

    console.log('Token:', token);

    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log('JWT Error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;