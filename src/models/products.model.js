const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );

  return result;
};

module.exports = {
  getProducts,
};