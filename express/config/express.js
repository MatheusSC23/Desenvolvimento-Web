var bodyParser = require('body-parser')
var express = require('express');
var alunosRouter = require('../app/routes/alunos.js');
var campiRouter = require('../app/routes/campi.js');
module.exports = function() {
	var app = express();
	app.set("port",3000);
	app.use(bodyParser.json()); 
	app.use(bodyParser.urlencoded({ extended:false }));
	app.use(express.static('./public'));
	alunosRouter(app);
	campiRouter(app);
	return app;
};