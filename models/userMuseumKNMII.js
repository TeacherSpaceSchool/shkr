var mongoose = require('mongoose');
const crypto = require('crypto');
var uniqueValidator = require('mongoose-unique-validator');

const userMuseumKNMIISchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: String,
    status: String,
    passwordHash: String,
    salt: String,
}, {
    timestamps: true
});

userMuseumKNMIISchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function () {
        return this._plainPassword;
    });

userMuseumKNMIISchema.methods.checkPassword = function (password) {
    if (!password) return false;
    if (!this.passwordHash) return false;
    return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

userMuseumKNMIISchema.plugin(uniqueValidator);

var UserMuseumKNMII = mongoose.model('UserMuseumKNMII', userMuseumKNMIISchema);

module.exports = UserMuseumKNMII;