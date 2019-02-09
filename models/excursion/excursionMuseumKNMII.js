var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const ExcursionMuseumKNMIISchema = mongoose.Schema({
    type_ru: {
        type: String,
        required: true,
        unique: false
    },
    name_ru: {
        type: String,
        required: true,
        unique: false
    },
    type_kg: {
        type: String,
        required: true,
        unique: false
    },
    name_kg: {
        type: String,
        required: true,
        unique: false
    },
    type_eng: {
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

ExcursionMuseumKNMIISchema.plugin(uniqueValidator);

var ExcursionMuseumKNMII = mongoose.model('ExcursionMuseumKNMII', ExcursionMuseumKNMIISchema);

module.exports = ExcursionMuseumKNMII;