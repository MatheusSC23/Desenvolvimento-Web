var alunosController = require('./alunos.js');
var cursoId = 4
var campi = [{_id:1,codigo:"CK001",nome:"Pici",cursos:["Computação", "Matemática" , "Geologia"]},{_id:2,codigo:"CK002",nome:"Porangabussu",cursos:["Medicina", "Odontologia" , "Farmácia"]},{_id:3,codigo:"CK003",nome:"Benfica",cursos:["Letras", "Filosofia" , "Direito"]}]

module.exports = campi;

module.exports.listaCampi = function(req,res){
	res.json(campi);
};

module.exports.obterCampus = function(req,res){
	let codigo = req.params.codigo;
	var campus = campi.find(campus => (campus.codigo === codigo));
	if(campus){
		res.json(campus);
	} else {
		res.status(404).send("Erro 404: Campus não encontrado");
	}
}

module.exports.inserirCampus = function(req,res){
	let novoCampus = req.body;
	var campus = campi.find(campus => (campus.codigo === novoCampus.codigo));
	if(campus){
		res.send(" Já existe um campus com esse código");
	} else if(!novoCampus.cursos){
		res.send(" Nenhum curso foi informado");
	} else {
		let data = {_id:cursoId,codigo:novoCampus.codigo,nome:novoCampus.nome,cursos:novoCampus.cursos.split(',')};
		cursoId++;
		campi.push(data);
		res.json(data);
	}
}

module.exports.updateCampus = function(req,res){
	let codigo = req.params.codigo;
	var campus = campi.find(campus => (campus.codigo === codigo));
	if(campus){
		campus.codigo = req.body.codigo;
		campus.nome = req.body.nome;
		campus.cursos = req.body.cursos;
		res.send(campus);
	} else {
		res.status(404).send("Campus não encontrado")
	}
}

module.exports.removeCampus = function(req,res){
	let codigo = req.params.codigo;
	flag = false;
	let index = campi.forEach((v,i) => {
		if(v.codigo === codigo){
			flag = true;
			return i;
		}
	});
	if(flag){
		let campus = campi.splice(index,1)[0];
		let alunos = alunosController.alunos;
		let pos = alunos.length - 1;
		while(pos >= 0){
			if(alunos[pos].campus.toUpperCase() === campus.nome.toUpperCase()){
				alunos.splice(pos,1);
			}
			pos--;
		}
		res.send(campus);
	} else {
		res.status(404).send("Campus não encontrado.")
	}


}