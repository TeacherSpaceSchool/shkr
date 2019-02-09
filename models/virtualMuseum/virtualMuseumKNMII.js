var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const VirtualMuseumKNMIISchema = mongoose.Schema({
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
}, {
    timestamps: true
});

VirtualMuseumKNMIISchema.plugin(uniqueValidator);

var VirtualMuseumKNMII = mongoose.model('VirtualMuseumKNMII', VirtualMuseumKNMIISchema);

module.exports = VirtualMuseumKNMII;