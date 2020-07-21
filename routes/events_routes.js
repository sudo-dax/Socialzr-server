const express = require("express")
const router = express.Router()
const {getEvents, getEvent, postEvent, removeEvent, changeEvent, userAuthenticated} = require("../controllers/events_controller")


// READ
// GET on "/events"
// Returns all events
router.get("/", getEvents)

// READ
// GET on "/events/:id"
// Returns an event with given id
router.get ("/:id", getEvent)

router.use(userAuthenticated)

// CREATE
// POST in "/events"
// Creates a new event
router.post("/", postEvent)

// DELETE
// DELETE in "/events/:id"
// Deletes an event with given id
router.delete("/:id", removeEvent)

// UPDATE
// PUT on "/events/:id"
// Updates an event with given id
router.put("/:id", changeEvent)

module.exports = router;