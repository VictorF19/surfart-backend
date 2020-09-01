require('./schemas/Product');
require('./schemas/Customer');

const ProductController = require('./controllers/Products');
const CustomerController = require('./controllers/Customers');

const express = require('express');
const routes = express.Router();

// Products
routes.get('/products', ProductController.getAll);
routes.get('/products/:id', ProductController.getById);
routes.post('/products', ProductController.create);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

// Customers
routes.get('/customers', CustomerController.getAll);
routes.get('/customers/:id', CustomerController.getById);
routes.post('/customers', CustomerController.create);
routes.post('/customers/:id/address', CustomerController.createAddress);
routes.put('/customers/:id', CustomerController.update);
routes.delete('/customers/:id', CustomerController.delete);

module.exports = routes;