const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const ProductModel = mongoose.model('Product');

const selectString = '-_id -__v';

class Product {

    constructor() {
        this.result = [];
        this.statusCode = 200;
    };

    response() {
        return {
            result: this.result,
            statusCode: this.statusCode
        };
    }

    validate(data) {
        data.isInvalid = false;
        const missing = new Array();
        ['title', 'category', 'image'].forEach(item => {
            if (!data[item]) missing.push(item);
        });
        if (missing.length) {
            this.result = {
                message: `The fields are missing: ${missing.join().replace(/\,/g, ', ')}`
            };
            this.statusCode = 400;
            data.isInvalid = true;
        }
        return data;
    }

    formatProduct(data, isUpdated = false) {
        data.id = undefined;
        data.rate_stars = undefined;
        data.created_at = undefined;

        if (isUpdated) {
            data.updated_at = undefined;
        }

        for (const prop in data) {
            if (!data[prop]) delete data[prop];
        }
    }

    async getAll({ page = 1, limit = 10 }) {
        try {
            const products = await ProductModel.paginate({}, { page, limit, select: selectString });

            this.result = products;
            this.statusCode = 200;

        } catch (error) {
            console.error('Catch_error: ', error);
            this.result = error;
            this.statusCode = 500;
        } finally {
            return this.response();
        }
    };

    async create(data) {
        try {
            const validProduct = this.validate(data);

            if (validProduct.isInvalid) {
                return this.response();
            }

            formatProduct(data);
            console.log('data: ', data)
            return this.response()
        } catch (error) {
            console.error('Catch_error: ', error);
            this.result = error;
            this.statusCode = 500;
        } finally {
            return this.response();
        }
    };

    async update(id, data) {
        try {

            formatProduct(data, true);
            const updatedProduct = await ProductModel.findOneAndUpdate({ id }, data, { new: true });

            this.result = updatedProduct;
            this.statusCode = 200;

        } catch (error) {
            console.error('Catch_error: ', error);
            this.result = error;
            this.statusCode = 500;
        } finally {
            return this.response();
        }
    };

    async delete(id) {
        try {
            const deletedProduct = await ProductModel.findOneAndDelete({ id });

            this.result = deletedProduct;
            this.statusCode = 200;

        } catch (error) {

            console.error('Catch_error: ', error);
            this.result = error;
            this.statusCode = 500;

        } finally {

            return this.response();
        }
    };
}

function formatProduct(data, isUpdated = false) {
    data.id = undefined;
    data.rate_stars = undefined;
    data.created_at = undefined;

    if (isUpdated) {
        data.updated_at = undefined;
    }

    for (const prop in data) {
        if (!data[prop]) delete data[prop];
    }
}

module.exports = Product;