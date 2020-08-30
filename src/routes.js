require('./schemas/Product');
const ProductController = require('./controllers/Products');
const express = require('express');
const routes = express.Router();

routes.get('/products', ProductController.getAll);
routes.post('/products', ProductController.create);
routes.put('/products/:id', ProductController.update);

module.exports = routes;