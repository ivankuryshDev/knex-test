// const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8001;
const knex = require('./db/knex');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/',routes);

app.listen(port, () => {
    console.log(`Listen on port ${port}...`);
});
