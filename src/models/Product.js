const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const BranchModel = mongoose.model('Product');
const selectString = '-_id -__v';

class Product {

    constructor() {
        this.result = [];
        this.statusCode = 200;
    };

    async getAllProducts({ page = 1, limit = 10 }) {
        try {
            const products = await BranchModel.paginate({}, { page, limit, select: selectString });
            this.result = products;
            // this.result.push(...products);
        } catch (error) {
            console.log('Catch_error: ', error);
            this.result = error;
            this.statusCode = 500;
        } finally {
            return {
                result: this.result,
                statusCode: this.statusCode
            };
        }
    };

    async createProduct(data) {
        try {
            // validateProduct(); Fazer a lógica depois.
            formatProduct(data);
            let productCreated = await BranchModel.create(data);
            productCreated = await BranchModel.find({ id: productCreated.id }).select(selectString);
            this.result = productCreated;
        } catch (error) {
            console.log('Catch_error: ', error);
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

function formatProduct(data){
    data.id = undefined;
    data.rate_stars = undefined;
    data.created_at = undefined;
    data.updated_at = undefined;
}

module.exports = Product;