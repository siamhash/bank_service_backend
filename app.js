
const express = require('express');
require('dotenv').config();
const bodyparser = require("body-parser");
const bearerToken = require('express-bearer-token');
const app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'application/uploads')));
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(bodyparser.json({ limit: '50mb', extended: true }))
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bearerToken());
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Origin",
        "Origin", "x-Requested-With", "Content-Type", "Accept", "Authorization",
    );
    if(req.method==='OPTIONS'){
     res.header("Access-Control-Allow-Methods", 'PUT,  PATCH, GET, DELETE, POST,');
     return res.status(200).json({})
    }
    next();
})

app.use('/', require('./application/routes'));

app.use((req, res, next)=>{
    const error= new Error('Not found');
    error.status =404;
    next(error)
})

app.use((error,req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{message:error.message}})
})
app.get((req, res, next)=>{
    res.status(200).json({Api_status:'started'})
})
module.exports = app;