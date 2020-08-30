const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const ProductModel = mongoose.model('Product');

const selectString = '-_id -__v';

class Product {

    constructor() {
        this.result = [];
        this.statusCode = 200;
    };

    async getAllProducts({ page = 1, limit = 10 }) {
        try {
            const products = await ProductModel.paginate({}, { page, limit, select: selectString });
            
            this.result = products;
            this.statusCode = 200;

        } catch (error) {
            console.error('Catch_error: ', error);

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

            let productCreated = await ProductModel.create(data);
            productCreated = await ProductModel.find({ id: productCreated.id }).select(selectString);

            this.result = productCreated;
            this.statusCode = 200;
            
        } catch (error) {
            console.error('Catch_error: ', error);
            
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