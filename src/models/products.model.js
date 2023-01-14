const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );

  return result;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  return product;
};

const createProduct = async (name) => {
  const [newProduct] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );

  return newProduct.insertId;
};

const editProduct = async (id, name) => {
  const result = await connection.execute(
    `UPDATE products
    SET name = ?
    WHERE id = ?`,
    [name, id],
  );

  return result;
};

module.exports = {
  getProducts,
  getById,
  createProduct,
  editProduct,
};