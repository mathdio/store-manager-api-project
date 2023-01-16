const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

const { productsFromDB, singleProduct } = require('./mocks/products.model.mock');

describe('Products Model\'s unit tests', function () {
  describe('List all products', function () {
    after(function () {
      sinon.restore();
    });

    it('If lists all products', async function () {
      sinon.stub(connection, 'execute').resolves([productsFromDB]);

      const result = await productsModel.getProducts();

      expect(result).to.deep.equal(productsFromDB);
    });
  });

  describe('Return one product by id', function () {
    it('If returns one product', async function () {
      sinon.stub(connection, 'execute').resolves([[singleProduct]]);

      const result = await productsModel.getById(1);
      expect(result).to.deep.equal(singleProduct);
    });
  });
});