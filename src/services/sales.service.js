const { salesModel } = require('../models');
const validateSalesInputFields = require('../validations/validateSalesInputFields');

const createSales = async (saleToCreate) => {
  const error = validateSalesInputFields(saleToCreate);
  if (error) return error;

  const newSaleId = await salesModel.createSaleId();  
  const newSale = await salesModel.createSaleInfo(newSaleId);

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

module.exports = {
  createSales,
  getSales,
  getById,
};