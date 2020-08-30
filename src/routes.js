require('./schemas/Product');
const ProductController = require('./controllers/Products');
const express = require('express');
const routes = express.Router();

routes.get('/products', ProductController.getAllProducts);
routes.post('/products', ProductController.createProduct);

module.exports = routes;