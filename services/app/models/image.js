var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
    },
    way: {
        type: String,
    },
    date: {
        type: String,
    }
});

module.exports.TempImage = mongoose.model('Temp', schema);