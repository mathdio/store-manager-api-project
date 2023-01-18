const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { saleToCreate, newSaleCreated, idsInDB, invalidSale, allSalesList, productsSaleList } = require('./mocks/sales.service.mock');

describe('Sales Service\'s unit tests', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Create a sale', function () {
    it('If it resturns a successful response with the created sale', async function () {
      const expected = { type: null, message: newSaleCreated };
      sinon.stub(productsModel, 'getProducts').resolves(idsInDB);
      sinon.stub(salesModel, 'createSaleId').resolves(3);
      sinon.stub(salesModel, 'createSaleInfo').resolves(newSaleCreated)

      const response = await salesService.createSale(saleToCreate);
      expect(response).to.deep.equal(expected);
    });

    it('If it returns a PRODUCT_NOT_FOUND error', async function () {
      const expected = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
      sinon.stub(productsModel, "getProducts").resolves([]);

      const response = await salesService.createSale(saleToCreate);
      expect(response).to.deep.equal(expected);
    });

    it('If it returns an INVALID_INPUT error', async function () {
      const expected = { type: 'INVALID_INPUT', message: '"quantity" must be greater than or equal to 1' };

      const response = await salesService.createSale(invalidSale);
      expect(response).to.deep.equal(expected);
    });
  });

  describe('List all sales', function () {
    it('If it returns successfully a list with all sales', async function () {
      const expected = { type: null, message: allSalesList };
      sinon.stub(salesModel, 'getSales').resolves(allSalesList);

      const response = await salesService.getSales();
      expect(response).to.deep.equal(expected);
    });
  });

  describe("List a sale by id", function () {
    it("If it returns successfully a list with solds of a sale", async function () {
      const expected = { type: null, message: productsSaleList };
      sinon.stub(salesModel, 'getById').resolves(productsSaleList);

      const response = await salesService.getById(1);
      expect(response).to.deep.equal(expected);
    });

    it('If it returns a SALE_NOT_FOUND error', async function () {
      const expected = { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

      sinon.stub(salesModel, "getById").resolves([]);

      const response = await salesService.getById(0);
      expect(response).to.deep.equal(expected);
    });
  });
});