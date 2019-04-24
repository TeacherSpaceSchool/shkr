var mongoose = require('mongoose');
var random = require('mongoose-random');
var uniqueValidator = require('mongoose-unique-validator');

const EventSHKRSchema = mongoose.Schema({
    photos: {
        type: [String],
        required: true
    },
    photos_thumbnail: {
        type: [String],
        required: true
    },
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    type_ru: {
        type: String,
        required: true
    },
    description_ru: {
        type: String,
        required: true
    },
    name_ru: {
        type: String,
        required: true
    },
    type_eng: {
        type: String,
        required: true
    },
    description_eng: {
        type: String,
        required: true
    },
    name_eng: {
        type: String,
        required: true
    },
    type_kg: {
        type: String,
        required: true
    },
    description_kg: {
        type: String,
        required: true
    },
    name_kg: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

EventSHKRSchema.plugin(random, { path: 'r' });

var EventSHKR = mongoose.model('EventSHKR', EventSHKRSchema);

module.exports = EventSHKR;