const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const selectString = '-_id -__v';

module.exports = {
    
    async getAllProducts(req, res) {
        const { page = 1 } = req.query;
        
        return res.json(animals);
    }
};