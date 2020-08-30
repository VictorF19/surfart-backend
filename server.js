const express = require('express');
const cors = require('cors');
const dataBase = require('./src/services/initializeDatabase');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

dataBase.initializeDatabase();

app.use('/api', require('./src/routes'));

app.listen(process.env.PORT || 3000);