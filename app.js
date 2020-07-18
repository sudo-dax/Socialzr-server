const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

// Sets port if deploying to external provider 
// or port assigned already 
const port = process.env.port || 3000

// Define Express
const app = express()

// Calls Middleware
app.use(cors())
app.use(bodyParser.json())

// Equivalant of create server in http library 
const dbConn = "mongodb://localhost/socializr_app"

mongoose.connect(
    dbConn,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useFindAndModify : false
    },
    err => {
        if (err) {
            console.log("Error connecting to database", err)
        } else {
            console.log("~Connected to database!~")
        }
    }       
)

// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("Hi from your Express Server. From past you. You are awesome.")
});

// Listen
app.listen(port, ()=> console.log("SocialZr server is running on port " + port))
