module.exports = (name) => {
  if (name.length < 5) {
    return {
      type: 'INVALID_INPUT',
      message: '"name" length must be at least 5 characters long',
    };
  }
};