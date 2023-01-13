const { productsModel } = require('../models');
const { idSchema } = require('./validations/schemas');

const getProducts = async () => {
  const products = await productsModel.getProducts();

  return { type: null, message: products };
};

const getById = async (id) => {
  const error = idSchema.validate(id);
  if (error.type) return error;

  const product = await productsModel.getById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  // validação
  const newProductId = await productsModel.createProduct(name);
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getProducts,
  getById,
  createProduct,
};