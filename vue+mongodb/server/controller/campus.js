const Campus = require("../models/campus")
const Aluno = require("../models/aluno")

module.exports.listaCampi = function(req, res){
    Campus.find({})
    .then(campus => {
        res.json(campus);
    })
    .catch(err => console.log(err));
}


module.exports.obterCampus = function(req, res){
    var codigo = req.params.codigo;    
    Campus.find({codigo:codigo})
    .then(campus => {
        res.status(200).send(campus)
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Campus não encontrado");
    });
}

module.exports.obterCampusPorNome = function(req, res){
    var nome = req.params.nome;    
    Campus.find({nome:nome})
    .then(campus => {
        res.status(200).send(campus)
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Campus não encontrado");
    });
}

module.exports.inserirCampus = function(req, res){
//    const aluno = new Aluno(req.body.nome, req.body.sobreNome);
    const campus = new Campus(req.body);
    Campus.findOne({codigo:req.body.codigo})
    .then(found => {
        if (found) {
            res.send("Campus já existe.")
        } else {
            campus
               .save()
               .then(res.status(200).send(campus))
               .catch((err => {
                   console.log(err);
               })); 
            
        }
    })
    .catch((err => {
       console.log(err);
   }));
}


module.exports.atualizarCampus = function(req, res){

    Campus.updateMany({codigo:req.params.codigo}, {codigo:req.body.codigo,nome:req.body.nome, cursos:req.body.cursos})
    .then(old_campus => {
            res.send(old_campus)        
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Campus não encontrado");
    });
    
    
}

module.exports.removerCampus = function(req, res){
	Campus.find({codigo:req.params.codigo})
	.then(campus =>{
		Campus.remove({codigo:req.params.codigo})
	    .then(result => {
	            res.send(result)
	            console.log(campus[0]);
	            Aluno.remove({campus:campus[0].nome})
	            .then(alunos =>{
	            	console.log(alunos)
	            })
	            .catch(err => {
			        console.log(err);
			    });
	    })
	    .catch(err => {
	        console.log(err);
	    });
	})
	.catch(err => {
        console.log(err);
        res.status(404).send("Campus não encontrado");
    });
    
}