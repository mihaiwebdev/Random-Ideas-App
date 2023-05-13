const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text field']
    },
    tag: {
        type: String
    },
    user: {
        type: String,
        immutable: true
    },
    username: {
        type: String,
        immutable: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Idea', ideaSchema);