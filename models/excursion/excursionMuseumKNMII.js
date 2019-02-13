var mongoose = require('mongoose');

const ExcursionMuseumKNMIISchema = mongoose.Schema({
    type_ru: {
        type: String,
        required: true
    },
    name_ru: {
        type: String,
        required: true
    },
    type_kg: {
        type: String,
        required: true
    },
    name_kg: {
        type: String,
        required: true
    },
    type_eng: {
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


var ExcursionMuseumKNMII = mongoose.model('ExcursionMuseumKNMII', ExcursionMuseumKNMIISchema);

module.exports = ExcursionMuseumKNMII;