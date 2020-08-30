
const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/Products');

routes.get('/products', ProductController.getAllProducts);

module.exports = routes;