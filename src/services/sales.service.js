const { salesModel, productsModel } = require('../models');
const validateSalesInputFields = require('../validations/validateSalesInputFields');

const createSale = async (saleToCreate) => {
  const error = validateSalesInputFields(saleToCreate);
  if (error) return error;

  const productsInDatabase = await productsModel.getProducts();
  const idsInDatabase = productsInDatabase.map(({ id }) => id);
  const notAvailable = saleToCreate.some(({ productId }) => !idsInDatabase.includes(productId));
  if (notAvailable) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const newSaleId = await salesModel.createSaleId();  
  const newSale = await salesModel.createSaleInfo(newSaleId, saleToCreate);

  return { type: null, message: newSale };
};

const getSales = async () => {
  const sales = await salesModel.getSales();

  return { type: null, message: sales };
};

const getById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (sale.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const deleteSale = async (id) => {
  const saleToDelete = await salesModel.getById(id);
  if (saleToDelete.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await salesModel.deleteSale(id);

  const wasDeleted = await salesModel.getById(id);
  if (wasDeleted.length < 1) return { type: null, message: '' };
};

module.exports = {
  createSale,
  getSales,
  getById,
  deleteSale,
};