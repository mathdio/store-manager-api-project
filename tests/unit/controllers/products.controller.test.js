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
    it('If it returns a successful response with a list of all products', async function () {
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
    it('If it returns a successful response with a product', async function () {
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

  describe('Create a product', function () {
    it('If it returns a successful response with the created product', async function () {
      const mockResolve = { type: null, message: singleProduct }
      sinon.stub(productsService, 'createProduct').resolves(mockResolve);

      const req = { body: { name: 'Martelo de Thor' } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);
      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledOnceWith(singleProduct);
    });

    it('If it returns an INVALID_INPUT error', async function () {
      const mockResolve = { type: 'INVALID_INPUT', message: '"name" length must be at least 5 characters long' };
      sinon.stub(productsService, 'createProduct').resolves(mockResolve);

      const req = { body: { name: 'Thor' } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.createProduct(req, res);
      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledOnceWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Edit a product', function () {
    it('If it returns a successful response with the edited product', async function () {
      const mockResolve = { type: null, message: singleProduct }
      sinon.stub(productsService, 'editProduct').resolves(mockResolve);

      const req = {
        body: { name: 'Martelo de Thor' },
        params: { id: '1' }
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.editProduct(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(singleProduct);
    });

    it('If it returns an INVALID_INPUT error', async function () {
      const mockResolve = { type: 'INVALID_INPUT', message: '"name" length must be at least 5 characters long' };
      sinon.stub(productsService, 'editProduct').resolves(mockResolve);

      const req = {
        body: { name: 'Martelo de Thor' },
        params: { id: '1' }
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.editProduct(req, res);
      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledOnceWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Delete a product', function () {
    it('If it returns a successful response', async function () {
      const mockResolve = { type: null, message: '' }
      sinon.stub(productsService, 'deleteProduct').resolves(mockResolve);

      const req = { params: { id: '1' } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledOnceWith(204);
      expect(res.json).to.have.been.calledOnceWith('');
    });

    it('If it returns an PRODUCT_NOT_FOUND error', async function () {
      const mockResolve = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
      sinon.stub(productsService, 'deleteProduct').resolves(mockResolve);

      const req = { params: { id: '999' } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({ message: 'Product not found' });
    });
  });
});