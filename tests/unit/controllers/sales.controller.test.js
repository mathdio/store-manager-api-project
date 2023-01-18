const { expect } = require('chai');
const sinon = require('sinon');

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { newSaleCreated, saleToCreate } = require('./mocks/sales.controller.mock');


describe('Sales controller\'s unit tests', function () {
  describe('Create a sale', function () {
    it('If it returns a successful response', async function () {
      const mockResolve = { type: null, message: newSaleCreated };
      sinon.stub(salesService, 'createSale').resolves(mockResolve)

      const req = { body: saleToCreate };
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const response = await salesController.createSale(req, res);
      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledOnceWith(newSaleCreated);
    });
  });
});