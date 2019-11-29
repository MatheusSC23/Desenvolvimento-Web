const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const AlunoSchema = new Schema(
    {
    	matricula : String,
        nome : String,
        email: String,
        dataNasc: Date,
        campus : String,
        ddd: String,
        tel: String,
        operadora:String,
        campus:String,
        curso: String
    }
);



module.exports = mongoose.model('Aluno', AlunoSchema);

