var mongoose = require('mongoose');

const NameSHKRSchema = mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    photo_thumbnail: {
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
    adress: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var NameSHKR = mongoose.model('NameSHKR', NameSHKRSchema);

module.exports = NameSHKR;