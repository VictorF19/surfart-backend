const mongoose = require('mongoose');
const BranchModel = mongoose.model('Product');
const selectString = '-_id -__v';

class Product {

    constructor() {
        this.result = [];
        this.statusCode = 200;
    };

    async getAllProducts(paginationEnabled, page, limit) {

        try {

           

        } catch (error) {

            console.error(error);

            this.result = error;
            this.statusCode = 500;

        } finally {

            return {
                result: this.result,
                statusCode: this.statusCode
            };
        }
    };

   
}

module.exports = Product;