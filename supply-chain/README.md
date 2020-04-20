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
**AddTuna**
----
  Add new Tuna to the blockchain network

* **URL**

  `/api/createFarmer`

* **Method:**
  
	`POST` 

* **Data Params**

```
  { 
    "information":{"name":"quang"}
  }
 ``` 

* **Success Response:**
  
``` 
{ "status":"Create Farmer successful!",
  "txid":"c23ce6e0065a7c79d11e60168796f2c8d7c9bbfbe077a57c0886d255006f0df6"
}
```
 
* **Sample Call:**

 ```
curl --request POST \
  --url http://localhost:3000/api/createFarmer \
  --header 'content-type: application/json' \
  --data '{

              "information":{"name":"quang"}
          }'
 ```
            
**getTuna**
----
  Get Tuna from the blockchain with the actual status

* **URL**

  `/api/getFarmer/:id`

* **Method:**
  
	`GET` 

* **URL Params**
    `"id":String`

* **Success Response:**
  
 ``` 
  {
    {
      "result":
      {
        "id":"Farmer1e2c3f54-58f4-43ec-9d99-c12e5b1efee6",
        "information":{"name":"quang"}}
      }
  }
 ```
 
* **Sample Call:**

``` 
curl --request GET \
  --url 'http://localhost:3000/api/getFarmer/<TunaId>' \
  --header 'content-type: application/json' \ 
```


**setPosition**
----
  Sets the position (latitude and longitud) for the specified id, could be sushiId or TunaId

* **URL**

  `/api/getTuna/setPosition`

* **Method:**
  
	`POST` 

* **Data Params**
``` 
"id":10001,
"latitude":"43.3623",
"longitude":"8.4115"
``` 

* **Success Response:**
  
 ``` 
{	
	status":"OK - Transaction has been submitted",
	"txid":"7f485a8c3a3c7f982aed76e3b20a0ad0fb4cbf174fbeabc792969a30a3383499"
}
 ```
 
* **Sample Call:**

``` 
curl --request POST \
  --url http://localhost:3000/api/setPosition \
  --header 'content-type: application/json' \
  --data '{
            "id":10001,
            "latitude":"43.3623",
            "longitude":"8.4115"
			}'
```

**addSushi**
----
   Add new Sushi to the blockchain network with the related TunaId

* **URL**

  `/api/getTuna/addShushi`

* **Method:**
  
	`POST` 

* **Data Params**
 ```   
"id":integer,
"latitude":string,
"longitude":string,
"type":string,
"tunaId":integer
 ``` 
* **Success Response:**
  
 ``` 
{	
	status":"OK - Transaction has been submitted",
	"txid":"7f485a8c3a3c7f982aed76e3b20a0ad0fb4cbf174fbeabc792969a30a3383499"
}
 ```
 
* **Sample Call:**

``` 
curl --request POST \
  --url http://localhost:3000/api/addShushi \
  --header 'content-type: application/json' \
  --data '{
			"id":200001,
            "latitude":"42.5987",
            "longitude":"5.5671",
            "type":"sashimi",
            "tunaId":10001
			}'
```

**getSushi**
----
  Get sushi from the blockchain with the actual status

* **URL**

  `/api/getSushi/:id`

* **Method:**
  
	`GET` 

* **URL Params**
    `"id":integer`

* **Success Response:**
  
 ``` 
  {
    "result": {
            "id":"200001",
            "latitude":"42.5987",
            "longitude":"5.5671",
            "type":"sashimi",
            "tunaId":10001
			}'
}
 ```
 
* **Sample Call:**
 
``` 
curl --request GET \
  --url 'http://localhost:3000/api/getSushi/<SushiId>' \
  --header 'content-type: application/json' \
```



**getSushiHistory**
----
  Get sushi history, from the TunaId that started the supply-chain, getting all the history positions, until the sushi is delivered, with the sushi history too

* **URL**

  `/api/getHistorySushi/:id`

* **Method:**
  
	`GET` 

* **URL Params**
    `"id":integer`

* **Success Response:**
  
 ``` 
{
    "historySushi": [
        {
            "id": "200001",
            "latitude":"42.5987",
            "longitude":"5.5671",
            "type": "sashimi",
            "tunaId": 10004
        },
        {
            "id": "200001",
            "latitude":"43.3623",
            "longitude":"8.4115",
            "type": "sashimi",
            "tunaId": 10004
        }
    ],
    "historyTuna": [
        {
            "id": "10004",
            "latitude":"43.3623",
            "longitude":"8.4115",
            "length": 34,
            "weight": 50
        }
    ]
}
 ```
 
* **Sample Call:**
 
 ``` 
curl --request GET \
  --url 'http://localhost:3000/api/getHistorySushi/<SushiId>' \
  --header 'content-type: application/json' \
```
