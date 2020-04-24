# Food-supplychain

# Installation instructions

1. Install Hyperledger fabric dependencies:
   https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html

2. Donwload fabric binaries and samples:
   `curl -sSL http://bit.ly/2ysbOFE | bash -s 1.4.3`

3. Go to fabric samples:

4. Copy bin folder to your project folder

# Start the network

1. Generate the crypto material and start the network
   cd supply-chain

`./network.sh start`
This will create the crypto material for all the orgs, start the network and register it's admins and users. Then will start the API at localhost:3000

# Re-start the API server

cd supply-chain

`npm start`

# Stop the network

cd supply-chain

`./network.sh stop`

# API Doc

## **CreateAsset**

Add new Asset to the blockchain network

- **URL**

  `/farmer`

- **Method:**

      	`POST`

- **Data Params**

```
  {
    "name":"quang",
    "description":"UET"
  }
```

- **Success Response:**

```
{ "status":"Create Farmer successful!",
  "txid":"c23ce6e0065a7c79d11e60168796f2c8d7c9bbfbe077a57c0886d255006f0df6"
}
```

- **Sample Call:**
  curl --request POST \
   --url http://localhost:3000/farmer \
   --header 'content-type: application/json' \
   --data '{
  "name":"quang",
  "address":"HN",
  "description":"test"
  }'

```


## **getAsset**

Get Asset from the blockchain with the actual status

- **URL**

  `/farmer/:id`

- **Method:**

      	`GET`

- **URL Params**
  `"id":String`

- **Success Response:**

```

{
{
"result":
{
"id":"Farmer1e2c3f54-58f4-43ec-9d99-c12e5b1efee6",
"name":"quang",
"address":"HN",
"description":"test"
}
}

```

- **Sample Call:**

```

curl --request GET \
 --url 'http://localhost:3000/farmer/<AssetId>' \
 --header 'content-type: application/json' \

```

## **getAllAsset**

Get All Asset from the blockchain with the actual status

- **URL**

  `/farmer`

- **Method:**

      	`GET`

* **Success Response:**

```

{"result":
[
{
"Key":"Farmer1e2c3f54-58f4-43ec-9d99-c12e5b1efee6",
"Record":
{
"id":"Farmer1e2c3f54-58f4-43ec-9d99-c12e5b1efee6",
"name":"quang",
"address":"HN",
"description":"test"
}
},
{
"Key":"Farmer69b75d26-c856-473f-b0b5-090d517fba4f",
"Record":
{
"id":"Farmer69b75d26-c856-473f-b0b5-090d517fba4f",
"name":"quang",
"address":"HN",
"description":"test"
}
}
]
}

```

- **Sample Call:**

```

curl --request GET \
 --url 'http://localhost:3000/farmer' \
 --header 'content-type: application/json' \

```

```
