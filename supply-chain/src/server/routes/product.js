const router = require("express").Router();
const fabricNetwork = require("../fabricNetwork");
const { body, validationResult, check } = require("express-validator");
var uuidv4 = require("uuid/v4");
const USER_ROLES = require("../configs/constant").USER_ROLES;

require("dotenv").config();

router.post("/", async function(req, res) {
    try {
        const contract = await fabricNetwork.connectNetwork(
            "connection-producer.json",
            "wallet/wallet-producer",
            process.env.ADMIN_PRODUCER_USERNAME
        );
        let product = {
            id: "Product" + uuidv4(),
            imageUrl: req.body.imageUrl,
            name: req.body.name,
            type: req.body.type,
            packtype: "",
            weight: "",
            mfgDate: "",
            expDate: "",
            origin: req.body.origin,
            description: req.body.description,
            growId: "",
            farmerId: req.body.farmerId
        };

        let tx = await contract.submitTransaction(
            "addAsset",
            JSON.stringify(product)
        );

        res.json({
            status: "Create Product successful!",
            txid: tx.toString()
        });
    } catch (error) {
        console.log("create product error", error);
    }
});

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
        res.json({ product: response });
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
        let product = {
            id: req.params.id.toString(),
            imageUrl: req.body.imageUrl,
            name: req.body.name,
            type: req.body.type,
            origin: req.body.origin,
            description: req.body.description,
            farmerId: req.body.farmerId
        };
        const result = await contract.submitTransaction(
            "editAsset",
            product.id.toString(),
            JSON.stringify(product)
        );

        res.json({
            status: "Edit Product successful!",
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
            "Product"
        );
        let response = JSON.parse(result.toString());
        res.json({ products: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});
module.exports = router;
