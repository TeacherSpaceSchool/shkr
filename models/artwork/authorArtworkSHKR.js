var mongoose = require('mongoose');

const AuthorArtworkSHKRSchema = mongoose.Schema({
    photos: {
        type: String,
        required: true
    },
    photos_thumbnail: {
        type: [String],
        required: true
    },
    yearsOfLife: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    biography_ru: {
        type: String,
        required: true
    },
    biography_kg: {
        type: String,
        required: true
    },
    biography_eng: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var AuthorArtworkSHKR = mongoose.model('AuthorArtworkSHKR', AuthorArtworkSHKRSchema);

module.exports = AuthorArtworkSHKR;