//--------------------requiring module--------------------
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require('../validation/valid');
const userModel = require('../model/userModel');

//--------------------authentication--------------------
const Authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"] || req.headers["x-api-key"];
        if (!token)
            return res.status(400).send({ status: false, msg: "Token must be present" });
        const decoded = jwt.verify(token, "foodApp")
        if (!decoded) {
            return res.status(401).send({ status: false, message: "Invalid authentication token in request headers." })
        }
        req.userId = decoded.userId;           //matching userId for which token generated by the userId provided in the request.
        next()

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    };
}


module.exports = { Authentication }