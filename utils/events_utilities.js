const Event = require("../models/event")


const getAllEvents = function(req) {
    if (req.query.type) {
        return Event.findByEventCategory(req.query.category)
    } else {
        return Event.find()
    }
}

const getEventById = function (id) {
    return Event.findById(id)
}

const addEvent = function (body) {
    return new Event(body)
}

const deleteEvent = function (id) {
    return  Event.findByIdAndRemove(id)
}

const updateEvent = function (req) {
    return Event.findByIdAndUpdate(req.params.id, req.body, {
        // Flag to see updated Event in response
        new : true
    })
}

module.exports = {getAllEvents, getEventById, addEvent, deleteEvent, updateEvent};