const { expect } = require('chai');
const sinon = require('sinon');

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { newSaleCreated, saleToCreate, allSalesList, productsSaleList } = require('./mocks/sales.controller.mock');


describe('Sales controller\'s unit tests', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Create a sale', function () {
    it('If it returns a successful response', async function () {
      const mockResolve = { type: null, message: newSaleCreated };
      sinon.stub(salesService, 'createSale').resolves(mockResolve)

      const req = { body: saleToCreate };
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);
      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledOnceWith(newSaleCreated);
    });
  });

  describe('List all sales', function () {
    it('If it returns a successful response with a list with all sales', async function () {
      const mockResolve = { type: null, message: allSalesList };
      sinon.stub(salesService, 'getSales').resolves(mockResolve);

      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getSales(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(allSalesList);
    });
  });

  describe('List sale\'s products sold', function () {
    it('If it returns a successful response with a list of products sold in a sale', async function () {
      const mockResolve = { type: null, message: productsSaleList };
      sinon.stub(salesService, 'getById').resolves(mockResolve);

      const req = { params: { id: '1' } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getById(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(productsSaleList);
    });

    it('If it returns a SALE_NOT_FOUND error', async function () {
      const mockResolve = { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
      sinon.stub(salesService, 'getById').resolves(mockResolve);

      const req = { params: { id: "9999" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getById(req, res);
      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({ message: 'Sale not found' });
    });
  })
});