const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { productsList } = require('./mocks/products.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Products Controller\'s unit tests', function () {
  afterEach(sinon.restore);

  describe('List of all products', function () {
    it('If it returns an successfully response', async function () {
      sinon.stub(productsService, 'getProducts').resolves({ type: null, message: productsList });

      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProducts(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(productsList);
    });
  });
});