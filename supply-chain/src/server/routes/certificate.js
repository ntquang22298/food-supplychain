const router = require("express").Router();
var uuidv4 = require("uuid/v4");
const fabricNetwork = require("../fabricNetwork");
const USER_ROLES = require("../configs/constant").USER_ROLES;
const { body, validationResult, check } = require("express-validator");

require("dotenv").config();
router.post(
    "/",
    [
        body("name")
            .not()
            .isEmpty()
            .trim()
            .escape()
    ],
    async function(req, res) {
        try {
            if (req.decoded.user.role !== USER_ROLES.FARMER) {
                return res.status(403).json({
                    msg: "Permission Denied"
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

            let certificate = {
                id: "Certificate" + uuidv4(),
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                farmer: req.decoded.user.username
            };
            let tx = await contract.submitTransaction(
                "addAsset",
                JSON.stringify(certificate)
            );

            res.json({
                status: "Create Certificate successful!",
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

router.put(
    "/:id",
    body("name")
        .not()
        .isEmpty()
        .trim()
        .escape(),
    async function(req, res) {
        try {
            if (req.decoded.user.role !== USER_ROLES.FARMER) {
                return res.status(403).json({
                    msg: "Permission Denied"
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
            let certificate = {
                id: req.params.id.toString(),
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl
            };
            const result = await contract.submitTransaction(
                "editAsset",
                certificate.id.toString(),
                JSON.stringify(certificate)
            );

            res.json({
                status: "Edit Certificate successful!",
                txid: result.toString()
            });
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            res.status(500).json({
                error: error
            });
        }
    }
);

router.delete(
    "/:id",
    check("id")
        .trim()
        .escape(),
    async function(req, res) {
        try {
            if (req.decoded.user.role !== USER_ROLES.FARMER) {
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
            "Certificate"
        );
        let response = JSON.parse(result.toString());

        res.json({ certificates: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

module.exports = router;
