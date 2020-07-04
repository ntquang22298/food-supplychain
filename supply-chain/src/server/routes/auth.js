const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
let secretJWT = require("../configs/secret").secret;
const checkJWT = require("../middlewares/check-jwt");
// Login
router.post(
    "/signin",
    [
        body("username").not().isEmpty().trim().escape(),
        body("password").not().isEmpty().trim().escape(),
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
                    msg: "Username or Password is incorrectass",
                });
            }

            let validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                return res.status(403).json({
                    success: false,
                    msg: "Username or Password is incorrect",
                });
            }

            let token = jwt.sign(
                {
                    user: user,
                },
                secretJWT
            );

            return res.status(200).json({
                success: true,
                fullname: user.fullname,
                username: req.body.username,
                msg: "Login success",
                token: token,
                role: user.role,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error",
            });
        }
    }
);
router.post(
    "/changePassword",
    [
        body("oldPass").not().isEmpty().trim(),
        body("newPass").not().isEmpty().trim().isLength({ min: 6 }),
        body("confirmPass").not().isEmpty().trim().isLength({ min: 6 }),
    ],
    checkJWT,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            const { oldPass, newPass, confirmPass } = req.body;

            if (oldPass === newPass) {
                return res.status(400).json({
                    success: false,
                    msg:
                        "Your new password must be different from your previous password",
                });
            } else if (newPass !== confirmPass) {
                return res.status(400).json({
                    success: false,
                    msg: "Confirm password does not match",
                });
            }

            let user = await User.findOne({
                username: req.decoded.user.username,
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "Account does not exist",
                });
            }

            let validPassword = await bcrypt.compare(oldPass, user.password);

            if (!validPassword) {
                return res.status(400).json({
                    success: false,
                    msg: "Old Password incorrect",
                });
            }

            const SALTROUNDS = 10;
            const hashVal = await bcrypt.hash(newPass, SALTROUNDS);

            await user.updateOne({ password: hashVal });

            return res.status(200).json({
                success: true,
                msg: "Change password successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Change password failed",
            });
        }
    }
);
module.exports = router;
