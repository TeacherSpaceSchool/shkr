const mongoose = require('mongoose');

const TicketMuseumKNMIISchema = mongoose.Schema({
    genre_ru: {
        type: String,
        required: true
    },
    type_ru: {
        type: String,
        required: true
    },
    genre_kg: {
        type: String,
        required: true
    },
    type_kg: {
        type: String,
        required: true
    },
    genre_eng: {
        type: String,
        required: true
    },
    type_eng: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


var TicketMuseumKNMII = mongoose.model('TicketMuseumKNMII', TicketMuseumKNMIISchema);

module.exports = TicketMuseumKNMII;