const express = require('express')
const app = express()
const bodyParser = require("body-parser"); //untuk menangkap http request dari http

const products = require('./api/routes/products');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ini untuk menonactive kan CORS, karena pasti beda server antara client dan server api
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //semua method post dan put pasti mengirim options dulu sebelum mengirim method
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/', products);

module.exports = app;