const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CustomerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    },
    address: {
        type: Object
    },
    admin: {
        type: Boolean,
        default: false
    }
});

CustomerSchema.plugin(mongoosePaginate);

mongoose.model('Customer', CustomerSchema);