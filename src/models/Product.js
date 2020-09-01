const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const ProductModel = mongoose.model('Product');

const selectString = '-_id -__v';

class Product {

    constructor() {
        this.result = [];
        this.statusCode = 200;
    };

    setResponse(result, statusCode = 200) {
        this.result = result;
        this.statusCode = statusCode;
    }

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
            data.isInvalid = true;
            this.setResponse({}, 400);
        }
        return data;
    }

    formatRequest(data, isUpdated = false) {
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
            this.setResponse(products);

        } catch (error) {
            console.error('Catch_error: ', error);
            this.setResponse(error, 500);
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

            formatRequest(data);
            let productCreated = await BranchModel.create(data);
            productCreated = await BranchModel.find({ id: productCreated.id }).select(selectString);
            this.setResponse(productCreated);

        } catch (error) {
            console.error('Catch_error: ', error);
            this.setResponse(error, 500);
        } finally {
            return this.response();
        }
    };

    async update(id, data) {
        try {

            formatRequest(data, true);
            const updatedProduct = await ProductModel.findOneAndUpdate({ id }, data, { new: true });
            this.setResponse(updatedProduct);

        } catch (error) {
            console.error('Catch_error: ', error);
            this.setResponse(error, 500);
        } finally {
            return this.response();
        }
    };

    async delete(id) {
        try {

            const deletedProduct = await ProductModel.findOneAndDelete({ id });
            this.setResponse(deletedProduct);

        } catch (error) {
            console.error('Catch_error: ', error);
            this.setResponse(error, 500);
        } finally {
            return this.response();
        }
    };
}

function formatRequest(data, isUpdated = false) {
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