var mongoose = require('mongoose');

const AuthorArtworkMuseumKNMIISchema = mongoose.Schema({
    yearsOfLife: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var AuthorArtworkMuseumKNMII = mongoose.model('AuthorArtworkMuseumKNMII', AuthorArtworkMuseumKNMIISchema);

module.exports = AuthorArtworkMuseumKNMII;