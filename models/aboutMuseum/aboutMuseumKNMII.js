var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const AboutMuseumKNMIISchema = mongoose.Schema({
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
    biography_ru: {
        type: String,
        required: true,
        unique: false
    },
    biography_kg: {
        type: String,
        required: true,
        unique: false
    },
    biography_eng: {
        type: String,
        required: true,
        unique: false
    },
}, {
    timestamps: true
});


AboutMuseumKNMIISchema.plugin(uniqueValidator);

var AboutMuseumKNMII = mongoose.model('AboutMuseumKNMII', AboutMuseumKNMIISchema);

module.exports = AboutMuseumKNMII;