const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Event = new Schema ({
    title: {
    type: String,
    required: true
    },
    organiser: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    }
})
