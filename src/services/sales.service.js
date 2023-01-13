const { productsModel, salesModel } = require('../models');
const validateSalesInputFields = require('../validations/validateSalesInputFields');

const createSales = async (salesToCreate) => {
  const error = validateSalesInputFields(salesToCreate);
  if (error) return error;

  const allProductsAreAvailable = Promise.all(
    salesToCreate.map(({ productId }) => productsModel.getById(productId)),
  );
  if (allProductsAreAvailable.length !== salesToCreate.length) {
    return {
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
    }; 
  }

  const saleId = await salesModel.createSaleId();
  const saleInfo = await salesModel.createSaleInfo(saleId, salesToCreate);
  return { type: null, message: saleInfo };
};

module.exports = {
  createSales,
};