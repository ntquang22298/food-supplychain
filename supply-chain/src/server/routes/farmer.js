const router = require('express').Router();
var uuidv4 = require('uuid/v4');
const fabricNetwork = require('../fabricNetwork');

router.post('/', async function (req, res) {

    try {
        const contract = await fabricNetwork.connectNetwork('connection-producer.json', 'wallet/wallet-producer');
        let farmer = {
            id: 'Farmer' + uuidv4(),
            information: req.body.information
        }
        let tx = await contract.submitTransaction('addAsset', JSON.stringify(farmer));

        res.json({
            status: 'Create Farmer successful!',
            txid: tx.toString()
        });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }

});

router.get('/:id', async function (req, res) {
    try {
        const contract = await fabricNetwork.connectNetwork('connection-retailer.json', 'wallet/wallet-retailer');
        const result = await contract.evaluateTransaction('queryAsset', req.params.id.toString());
        let response = JSON.parse(result.toString());
        res.json({ result: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
})


router.get('/', async function (req, res) {
    try {
        const contract = await fabricNetwork.connectNetwork('connection-retailer.json', 'wallet/wallet-retailer');
        const result = await contract.evaluateTransaction('queryAllAsset', 'Farmer');
        let response = JSON.parse(result.toString());
        res.json({ result: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
})

module.exports = router;