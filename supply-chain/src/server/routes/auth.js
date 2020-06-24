const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
let secretJWT = require("../configs/secret").secret;

// Login
router.post(
    "/signin",
    [
        body("username")
            .not()
            .isEmpty()
            .trim()
            .escape(),
        body("password")
            .not()
            .isEmpty()
            .trim()
            .escape()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ username: req.body.username });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "Username or Password is incorrectass"
                });
            }

            let validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                return res.status(403).json({
                    success: false,
                    msg: "Username or Password is incorrect"
                });
            }

            let token = jwt.sign(
                {
                    user: user
                },
                secretJWT
            );

            return res.status(200).json({
                success: true,
                fullname: user.fullname,
                username: req.body.username,
                msg: "Login success",
                token: token,
                role: user.role
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }
);

module.exports = router;
