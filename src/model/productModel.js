//--------------------Import Models for using in this module--------------------
const mongoose = require("mongoose");

//-------------------------Create Schema--------------------
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
       min:4,
    },
    desc: {
        type: String,
        required: true,
        min:8,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
       type:String,
       required: true,
    },
    review: {
        type:Number,
        required: true,
     },
     category: {
        type:String,
        required: true,
     },
}, { timestamps: true });

//--------------------provides an interface to the database like CRUD operation-------------------- 
module.exports = mongoose.model("Product", productSchema);  