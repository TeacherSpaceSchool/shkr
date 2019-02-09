var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var random = require('mongoose-random');

const ArtworkMuseumKNMIISchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
        unique: false
    },
    image_thumbnail: {
        type: String,
        required: true,
        unique: false
    },
    image_whatermar_thumbnail: {
        type: String,
        required: true,
        unique: false
    },
    image_whatermark: {
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
    styleOrMaterial_ru: {
        type: String,
        required: true,
        unique: false
    },
    styleOrMaterial_kg: {
        type: String,
        required: true,
        unique: false
    },
    styleOrMaterial_eng: {
        type: String,
        required: true,
        unique: false
    },
    size: {
        type: String,
        required: true,
        unique: false
    },
    date: {
        type: String,
        required: true,
        unique: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthorArtworkMuseumKNMII'
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GenreArtworkMuseumKNMII'
    },
    views: String
}, {
    timestamps: true
});

ArtworkMuseumKNMIISchema.plugin(uniqueValidator);
ArtworkMuseumKNMIISchema.plugin(random, { path: 'r' });

var ArtworkMuseumKNMII = mongoose.model('ArtworkMuseumKNMII', ArtworkMuseumKNMIISchema);

module.exports = ArtworkMuseumKNMII;