var mongoose = require('mongoose');

const GenreArtworkSHKRSchema = mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    photo_thumbnail: {
        type: String,
        required: true
    },
    description_ru: {
        type: String,
        required: true
    },
    description_kg: {
        type: String,
        required: true
    },
    description_eng: {
        type: String,
        required: true
    },
    name_ru: {
        type: String,
        required: true
    },
    name_kg: {
        type: String,
        required: true
    },
    name_eng: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


var GenreArtworkSHKR = mongoose.model('GenreArtworkSHKR', GenreArtworkSHKRSchema);

module.exports = GenreArtworkSHKR;