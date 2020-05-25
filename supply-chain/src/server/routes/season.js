const router = require("express").Router();
var uuidv4 = require("uuid/v4");
const fabricNetwork = require("../fabricNetwork");
const USER_ROLES = require("../configs/constant").USER_ROLES;
const { body, validationResult, check } = require("express-validator");

require("dotenv").config();
router.post("/", async function(req, res) {
    try {
        if (req.decoded.user.role !== USER_ROLES.FARMER) {
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
            req.decoded.user.username
        );

        let season = {
            id: "Season" + uuidv4(),
            name: req.body.name,
            sowingDate: req.body.sowingDate,
            harvestDate: req.body.harvestDate,
            productId: req.body.productId,
            farmer: req.decoded.user.username
        };

        let tx = await contract.submitTransaction(
            "addAsset",
            JSON.stringify(season)
        );

        res.json({
            status: "Create Season successful!",
            txid: tx.toString()
        });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

router.put("/:id", async function(req, res) {
    try {
        if (req.decoded.user.role !== USER_ROLES.FARMER) {
            return res.status(403).json({
                msg: "Permission Denied"
            });
        }
        const contract = await fabricNetwork.connectNetwork(
            "connection-producer.json",
            "wallet/wallet-producer",
            req.decoded.user.username
        );
        let season = {
            id: req.params.id.toString(),
            name: req.body.name,
            sowingDate: req.body.sowingDate,
            harvestDate: req.body.harvestDate,
            productId: req.body.productId,
            farmer: req.decoded.user.username
        };

        const result = await contract.submitTransaction(
            "editAsset",
            season.id.toString(),
            JSON.stringify(season)
        );

        res.json({
            status: "Edit Season successful!",
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
            if (req.decoded.user.role !== USER_ROLES.FARMER) {
                return res.status(403).json({
                    msg: "Permission Denied"
                });
            }
            const contract = await fabricNetwork.connectNetwork(
                "connection-producer.json",
                "wallet/wallet-producer",
                req.decoded.user.username
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
            "queryAllAssetByAttribute",
            "Season",
            "farmer",
            req.decoded.user.username
        );
        let response = JSON.parse(result.toString());
        res.json({ seasons: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});
module.exports = router;
