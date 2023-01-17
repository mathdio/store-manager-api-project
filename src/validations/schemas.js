const Joi = require('joi');

const validateId = (id) => {
  if (id < 1 || id === undefined || typeof id !== 'number' || !Number.isInteger(id)) {
    return {
      type: 'INVALID_INPUT',
      message: 'id value must be greater than or equal to 1',
    };
  }
};

const productNameSchema = Joi.string().min(5).required();

module.exports = {
  validateId,
  productNameSchema,
};