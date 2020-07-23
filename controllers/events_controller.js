const {
    getAllEvents, 
    getEventById, 
    addEvent, 
    deleteEvent, 
    updateEvent
} = require("../utils/event_utilities")
const { userAuthenticated } = require("../utils/common_utilities")

// const { restart } = require("nodemon")

// GET all Events
const getEvents = function (req, res) {
    getAllEvents(req)
    .exec((err, events) => {
        if (err) {
            res.status(500)
            return res.json({
            error: err.message
        })
        }
        res.send(events)
    })
}
// GET Event by id
const getEvent = function (req, res) {
    getEventById(req.params.id).exec((err, event) => {
        if (err) {
            res.status(404)
            return res.send("Event not found!")
        }
        res.send(event)
    })
}

const postEvent = function (req, res) {
    // Save the Event Instance from addEvent
    addEvent(req.body).save((err, event) => {
        if (err) {
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.status(201)
        res.send(event)
    })
}

const removeEvent = function (req, res) {
    deleteEvent(req.params.id).exec((err) => {
        if (err) {
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.sendStatus(204)
    })
}

const changeEvent = function (req, res) {
    updateEvent(req).exec((err, event) => {
        if (err) {
            res.status(500)
            return res.json ({
                error: err.message
            })
        }
        res.status(200)
        res.send(event)
    })
}

module.exports = {getEvents, getEvent, postEvent, removeEvent, changeEvent, userAuthenticated}