const userModel = require('../model/userModel');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { isValidName, isValidEmail, isValidPassword, isValid } = require('../validation/valid')

const createUser = async function (req, res) {
    try {
        let data = req.body
        let { username, email,password } = data

        //------------------validation for request body------------------
        if (Object.keys(data).length < 1) { return res.status(400).send({ status: false, message: "Data is required to create a user" }) }

        //-------------------validation for first name-----------------------
        if (!isValid(username)) { return res.status(400).send({ status: false, message: "Enter username" }) }
        if (!isValidName(username)) { return res.status(400).send({ status: false, message: "Enter valid username" }) }

        //------------------------validation for email--------------------
        if (!isValid(email)) { return res.status(400).send({ status: false, message: "Enter Email" }) }
        if (!isValidEmail(email)) { return res.status(400).send({ status: false, message: "Enter valid email" }) }

        //-----------------validation for password and converting in encrypted form---------
        if (!isValid(password)) { return res.status(400).send({ status: false, message: " Enter Password" }) }
        if (!isValidPassword(password)) { return res.status(400).send({ status: false, message: "Enter Valid Password having 1 capital and small letter , 1 special character and 1 number and length should be between 8 to 15" }) }

        //---------------db call for email to make it unique----------

        let checkEmail = await userModel.findOne({ email: data.email })
        if (checkEmail) return res.status(400).send({ status: false, message: " Email is already exists" })

        //-----------------------hashing the password with bcrypt------------------
        data.password = await bcrypt.hash(data.password, 10);

        let savedata = await userModel.create(data)
        return res.status(201).send({ status: true, message: 'User created successfully', data: savedata })

    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
}

const loginUser = async function (req, res) {
    try {
        const data = req.body
        if (!data) { return res.status(400).send({ status: false, message: "Please enter email and password" }) }
        const email = req.body.email;
        const password = req.body.password;

        //------------------email checking----------------------
        const user = await userModel.findOne({ email });
        if (!user) { return res.status(404).send({ status: false, msg: "Incorrect Email" }) }

        //--------------------password checking-------------------
        let actualPassWord = await bcrypt.compare(password, user.password);
        if (!actualPassWord) return res.status(400).send({ status: false, message: "Incorrect password" })

        let userId = user._id

        //---------------------token-------------------------------
        let token = jwt.sign({ userId: userId }, "foodApp", { expiresIn: "2d" })
        res.status(200).send({ status: true, message: "User login successfull", data: { userId, token: token } });

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};


module.exports = {createUser,loginUser}
