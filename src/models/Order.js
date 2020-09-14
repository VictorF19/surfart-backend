const OrderItensTransformation = require('../data-transformation/Order-items');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const OrderModel = mongoose.model('Order');
const CustomerModel = mongoose.model('Customer');
const ProductModel = mongoose.model('Product');

const selectString = '-_id -__v';

class Order {

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

    validate(data, validateArray) {
        const missing = new Array();
        validateArray.forEach(item => {
            if (!data[item]) missing.push(item);
        });
        if (missing.length) {
            const result = {
                message: `The fields are missing: ${missing.join().replace(/\,/g, ', ')}`
            };
            data.isInvalid = true;
            this.setResponse(result, 400);
        }
        return data;
    }

    formatRequest(data, isUpdated = false) {

        data.id = undefined;
        data.price = undefined;
        data.updated_at = undefined;
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

            const categories = await OrderModel.paginate({}, { page, limit, select: selectString });
            this.setResponse(categories);

        } catch (error) {
            console.error('Catch_error: ', error);
            this.setResponse(error, 500);
        } finally {
            return this.response();
        }
    };

    async getById(id) {
        try {

            const categories = await OrderModel.find({ id });
            this.setResponse(categories);

        } catch (error) {
            console.error('Catch_error: ', error);
            this.setResponse(error, 500);
        } finally {
            return this.response();
        }
    };

    async create(data) {
        try {

            const validOrder = this.validate(data, ['customer_id', 'items', 'value', 'toDelivery', 'billing_address']);
            if (validOrder.isInvalid) {
                return;
            }

            const customerValidate = await validateCustomer(data);
            if (customerValidate.isInvalid) {
                return this.response();
            }

            const itemsValidate = await validateItems(data);
            if (itemsValidate.isInvalid) {
                return this.response();
            }

            this.formatRequest(data);
            const categoryCreated = await OrderModel.create(data);
            this.setResponse(categoryCreated);

        } catch (error) {
            console.error('Catch_error: ', error);
            this.setResponse(error, 500);
        } finally {
            return this.response();
        }
    };

    async update(id, data) {
        try {

            this.formatRequest(data);
            const updatedCategory = await OrderModel.findOneAndUpdate({ id }, data, { new: true });
            updatedCategory = await OrderModel.findById(id);
            this.setResponse(updatedCategory);

        } catch (error) {
            console.error('Catch_error: ', error);
            this.setResponse(error, 500);
        } finally {
            return this.response();
        }
    };

    async delete(id) {
        try {

            const deletedCategory = await OrderModel.findOneAndDelete({ id });
            this.setResponse(deletedCategory);

        } catch (error) {
            console.error('Catch_error: ', error);
            this.setResponse(error, 500);
        } finally {
            return this.response();
        }
    };
}

async function validateCustomer(data) {

    const customer = await CustomerModel.findById(data.customer_id);

    if (!customer) {
        this.setResponse({ message: `Customer ${data.customer_id} not found` }, 400);
        return { isInvalid: true };
    }

    customer.historic = undefined;
    customer.__v = undefined;
    data.customer_id = undefined;
    data.customer = customer;

    return { isInvalid: false };

}

async function validateItems(data) {

    const products = await ProductModel.find().where('id').in(data.items).exec();

    if (!products) {
        this.setResponse({ message: 'These products are not found' }, 400);
        return { isInvalid: true };
    }

    data.value = products.reduce((a, b) => a.price + b.price);
    data.items = products;

    return { isInvalid: false };

}

module.exports = Order;