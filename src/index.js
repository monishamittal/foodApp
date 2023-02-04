const express = require('express')
const cors=require('cors')
const dotenv =require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./route/route')
const multer = require("multer")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
 app.use(multer().any())


//----------------------------connecting database......-----------------------
mongoose.connect("mongodb+srv://functionup-radon:radon123@cluster0.q0p7q73.mongodb.net/foodapp-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is Connected"))
    .catch((error) => console.log(error))

app.use('/', route)

app.listen(process.env.PORT || 3001, function () {
    console.log("Express App is running on PORT " + (process.env.PORT || 3001))
})