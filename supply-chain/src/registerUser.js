/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const {
    FileSystemWallet,
    Gateway,
    X509WalletMixin,
} = require("fabric-network");
const path = require("path");
const User = require("./server/model/User");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect database
// mongoose.connect(
//     process.env.MONGODB_URI,
//     { useUnifiedTopology: true, useNewUrlParser: true },
//     (error) => {
//         if (error) console.log(error);
//     }
// );
// mongoose.set("useCreateIndex", true);

async function registerUser(username, org, role, admin) {
    try {
        const ccpPath = path.resolve(
            __dirname,
            "..",
            "connections",
            `connection-${org}.json`
        );
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), `wallet/wallet-${org}`);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(username);
        if (userExists) {
            console.log(
                `An identity for the user ${username} already exists in the wallet`
            );
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists(admin);
        if (!adminExists) {
            console.log(
                `An identity for the admin user ${admin} does not exist in the wallet`
            );
            console.log("Run the enrollAdmin.js application before retrying");
            return;
        }

        // register user account
        let user = new User({
            username: username,
            password: process.env.USER_DEFAULT_PASSWORD,
            role: role,
        });

        let userSaved = await user.save();
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: admin,
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();
        if (userSaved) {
            const upper = org.replace(/^\w/, (c) => c.toUpperCase());
            // Register the user, enroll the user, and import the new identity into the wallet.
            const secret = await ca.register(
                { enrollmentID: username, role: "client" },
                adminIdentity
            );
            const enrollment = await ca.enroll({
                enrollmentID: username,
                enrollmentSecret: secret,
            });
            const userIdentity = X509WalletMixin.createIdentity(
                `${upper}MSP`,
                enrollment.certificate,
                enrollment.key.toBytes()
            );
            await wallet.import(username, userIdentity);
            console.log(
                `Successfully registered and enrolled admin user ${username} and imported it into the wallet`
            );
        }
    } catch (error) {
        console.error(`Failed to register user ${username}: ${error}`);
    }
}
module.exports = registerUser;
