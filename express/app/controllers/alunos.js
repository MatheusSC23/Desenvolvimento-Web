let campi = require('./campi.js')
alunoId = 3;
var alunos = [{_id:2,nome:"Ana",matricula:"400500",campus:"Pici"},{_id:1, nome:"Matheus",matricula:"400501",campus:"Pici"}]; 

module.exports.alunos = alunos;

module.exports.listaAlunos = function(req,res){
	res.json(alunos);
};

module.exports.obterAluno = function(req,res){
	let matricula = req.params.matricula;
	var aluno = alunos.find(aluno => (aluno.matricula === matricula));
	if(aluno){
		res.json(aluno);
	}
	else{
		res.status(404).send("Erro 404: Aluno não encontrado");
	}
};

module.exports.inserirAluno = function(req,res){
	let novoAluno = req.body;
	let aluno = alunos.find(aluno => (aluno.matricula === novoAluno.matricula))
	let campus = campi.find(campus => (campus.nome.toUpperCase() === novoAluno.campus.toUpperCase()));
	if(aluno){
		res.send(" Já existe um aluno com essa matrícula");
	} else if(!novoAluno.campus || !campus){
		res.send(" Aluno necessita de um campus existente.");
	} else {
		alunos.push({_id:alunoId,nome:novoAluno.nome,matricula:novoAluno.matricula,campus:novoAluno.campus});
		alunoId ++;
		res.json(req.body);
	}

}

module.exports.updateAluno = function(req,res){
	let matricula = parseInt(req.params.matricula);
	let aluno = alunos.find(aluno => (parseInt(aluno.matricula) === matricula));
	
	if(aluno){
		aluno.nome = req.body.nome;
		aluno.campus = req.body.campus;
		aluno.matricula = req.body.matricula;
		res.send(req.body);
	} else {
		res.status(404).send("Aluno não encontrado.")
	}

}

module.exports.removeAluno = function(req,res){
	let matricula = parseInt(req.params.matricula);
	let flag = false;
	let index = alunos.forEach((v,i) => {
		if(parseInt(v.matricula) === matricula){
			flag = true;
			return i;
		}
	});
	if(flag){
		res.send(alunos.splice(index,1));
	} else {
		res.status(404).send("Aluno não encontrado")
	}
}