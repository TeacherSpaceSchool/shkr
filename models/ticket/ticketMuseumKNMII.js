const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const TicketMuseumKNMIISchema = mongoose.Schema({
    genre_ru: {
        type: String,
        required: true,
        unique: false
    },
    type_ru: {
        type: String,
        required: true,
        unique: false
    },
    genre_kg: {
        type: String,
        required: true,
        unique: false
    },
    type_kg: {
        type: String,
        required: true,
        unique: false
    },
    genre_eng: {
        type: String,
        required: true,
        unique: false
    },
    type_eng: {
        type: String,
        required: true,
        unique: false
    },
    price: {
        type: String,
        required: true,
        unique: false
    },
}, {
    timestamps: true
});

TicketMuseumKNMIISchema.plugin(uniqueValidator);

var TicketMuseumKNMII = mongoose.model('TicketMuseumKNMII', TicketMuseumKNMIISchema);

module.exports = TicketMuseumKNMII;