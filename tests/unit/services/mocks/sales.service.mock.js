const saleToCreate = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleCreated = {
  id: 3,
  itemsSold: saleToCreate,
};

const idsInDB = [
  { id: 1 },
  { id: 2 },
];

const invalidSale = [
  {
    productId: 1,
    quantity: 0,
  }
]

const allSalesList = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 1,
  },
  {
    saleId: 2,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const productsSaleList = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  saleToCreate,
  newSaleCreated,
  idsInDB,
  invalidSale,
  allSalesList,
  productsSaleList,
};
