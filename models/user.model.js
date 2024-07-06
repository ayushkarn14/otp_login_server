const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        // required: true,
        unique: [true, 'Username already exists']
    },
    phone: {
        type: String,
        // required: true,
        unique: [true, 'Phone number already exists']
    },
    password: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;