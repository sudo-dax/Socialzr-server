const Event = require("../models/event")


// Exported functions

// get all events
// return a query
const getAllEvents = function(req) {
    if (req.query.category) {
        return Event.findByEventCategory(req.query.category)
    } else {
        return Event.find()
    }
}

// get event by id
// returns a query
const getEventById = function (req) {
    return Event.findById(req.params.id)
}

// add post
// returns a Post object
const addEvent = function (req) {
    return new Event (req.body)
}

const deleteEvent = function (id) {
    return  Event.findByIdAndRemove(id)
}

const updateEvent = function (req) {
    // use new: true to return updated event rather than old one
    return Event.findByIdAndUpdate(req.params.id, req.body, {
        // Flag to see updated Event in response
        new : true
    })
}

module.exports = {getAllEvents, getEventById, addEvent, deleteEvent, updateEvent};