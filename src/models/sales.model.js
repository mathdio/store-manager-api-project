const connection = require('./connection');

const createSaleId = async () => {
  const newSale = await connection.execute(
    'INSERT INTO sales (date) VALUE (now())',
  );

  return newSale.insertId;
};

const createSaleInfo = async (saleId, salesToCreate) => {
  Promise.all(
    salesToCreate.forEach(async ({ productId, quantity }) => {
      await connection.execute(
        'INSERT INTO (sales_products) VALUES (?, ?, ?)',
        [saleId, productId, quantity],
      );
    }),
  );
  const newSale = {
    id: saleId,
    itemsSold: salesToCreate,
  };

  return newSale;
};

const getSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY saleId, productId`,
  );

  return result;
};

const getById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY productId`,
    [saleId],
  );

  return sale;
};

module.exports = {
  createSaleId,
  createSaleInfo,
  getSales,
  getById,
};