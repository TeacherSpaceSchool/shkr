var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var random = require('mongoose-random');

const ItemMuseumKNMIISchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
        unique: false
    },
    image_thumbnail: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    styleOrMaterial: {
        type: String,
        required: true,
        unique: false
    },
    date: {
        type: String,
        required: true,
        unique: false
    },
    price: {
        type: String,
        required: true,
        unique: false
    },
    author: {
        type: String,
        required: true,
        unique: false
    }
}, {
    timestamps: true
});

ItemMuseumKNMIISchema.plugin(uniqueValidator);
ItemMuseumKNMIISchema.plugin(random, { path: 'r' });

var ItemMuseumKNMII = mongoose.model('ItemMuseumKNMII', ItemMuseumKNMIISchema);

module.exports = ItemMuseumKNMII;