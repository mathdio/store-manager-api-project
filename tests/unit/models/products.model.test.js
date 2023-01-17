const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

const { productsFromDB, singleProduct, editedProduct, searchedByName } = require('./mocks/products.model.mock');

describe('Products Model\'s unit tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('List all products', function () {
    it('If it lists all products', async function () {
      sinon.stub(connection, 'execute').resolves([productsFromDB]);

      const result = await productsModel.getProducts();

      expect(result).to.deep.equal(productsFromDB);
    });
  });

  describe('Return a product queried by id', function () {
    it('If it returns a product', async function () {
      sinon.stub(connection, 'execute').resolves([[singleProduct]]);

      const result = await productsModel.getById(1);
      expect(result).to.deep.equal(singleProduct);
    });
  });

  describe('Create a product', function () {
    it('If it returns created product\'s id', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

      const result = await productsModel.createProduct('Martelo');
      expect(result).to.equal(1);
    });
  });

  describe('Edit a product', function () {
    it('If it returns the edited product', async function () {
      sinon.stub(connection, 'execute').resolves(editedProduct);

      const result = await productsModel.editProduct(1, 'Stormbreaker');
      expect(result).to.deep.equal(editedProduct);
    });
  });

  describe('Delete a product', function () {
    it('If it deletes a product', async function () {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);

      await productsModel.deleteProduct(1);
      const result = await productsModel.getById(1);
      expect(result).to.equal(undefined);
    });
  });

  describe('Search products by name', function () {
    it("If it returns a list of products", async function () {
      sinon.stub(connection, "execute").resolves([searchedByName]);

      const result = await productsModel.getByName("Martelo");
      expect(result).to.equal(searchedByName);
    });
  });
});