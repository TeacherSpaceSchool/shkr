var mongoose = require('mongoose');

const VirtualMuseumKNMIISchema = mongoose.Schema({
    photos: {
        type: [String],
        required: true
    },
    photos_thumbnail: {
        type: [String],
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
}, {
    timestamps: true
});

var VirtualMuseumKNMII = mongoose.model('VirtualMuseumKNMII', VirtualMuseumKNMIISchema);

module.exports = VirtualMuseumKNMII;