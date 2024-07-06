const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'Username already exists']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ownedby: {
        type: String,
        required: true
    },
    lentto: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    // interested: {
    //     type: Array
    // }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;