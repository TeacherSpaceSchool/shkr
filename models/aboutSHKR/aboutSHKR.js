var mongoose = require('mongoose');

const AboutSHKRSchema = mongoose.Schema({
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

var AboutSHKR = mongoose.model('AboutSHKR', AboutSHKRSchema);

module.exports = AboutSHKR;