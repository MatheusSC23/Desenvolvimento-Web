const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors= require('cors');

module.exports = function() {
    var app = express();
    app.set("port", 3000);
    app.use(bodyParser.json());    
    app.use(cors());   
    app.use(bodyParser.urlencoded({extended:false}));
    app.use('/api', require('../route/campus.js'));
    app.use('/api', require('../route/alunos.js'));
    return app;
 };

