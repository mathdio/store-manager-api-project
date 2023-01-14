const { productsModel } = require('../models');
const { idSchema } = require('../validations/schemas');
const validateProductName = require('../validations/validateProductName');

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
  const error = validateProductName(name);
  if (error) return error;

  const newProductId = await productsModel.createProduct(name);
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

const editProduct = async (id, name) => {
  const error = validateProductName(name);
  if (error) return error;

  const isAvailable = await productsModel.getById(id);
  if (!isAvailable) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const editedProductId = await productsModel.editProduct(id, name);
  const editedProduct = await productsModel.getById(id); 

  return { type: null, message: editedProductId };
};

module.exports = {
  getProducts,
  getById,
  createProduct,
  editProduct,
};