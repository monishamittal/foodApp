//--------------------Import Models for using in this module--------------------
const mongoose = require("mongoose");

//-------------------------Create Schema--------------------
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:50,
    },
    isAdmin: {
       type:Boolean,
       default:false,
    },
}, { timestamps: true });

//--------------------provides an interface to the database like CRUD operation-------------------- 
module.exports = mongoose.model("User", userSchema);  