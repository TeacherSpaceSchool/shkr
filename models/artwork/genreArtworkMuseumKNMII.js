var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const GenreArtworkMuseumKNMIISchema = mongoose.Schema({
    photo: {
        type: String,
        required: true,
        unique: false
    },
    photo_thumbnail: {
        type: String,
        required: true,
        unique: false
    },
    description_ru: {
        type: String,
        required: true,
        unique: false
    },
    description_kg: {
        type: String,
        required: true,
        unique: false
    },
    description_eng: {
        type: String,
        required: true,
        unique: false
    },
    name_ru: {
        type: String,
        required: true,
        unique: false
    },
    name_kg: {
        type: String,
        required: true,
        unique: false
    },
    name_eng: {
        type: String,
        required: true,
        unique: false
    },
}, {
    timestamps: true
});

GenreArtworkMuseumKNMIISchema.plugin(uniqueValidator);

var GenreArtworkMuseumKNMII = mongoose.model('GenreArtworkMuseumKNMII', GenreArtworkMuseumKNMIISchema);

module.exports = GenreArtworkMuseumKNMII;