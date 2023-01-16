const { productsModel } = require('../models');

module.exports = async (salesToCreate) => {
  if (salesToCreate.some(({ quantity }) => quantity < 1)) {
    return {
      type: 'INVALID_INPUT',
      message: '"quantity" must be greater than or equal to 1',
    };
  } if (salesToCreate.some(({ productId }) => !productId)) {
    return { type: 'BAD_REQUEST', message: '"productId" is required' };
  } if (salesToCreate.some(({ quantity }) => !quantity)) {
    return { type: 'BAD_REQUEST', message: '"quantity" is required' };
  }
  const areAvailable = salesToCreate.map(async ({ productId }) => {
    await productsModel.getById(productId);
  });
  const availabilityList = await Promise.all(areAvailable);
  if (availabilityList.some((product) => !product)) {
    return { type: 'SALE_NOT_FOUND', message: availabilityList };
  }
};