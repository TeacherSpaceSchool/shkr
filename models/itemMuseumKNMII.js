var mongoose = require('mongoose');
var random = require('mongoose-random');

const ItemMuseumKNMIISchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    image_thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    styleOrMaterial: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

ItemMuseumKNMIISchema.plugin(random, { path: 'r' });

var ItemMuseumKNMII = mongoose.model('ItemMuseumKNMII', ItemMuseumKNMIISchema);

module.exports = ItemMuseumKNMII;