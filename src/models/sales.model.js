const connection = require('./connection');

const createSaleId = async () => {
  const [newSale] = await connection.execute(
    'INSERT INTO sales (date) VALUE (?)',
    [new Date()],
  );

  return newSale.insertId;
};

const createSaleInfo = async (saleId, saleToCreate) => {
  saleToCreate.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [saleId, productId, quantity],
    );
  });

  const newSale = {
    id: saleId,
    itemsSold: saleToCreate,
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

const deleteSale = async (id) => {
  await connection.execute(
    `DELETE FROM sales_products
    WHERE sale_id = ?`,
    [id],
  );
  await connection.execute(
    `DELETE FROM sales
    WHERE id = ?`,
    [id],
  );
};

const editSale = async (id, saleToEdit) => {
  saleToEdit.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      `UPDATE sales_products
      SET quantity = ?
      WHERE sale_id = ? AND product_id = ?`,
      [quantity, id, productId],
    );
  });

  const editedSale = {
    saleId: id,
    itemsUpdated: saleToEdit,
  };

  return editedSale;
};

module.exports = {
  createSaleId,
  createSaleInfo,
  getSales,
  getById,
  deleteSale,
  editSale,
};