const router = require("express").Router();
var uuidv4 = require("uuid/v4");
const fabricNetwork = require("../fabricNetwork");
const registerUser = require("../../registerUser");
const USER_ROLES = require("../configs/constant").USER_ROLES;
const { body, validationResult, check } = require("express-validator");
const checkJWT = require("../middlewares/check-jwt");

require("dotenv").config();
router.post(
    "/",
    [
        body("username")
            .not()
            .isEmpty()
            .trim()
            .escape(),
        body("name")
            .not()
            .isEmpty()
            .trim()
            .escape(),
        body("address")
            .not()
            .isEmpty()
            .trim()
            .escape()
    ],
    async function(req, res) {
        try {
            if (req.decoded.user.role !== USER_ROLES.ADMIN_PRODUCER) {
                return res.status(403).json({
                    msg: "Permission Denied"
                });
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
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
                imageUrl: req.body.imageUrl
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

            res.json({
                status: "Create Farmer successful!",
                txid: tx.toString()
            });
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            res.status(500).json({
                error: error
            });
        }
    }
);

router.get("/:id", async function(req, res) {
    try {
        const contract = await fabricNetwork.connectNetwork(
            "connection-producer.json",
            "wallet/wallet-producer",
            process.env.ADMIN_PRODUCER_USERNAME
        );
        const result = await contract.evaluateTransaction(
            "queryAsset",
            req.params.id.toString()
        );
        let response = JSON.parse(result.toString());
        res.json({ result: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

router.put("/:id", async function(req, res) {
    try {
        if (req.decoded.user.role !== USER_ROLES.ADMIN_PRODUCER) {
            return res.status(403).json({
                msg: "Permission Denied"
            });
        }
        const contract = await fabricNetwork.connectNetwork(
            "connection-producer.json",
            "wallet/wallet-producer",
            process.env.ADMIN_PRODUCER_USERNAME
        );

        const result = await contract.submitTransaction(
            "editAsset",
            req.params.id.toString(),
            req.body.name,
            req.body.address,
            req.body.description,
            req.body.imageUrl
        );

        res.json({
            status: "Create Farmer successful!",
            txid: result.toString()
        });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

router.delete(
    "/:id",
    check("id")
        .trim()
        .escape(),
    async function(req, res) {
        try {
            if (req.decoded.user.role !== USER_ROLES.ADMIN_PRODUCER) {
                return res.status(403).json({
                    msg: "Permission Denied"
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
                msg: "Delete successful!"
            });
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            res.status(500).json({
                error: error
            });
        }
    }
);

router.get("/", async function(req, res) {
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
            error: error
        });
    }
});

module.exports = router;
