module.exports = (salesToCreate) => {
  if (salesToCreate.some(({ quantity }) => quantity < 1)) {
    return {
      type: 'INVALID_INPUT',
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  
  if (salesToCreate.some(({ productId }) => !productId)) {
    return { type: 'BAD_REQUEST', message: '"productId" is required' };
  }
  
  if (salesToCreate.some(({ quantity }) => !quantity)) {
    return { type: 'BAD_REQUEST', message: '"quantity" is required' };
  }
};