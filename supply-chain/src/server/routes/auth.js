const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
let secretJWT = require("../configs/secret").secret;

// Register;
router.post(
    "/register",
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
            .isLength({ min: 6 }),
        body("fullname")
            .not()
            .isEmpty()
            .trim()
            .escape()
            .isLength({ min: 6 })
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ username: req.body.username });

            if (user) {
                return res.status(409).json({
                    success: false,
                    msg: "Account already exist"
                });
            }

            let createdUser = {
                username: req.body.username,
                fullname: req.body.fullname,
                password: req.body.password,
                oauthType: OAUTH_TYPES.NO
            };

            const response = await network.registerStudentOnBlockchain(
                createdUser
            );
            if (response.success) {
                return res.json({
                    success: true,
                    msg: response.msg
                });
            }

            return res.status(500).json({
                success: false,
                msg: "Network Error"
            });
        } catch (error) {
            const router = require("express").Router();
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }
);

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
            .isLength({ min: 6 })
    ],
    async (req, res, next) => {
        console.log(req.body.username, req.body.password);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ username: req.body.username });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "Account is not exist"
                });
            }

            let validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                return res.status(403).json({
                    success: false,
                    msg: "Username or Password incorrect"
                });
            }

            let token = jwt.sign(
                {
                    user: user
                },
                secretJWT
            );

            return res.json({
                success: true,
                fullname: user.fullname,
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
