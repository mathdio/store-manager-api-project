const { mapError } = require('../utils/errorMap');
const { productsService } = require('../services');

const getProducts = async (_req, res) => {
  const { message } = await productsService.getProducts();

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);

  const { type, message } = await productsService.getById(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  getProducts,
  getById,
  createProduct,
};