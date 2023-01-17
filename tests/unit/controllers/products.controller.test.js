const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { productsList, singleProduct } = require('./mocks/products.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Products Controller\'s unit tests', function () {
  afterEach(sinon.restore);

  describe('List all products', function () {
    it('If it returns a successful response', async function () {
      const mockResolve = { type: null, message: productsList };
      sinon.stub(productsService, 'getProducts').resolves(mockResolve);

      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProducts(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(productsList);
    });
  });

  describe('List a product by id', function () {
    it('If it returns a successful response', async function () {
      const mockResolve = { type: null, message: singleProduct };
      sinon.stub(productsService, 'getById').resolves(mockResolve);

      const req = { params: { id: 1 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getById(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(singleProduct);
    });

    it("If it returns a PRODUCT_NOT_FOUND error", async function () {
      const mockResolve = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
      sinon.stub(productsService, 'getById').resolves(mockResolve);

      const req = { params: { id: 999 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getById(req, res);
      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({ message: 'Product not found' });
    });
  });
});