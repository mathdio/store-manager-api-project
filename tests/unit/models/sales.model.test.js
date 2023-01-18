const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { saleToCreate, newSaleCreated } = require('./mocks/sales.model.mock');

describe('Sales Model\'s unit tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Create sale id', function () {
    it('If it returns the created sale id', async function () {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);

      const response = await salesModel.createSaleId();
      expect(response).to.equal(1);
    });
  });

  describe('Create sale info', function () {
    it('If it resturns the sale created with id and items sold', async function () {
      // sinon.stub(connection, 'execute').resolves();

      const response = await salesModel.createSaleInfo(3, saleToCreate);
      expect(response).to.deep.equal(newSaleCreated);
    });
  });
});