var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const AuthorArtworkMuseumKNMIISchema = mongoose.Schema({
    yearsOfLife: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    }
}, {
    timestamps: true
});

AuthorArtworkMuseumKNMIISchema.plugin(uniqueValidator);

var AuthorArtworkMuseumKNMII = mongoose.model('AuthorArtworkMuseumKNMII', AuthorArtworkMuseumKNMIISchema);

module.exports = AuthorArtworkMuseumKNMII;