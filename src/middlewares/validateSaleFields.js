module.exports = (req, res, next) => {
  const sale = req.body;

  if (sale.some(({ productId }) => !productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (sale.some(({ quantity }) => quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};