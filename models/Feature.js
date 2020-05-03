const mongoose = require('mongoose')

const featureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        min: [1, 'Cannot less than one qty']
    },
    imageUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Feature', featureSchema)