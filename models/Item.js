const mongoose = require('mongoose')
const {ObjectId} = new mongoose.Schema

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        default: 'Indonesia',
        required: true
    },
    city: {
        type: String,
        default: 'Denpasar',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: ObjectId,
        ref: "Category"
    },
    imageId: [{
        type: ObjectId,
        ref: 'Image'
    }],
    featuresId: [{
        type: ObjectId,
        ref: 'Feature'
    }],
    activityId: [{
        type: ObjectId,
        ref: 'Activity'
    }]
})

module.exports = mongoose.model('Item', itemSchema)