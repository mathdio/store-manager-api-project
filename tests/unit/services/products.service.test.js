const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsList, singleProduct } = require('./mocks/products.service.mock');


describe('Products Service\'s unit tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('List all products', function () {
    it('If it all products', async function () {
      sinon.stub(productsService, 'getProducts').resolves(productsList);

      const result = await productsService.getProducts();
      expect(result).to.deep.equal(productsList);
    });
  });

  describe('Return a product', function () {
    it('If it returns a product succefully', async function () {
      sinon.stub(productsModel, 'getById').resolves(singleProduct)

      const result = await productsService.getById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(singleProduct)
    });

    it('If it returns PRODUCT_NOT_FOUND error', async function () {
      const expected = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

      sinon.stub(productsModel, 'getById').resolves(undefined);

      const result = await productsService.getById(1);
      expect(result).to.deep.equal(expected);
    });

    it('If it returns invalid id error', async function () {
      const expected = {
        type: 'INVALID_INPUT',
        message: 'id value must be greater than or equal to 1',
      };

      const result = await productsService.getById(0);
      expect(result).to.deep.equal(expected);
    });
  });

  describe('Create a product', function () {
    it('If it returns invalid name error', async function () {
      const invalidName = 'aa';
      const expected = {
        type: 'INVALID_INPUT',
        message: '"name" length must be at least 5 characters long',
      };

      const result = await productsService.createProduct(invalidName);
      expect(result).to.deep.equal(expected);
    });

    it("If it returns created product successfully", async function () {
      const validName = singleProduct.name;
      const expected = { type: null, message: singleProduct };

      sinon.stub(productsModel, 'getById').resolves(singleProduct);

      const result = await productsService.createProduct(validName);
      expect(result).to.deep.equal(expected);
    });
  });

  describe("Edit a product", function () {
    it("If it returns invalid name error", async function () {
      const invalidName = "aa";
      const expected = {
        type: "INVALID_INPUT",
        message: '"name" length must be at least 5 characters long',
      };

      const result = await productsService.editProduct(1, invalidName);
      expect(result).to.deep.equal(expected);
    });

    it("If it returns PRODUCT_NOT_FOUND error", async function () {
      const mockResolve = undefined;
      const expected = {
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      };

      sinon.stub(productsModel, 'getById').resolves(mockResolve);

      const result = await productsService.editProduct(0, 'Martelo');
      expect(result).to.deep.equal(expected);
    });

    it("If it returns edited product successfully", async function () {
      const expected = { type: null, message: singleProduct };

      sinon.stub(productsModel, "getById").resolves(singleProduct);

      const result = await productsService.editProduct(1, 'Martelo');
      expect(result).to.deep.equal(expected);
    });
  });

  describe("Delete a product", function () {
    it("If it returns invalid id error", async function () {
      const expected = {
        type: "INVALID_INPUT",
        message: "id value must be greater than or equal to 1",
      };

      const result = await productsService.deleteProduct(0);
      expect(result).to.deep.equal(expected);
    });

    it("If it returns PRODUCT_NOT_FOUND error", async function () {
      const mockResolve = undefined;
      const expected = {
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      };

      sinon.stub(productsModel, "getById").resolves(mockResolve);

      const result = await productsService.deleteProduct(1);
      expect(result).to.deep.equal(expected);
    });

    it("If it returns edited product successfully", async function () {
      const mockResolve = undefined;
      const expected = { type: null, message: '' };

      const stub = sinon.stub(productsModel, "getById");
      
      stub.onCall(0).resolves(1);
      stub.onCall(1).resolves(mockResolve);

      const result = await productsService.deleteProduct(1);
      expect(result).to.deep.equal(expected);
    });
  });
});