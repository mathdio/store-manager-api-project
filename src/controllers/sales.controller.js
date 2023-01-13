const { salesService } = require('../services/index');
const { mapError } = require('../utils/errorMap');

const createSales = async (req, res) => {
  const salesToCreate = req.body;
  // validar se é array?
  const { type, message } = await salesService.createSales(salesToCreate);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createSales,
};