const Product = require('../models/Product');

module.exports = {
    async getAllProducts(req, res) {
        const product = new Product();

        const result = await product.getAllProducts(req.query);
        return res.status(result.statusCode).send(result.result);
    },
    async createProduct(req, res) {
        const product = new Product();

        const result = await product.createProduct(req.body);
        return res.status(result.statusCode).send(result.result);
    }
};