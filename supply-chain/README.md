# Food-supplychain

# Installation instructions

1. Install Hyperledger fabric dependencies:
   https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html

2. Donwload fabric binaries and samples:
   `curl -sSL http://bit.ly/2ysbOFE | bash -s 1.4.3`

3. Go to fabric samples:

4. Copy bin folder to your project folder

# Config env

Fill mongodb_uri in .env

# Start mongodb

sudo service mongod start

# Start the network

1. Generate the crypto material and start the network
   cd supply-chain

`./network.sh start`
This will create the crypto material for all the orgs, start the network and register it's admins and users. Then will start the API at localhost:3000

# Start client

cd client/app

config env file

yarn install

yarn start

# Login as admin producer

username: adminproducer
password: producer

# Re-start the API server

cd supply-chain

`npm start`

# Stop the network

cd supply-chain

`./network.sh stop`
