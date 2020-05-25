const router = require("express").Router();
const fabricNetwork = require("../fabricNetwork");

require("dotenv").config();
router.get("/farmer/:id", async function(req, res) {
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
router.get("/season/:id", async function(req, res) {
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

router.get("/product/:id", async function(req, res) {
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

router.get("/actions/:seasonId", async function(req, res) {
    try {
        const contract = await fabricNetwork.connectNetwork(
            "connection-producer.json",
            "wallet/wallet-producer",
            process.env.ADMIN_PRODUCER_USERNAME
        );
        const result = await contract.evaluateTransaction(
            "queryAllAssetByAttribute",
            "Action",
            "seasonId",
            req.params.seasonId
        );
        let response = JSON.parse(result.toString());
        res.json({ actions: response ? response : [] });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

router.get("/:id", async function(req, res) {
    try {
        const contract = await fabricNetwork.connectNetwork(
            "connection-retailer.json",
            "wallet/wallet-retailer",
            process.env.ADMIN_RETAILER_USERNAME
        );
        const result = await contract.evaluateTransaction(
            "getHistory",
            req.params.id.toString()
        );
        let response = JSON.parse(result.toString());
        console.log(response);

        res.json({ product: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});
module.exports = router;
