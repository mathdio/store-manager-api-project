const { productsModel } = require('../models');

const getProducts = async () => {
  const products = await productsModel.getProducts();

  return { type: null, message: products };
};

module.exports = {
  getProducts,
};