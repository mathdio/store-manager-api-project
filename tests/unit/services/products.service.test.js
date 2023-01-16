const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsList, singleProduct } = require('./mocks/products.service.mock');


describe('Products Service\'s unit tests', function () {
  describe('List all products', function () {
    it('If it all products', async function () {
      sinon.stub(productsService, "getProducts").resolves(productsList);

      const result = await productsService.getProducts();
      expect(result).to.deep.equal(productsList);
    });
  });

  describe('Return one product', function () {
    it('If it returns one product succefully', async function () {
      sinon.stub(productsModel, 'getById').resolves(singleProduct)

      const result = await productsService.getById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(singleProduct)
    });
  });
});