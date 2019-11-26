var controller = require("../controllers/campi.js");

module.exports = function(app){
	app.get("/api/campi", controller.listaCampi);
	app.get("/api/campi/:codigo", controller.obterCampus);
	app.post("/api/campi", controller.inserirCampus);
	app.put("/api/campi/:codigo", controller.updateCampus);
	app.delete("/api/campi/:codigo", controller.removeCampus)
}
