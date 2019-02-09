var mongoose = require('mongoose');
var random = require('mongoose-random');
var uniqueValidator = require('mongoose-unique-validator');

const EventMuseumKNMIISchema = mongoose.Schema({
    photos: {
        type: [String],
        required: true,
        unique: false
    },
    photos_thumbnail: {
        type: [String],
        required: true,
        unique: false
    },
    dateStart: {
        type: Date,
        required: true,
        unique: false
    },
    dateEnd: {
        type: Date,
        required: true,
        unique: false
    },
    type_ru: {
        type: String,
        required: true,
        unique: false
    },
    description_ru: {
        type: String,
        required: true,
        unique: false
    },
    name_ru: {
        type: String,
        required: true,
        unique: false
    },
    type_eng: {
        type: String,
        required: true,
        unique: false
    },
    description_eng: {
        type: String,
        required: true,
        unique: false
    },
    name_eng: {
        type: String,
        required: true,
        unique: false
    },
    type_kg: {
        type: String,
        required: true,
        unique: false
    },
    description_kg: {
        type: String,
        required: true,
        unique: false
    },
    name_kg: {
        type: String,
        required: true,
        unique: false
    },
}, {
    timestamps: true
});

EventMuseumKNMIISchema.plugin(uniqueValidator);
EventMuseumKNMIISchema.plugin(random, { path: 'r' });

var EventMuseumKNMII = mongoose.model('EventMuseumKNMII', EventMuseumKNMIISchema);

module.exports = EventMuseumKNMII;