const Aluno = require("../models/aluno")
const Campus = require("../models/campus")

module.exports.listaAlunos = function(req, res){
    Aluno.find({})
    .then(alunos => {
        res.json(alunos);
    })
    .catch(err => console.log(err));
}

module.exports.obterAluno = function(req, res){
    var matricula = req.params.matricula;    
    Aluno.find({matricula:matricula})
    .then(aluno => {
        res.status(200).send(aluno)
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Aluno não encontrado");
    });
}

module.exports.inserirAluno = function(req, res){
//    const aluno = new Aluno(req.body.nome, req.body.sobreNome);
    const aluno = new Aluno(req.body);
    Aluno.findOne({matricula:req.body.matricula})
    .then(found => {
        if (found) {
            res.send("Aluno já existe.")
        } else {
            Campus.find({nome:aluno.campus})
            .then(campus =>{
                if(campus.length){
                    aluno
                   .save()
                   .then(res.status(200).send(aluno))
                   .catch((err => {
                       console.log(err);
                   }));
                } else {
                    res.status(404).send("O campus do aluno não existe.");
                } 
            })
            .catch((err => {
               console.log(err);
            }));
            
            
        }
    })
    .catch((err => {
       console.log(err);
   }));
}


module.exports.atualizarAluno = function(req, res){

    Aluno.updateMany({matricula:req.params.matricula}, {matricula:req.body.matricula,nome:req.body.nome, campus:req.body.campus})
    .then(old_aluno => {
            res.send(old_aluno)        
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Aluno não encontrado");
    });
    
    
}

module.exports.removerAluno = function(req, res){
    Aluno.remove({matricula:req.params.matricula})
    .then(old_aluno => {
            res.send(old_aluno)
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Aluno não encontrado");
    });
}


