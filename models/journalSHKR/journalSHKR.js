var mongoose = require('mongoose');

const JournalSHKRSchema = mongoose.Schema({
    photos: {
        type: [String],
        required: true
    },
    photos_thumbnail: {
        type: [String],
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var JournalSHKR = mongoose.model('JournalSHKR', JournalSHKRSchema);

module.exports = JournalSHKR;