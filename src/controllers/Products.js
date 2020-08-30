let Product = require('../models/Product');
const mongoose = require('mongoose');
const selectString = '-_id -__v';

Product = new Product();

module.exports = {
    async getAllProducts(req, res) {
        await Product.getAllProducts(req.query);
        return res.status(Product.statusCode).send(Product.result);
    },
    async createProduct(req, res) {
        await Product.createProduct(req.body);
        return res.status(Product.statusCode).send(Product.result);
    }
};