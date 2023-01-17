module.exports = (sale) => {
  if (sale.some(({ quantity }) => quantity < 1)) {
    return {
      type: 'INVALID_INPUT',
      message: '"quantity" must be greater than or equal to 1',
    };
  }
};