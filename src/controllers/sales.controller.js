const { mapError } = require('../utils/errorMap');
const { salesService } = require('../services');

const createSales = async (req, res) => {
  const salesToCreate = req.body;
  // validar se é array?
  const { type, message } = await salesService.createSales(salesToCreate);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const { type, message } = await salesService.getSales();
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);

  const { type, message } = await salesService.getById(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createSales,
  getSales,
  getById,
};