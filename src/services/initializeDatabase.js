const mongoose = require('mongoose');
require('dotenv').config()

module.exports = {
    initializeDatabase() {
        try {
            mongoose.connect(process.env.ENV_MONGODB, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
            mongoose.connection.on('connected', () => {
                console.log("Banco conectado com sucesso!")
            })
        } catch (err) {
            console.log(err);
        }
    }
}