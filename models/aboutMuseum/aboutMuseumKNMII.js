var mongoose = require('mongoose');

const AboutMuseumKNMIISchema = mongoose.Schema({
    photos: {
        type: [String],
        required: true
    },
    photos_thumbnail: {
        type: [String],
        required: true
    },
    biography_ru: {
        type: String,
        required: true
    },
    biography_kg: {
        type: String,
        required: true
    },
    biography_eng: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var AboutMuseumKNMII = mongoose.model('AboutMuseumKNMII', AboutMuseumKNMIISchema);

module.exports = AboutMuseumKNMII;