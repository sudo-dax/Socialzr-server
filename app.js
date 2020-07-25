const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const eventRouter = require("./routes/events_routes")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const passport = require("passport")
const authRouter = require("./routes/auth_routes")

// Sets port if deploying to external provider 
// or port assigned already 

const port = process.env.port || 3001


// Define Express
const app = express()

// Calls Middleware
app.use(bodyParser.json())

// Equivalant of create server in http library 
const dbConn = "mongodb://localhost/socializr_app"

mongoose.connect(
    dbConn,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useFindAndModify : false,
        userCreateIndex: true
    },
    err => {
        if (err) {
            console.log("Error connecting to database", err)
        } else {
            console.log("~Connected to database!~")
        }
    }       
)

// Use Cors
const whitelist = ['http://localhost:3000']
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        const whitelistIndex = whitelist.findIndex((url) => url.includes(origin))
        console.log("found whitelistIndex", whitelistIndex)
        callback(null, whitelistIndex > -1)
    }
}))


app.use(session({
    secret: "socialzr",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))

require("./config/passport")
app.use(passport.initialize())
app.use(passport.session())

app.get("/",(req,res)=> {
    console.log(req.session)
    res.send(req.session)
})

app.use("/events", eventRouter)
app.use("/auth", authRouter)

// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("Hi from your Express Server. From past you. You are awesome.")
});

// Listen
app.listen(process.env.PORT);
app.listen(port, ()=> console.log("SocialZr server is running on port " + port))
