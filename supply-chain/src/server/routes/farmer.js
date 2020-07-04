const router = require("express").Router();
var uuidv4 = require("uuid/v4");
const fabricNetwork = require("../fabricNetwork");
const registerUser = require("../../registerUser");
const USER_ROLES = require("../configs/constant").USER_ROLES;
const { body, validationResult, check } = require("express-validator");

require("dotenv").config();
router.post(
    "/",
    [
        body("username").not().isEmpty().trim().escape(),
        body("name").not().isEmpty().trim().escape(),
        body("address").not().isEmpty().trim().escape(),
    ],
    async function (req, res) {
        try {
            if (req.decoded.user.role !== USER_ROLES.ADMIN_PRODUCER) {
                return res.status(403).json({
                    msg: "Permission Denied",
                });
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ msg: "Invalid input!" });
            }
            const contract = await fabricNetwork.connectNetwork(
                "connection-producer.json",
                "wallet/wallet-producer",
                process.env.ADMIN_PRODUCER_USERNAME
            );

            let farmer = {
                id: "Farmer" + uuidv4(),
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                username: req.body.username,
            };
            let tx = await contract.submitTransaction(
                "addAsset",
                JSON.stringify(farmer)
            );

            await registerUser(
                req.body.username,
                "producer",
                USER_ROLES.FARMER,
                process.env.ADMIN_PRODUCER_USERNAME
            );

            res.status(200).json({
                msg: `Create Farmer ${req.body.name} successful!`,
            });
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            res.status(500).json({
                error: error,
            });
        }
    }
);

router.put(
    "/:id",
    [
        body("name").not().isEmpty().trim().escape(),
        body("address").not().isEmpty().trim().escape(),
    ],
    async function (req, res) {
        try {
            if (
                req.decoded.user.role !== USER_ROLES.ADMIN_PRODUCER &&
                req.decoded.user.role !== USER_ROLES.FARMER
            ) {
                return res.status(403).json({
                    msg: "Permission Denied",
                });
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ msg: "Invalid input!" });
            }
            const contract = await fabricNetwork.connectNetwork(
                "connection-producer.json",
                "wallet/wallet-producer",
                process.env.ADMIN_PRODUCER_USERNAME
            );
            let farmer = {
                id: req.params.id.toString(),
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                username: req.body.username,
            };

            const result = await contract.submitTransaction(
                "editAsset",
                farmer.id.toString(),
                JSON.stringify(farmer)
            );

            res.status(200).json({
                msg: `Farmer ${req.body.name} has been edited!`,
                txid: result.toString(),
            });
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            res.status(500).json({
                error: error,
            });
        }
    }
);

router.delete("/:id", check("id").trim().escape(), async function (req, res) {
    try {
        if (req.decoded.user.role !== USER_ROLES.ADMIN_PRODUCER) {
            return res.status(403).json({
                msg: "Permission Denied",
            });
        }
        const contract = await fabricNetwork.connectNetwork(
            "connection-producer.json",
            "wallet/wallet-producer",
            process.env.ADMIN_PRODUCER_USERNAME
        );
        const result = await contract.submitTransaction(
            "deleteAsset",
            req.params.id.toString()
        );

        res.status(200).json({
            result: result,
            msg: `Delete Farmer successful!`,
        });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error,
        });
    }
});

router.get("/", async function (req, res) {
    try {
        const contract = await fabricNetwork.connectNetwork(
            "connection-producer.json",
            "wallet/wallet-producer",
            process.env.ADMIN_PRODUCER_USERNAME
        );
        const result = await contract.evaluateTransaction(
            "queryAllAsset",
            "Farmer"
        );
        let response = JSON.parse(result.toString());
        res.json({ farmers: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error,
        });
    }
});

module.exports = router;
