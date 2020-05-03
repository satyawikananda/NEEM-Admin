const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String
    }
})

module.exports = new mongoose.model('Image', imageSchema)