require('./schemas/Product');
const ProductController = require('./controllers/Products');
const express = require('express');
const Product = require('./models/Product');
const routes = express.Router();

routes.get('/products', ProductController.getAll);
routes.post('/products', ProductController.create);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

module.exports = routes;