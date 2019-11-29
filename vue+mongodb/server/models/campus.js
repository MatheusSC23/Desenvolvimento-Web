const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const CampusSchema = new Schema(
    {
    	codigo : String,
        nome : String,
        cursos : [String],
    }
);

module.exports = mongoose.model('Campus', CampusSchema);