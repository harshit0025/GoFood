const express = require('express');
const router = express.Router();
const User = require('../models/User')

const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MyNameisHarshitYadav123456"
//For Signup
router.post("/createuser", [

    body('email').isEmail(),

    body('name').isLength({ min: 5 }),

    body('password', 'Incorrect password').isLength({ min: 5 })],

    async (req, res) => {

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (err) {
            console.log(err.message);
            res.json({ success: false });
        }
    })


//For Login
router.post("/loginuser",[

    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let email = req.body.email;
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try Logging in with correct credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)

            if (!pwdCompare){
                return res.status(400).json({ errors: "Try Logging in with correct password" });
            }

            const data = {
                user: {
                    id: userData._id,
                }
            }

            const authToken = jwt.sign(data, jwtSecret)

            return res.json({ success: true, authToken:authToken });

        } catch (err) {
            console.log(err.message);
            res.json({ success: false });
        }
    })


module.exports = router;