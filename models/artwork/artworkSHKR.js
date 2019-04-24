var mongoose = require('mongoose');
var random = require('mongoose-random');

const ArtworkSHKRSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    image_thumbnail: {
        type: String,
        required: true
    },
    image_whatermar_thumbnail: {
        type: String,
        required: true
    },
    image_whatermark: {
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
    styleOrMaterial_ru: {
        type: String,
        required: true
    },
    styleOrMaterial_kg: {
        type: String,
        required: true
    },
    styleOrMaterial_eng: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    genre1: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthorArtworkSHKR'
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GenreArtworkSHKR'
    },
    views: String
}, {
    timestamps: true
});

ArtworkSHKRSchema.plugin(random, { path: 'r' });

var ArtworkSHKR = mongoose.model('ArtworkSHKR', ArtworkSHKRSchema);

module.exports = ArtworkSHKR;