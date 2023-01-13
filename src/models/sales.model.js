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

module.exports = {
  createSaleId,
  createSaleInfo,
};