var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const NameMuseumKNMIISchema = mongoose.Schema({
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
    adress: {
        type: String,
        required: true,
        unique: false
    },
    phonenumber: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    url: {
        type: String,
        required: true,
        unique: false
    },
}, {
    timestamps: true
});

NameMuseumKNMIISchema.plugin(uniqueValidator);

var NameMuseumKNMII = mongoose.model('NameMuseumKNMII', NameMuseumKNMIISchema);

module.exports = NameMuseumKNMII;