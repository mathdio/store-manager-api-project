const { productsService } = require('../services');

const getProducts = async (_req, res) => {
  const { message } = await productsService.getProducts();

  res.status(200).json(message);
};

module.exports = {
  getProducts,
};