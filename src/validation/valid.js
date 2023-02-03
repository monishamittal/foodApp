// const mongoose = require("mongoose")

//--------------------Value Validation--------------------
// const isValidObjectId = function (id) {
//     var ObjectId = mongoose.Types.ObjectId;
//     return ObjectId.isValid(id)
// }

//--------------------valid req body------------------
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

//--------------------Name Validation----------------
const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z ]{2,30}$/
    return nameRegex.test(name)
}

//--------------------Email Validation-----------------
const isValidEmail = function (email) {
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    return emailRegex.test(email)
}

//--------------------Password Validation--------------------
const isValidPassword = function (password) {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    return passRegex.test(password)
}

//--------------------Profile Validation--------------------
// const isValidProfile = function (profile) {
//     const profileRegex = /[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/
//     return profileRegex.test(profile)
// }

//--------------------making file public--------------------
module.exports = { isValidName, isValidEmail, isValidPassword, isValid }