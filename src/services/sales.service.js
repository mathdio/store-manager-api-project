const { productsModel, salesModel } = require('../models');
const validateSalesInputFields = require('../validations/validateSalesInputFields');

const createSales = async (salesToCreate) => {
  const error = validateSalesInputFields(salesToCreate);
  if (error) return error;
  // if (salesToCreate.some(({ productId }) => !productId)) {
  //   return { type: 'BAD_REQUEST', message: '"productId" is required' };
  // }

  // const allProductsAreAvailable = Promise.all(
  //   salesToCreate.map(({ productId }) => productsModel.getById(productId)),
  // );
  // if (allProductsAreAvailable.length !== salesToCreate.length) {
  //   return {
  //       type: 'PRODUCT_NOT_FOUND',
  //       message: 'Product not found',
  //   };
  // }
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

const getSales = async () => {
  const sales = await salesModel.getSales();

  return { type: null, message: sales };
};

module.exports = {
  createSales,
  getSales,
};