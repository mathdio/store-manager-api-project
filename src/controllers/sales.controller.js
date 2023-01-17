const { mapError } = require('../utils/errorMap');
const { salesService } = require('../services');

const createSale = async (req, res) => {
  const saleToCreate = req.body;
  
  const { type, message } = await salesService.createSale(saleToCreate);
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

const deleteSale = async (req, res) => {
  const id = Number(req.params.id);
  
  const { type, message } = await salesService.deleteSale(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).json(message);
};

const editSale = async (req, res) => {
  const id = Number(req.params.id);
  const saleToEdit = req.body;

  const { type, message } = await salesService.editSale(id, saleToEdit);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};
  
module.exports = {
  createSale,
  getSales,
  getById,
  deleteSale,
  editSale,
};