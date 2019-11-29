const controller = require("../controller/alunos.js");
const express = require('express');
const routes = express.Router();


routes.get("/alunos", controller.listaAlunos);
routes.get("/alunos/:matricula", controller.obterAluno);
routes.post("/alunos", controller.inserirAluno);
routes.put("/alunos/:matricula", controller.atualizarAluno);
routes.delete("/alunos/:matricula", controller.removerAluno);
module.exports = routes;