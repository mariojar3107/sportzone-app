const pool = require('../models/db');

exports.getAllProducts = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;
    await pool.query('INSERT INTO products (name, description, image) VALUES (?, ?, ?)', [name, description, image]);
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    next(error);
  }
};
