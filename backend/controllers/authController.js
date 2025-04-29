const pool = require('../models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email no registrado.' });
    }

    const user = rows[0];
    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas. La contraseña es Incorrecta.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

