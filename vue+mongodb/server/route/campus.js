const controller = require("../controller/campus.js");
const express = require('express');
const routes = express.Router();

routes.get("/campi", controller.listaCampi);
//routes.get("/campi/:codigo", controller.obterCampus);
routes.get("/campi/:nome", controller.obterCampusPorNome);
routes.post("/campi", controller.inserirCampus);
routes.put("/campi/:codigo", controller.atualizarCampus);
routes.delete("/campi/:codigo", controller.removerCampus);


module.exports = routes;


