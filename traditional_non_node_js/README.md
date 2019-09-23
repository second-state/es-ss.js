Blockchain data services protocol library

## Traditional HTML/JS (non Node)
*Note:* If you would just like to use this without node (traditional HTML/JS environment), please simply download the [the es-ss.js](https://github.com/second-state/es-ss.js/blob/master/traditional_non_node_js/es-ss.js) file to disk and then instantiate the object using the following syntax. Pass in the protocol & base URL ( *without the trailing slash* ) of a working [smart contract search engine](https://github.com/second-state/smart-contract-search-engine) implementation.

*Note:* If you *DO* want to use this product with NodeJS then head over to [the NodeJS instructions](https://github.com/second-state/es-ss.js#node-install)

Let's get started and instantiate a new ESSS object.

```javascript
// Ethereum (ETH) MainNet 
var esss = new ESSS('https://eth.search.secondstate.io');

// Ethereum Classic (ETC) MainNet
//var esss = new ESSS('https://etc.search.secondstate.io');

// CyberMiles (CMT) MainNet
//var esss = new ESSS('https://cmt.search.secondstate.io');

// CyberMiles (CMT) TestNet
//var esss = new ESSS('https://testnet.cmt.search.secondstate.io');

// SecondState DevChain
//var esss = new ESSS('https://devchain.ss.search.secondstate.io');
```

# Usage Examples

All of the following commands can be called using traditional client-side HTTP/JS code).

## Call functions

instance.function(args)

### Query CONTRACTS using native Elasticsearch syntax

```javascript
var q = { query: { match_all: {} } }
```
Match just one address
```
var q = {"query":{"bool":{"must":[{"match":{"contractAddress":"0x6A4eB89b9d0519F6e344D36a70b4450193bd9C78"}}]}}}
```

Call the function

```
esss.queryUsingDsl(q)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```
### Query TRANSACTIONS using native Elasticsearch syntax

Fetch transactions which were sent `to` a particular address
```javascript
var q = {"query":{"bool":{"must":[{"match":{"to":"0xA722A50b3B939aBec992753607B648277f781228"}}]}}}
```
Fetch transactions which were sent `from` a particular address
```javascript
var q = {"query":{"bool":{"must":[{"match":{"from":"0xA722A50b3B939aBec992753607B648277f781228"}}]}}}
```

You can also query using numerical range. Here we look at all transactions send to an address over the last 365 days.

For example, use the following query to get all transactions sent to address `0xA722A50b3B939aBec992753607B648277f781228` between `Fri, 13 Sep 2018 07:51:32 GMT` and `Fri, 13 Sep 2019 07:51:32 GMT`

```
var now = Math.floor(Date.now() / 1000)
// 1568361092
var lastYear =  Math.floor((Date.now() - (365*24*60*60*1000)) / 1000)
// 1536825092

// You could also use yesterday
// var yesterday =  Math.floor((Date.now() - (1*24*60*60*1000)) / 1000)
var q = {
  "query": {
    "bool": {
      "must": [{
          "match": {
            "to": "0xA722A50b3B939aBec992753607B648277f781228"
          }
        },
        {
          "range": {
            "timestamp": {
              "gte": lastYear,
              "lt": now
            }
          }
        }
      ]
    }
  }
}
```
Call the function

```
esss.queryTxUsingDsl(q)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```
The code above will return data like this
```
[
  {
    "_source": {
      "TxHash": "0x4f05204efaf701a510bc97c60be65ffad21ea2d2ea813bbd75e9ff384fe64e53", 
      "blockNumber": 7716238, 
      "from": "0xDf7D7e053933b5cC24372f878c90E62dADAD5d42", 
      "gasUsed": 21000, 
      "timestamp": 1553357074, 
      "to": "0xA722A50b3B939aBec992753607B648277f781228", 
      "valueEth": 0.10176, 
      "valueWei": "101760456245944314"
    }
  }, 
  {
    "_source": {
      "TxHash": "0x4828f9af2a975b1bb5a87cd48d089ae46c60931a07270d80fcc65523d966d057", 
      "blockNumber": 7541072, 
      "from": "0xDf7D7e053933b5cC24372f878c90E62dADAD5d42", 
      "gasUsed": 21000, 
      "timestamp": 1550878929, 
      "to": "0xA722A50b3B939aBec992753607B648277f781228", 
      "valueEth": 0.109171, 
      "valueWei": "109171346049151794"
    }
  }
]
```
Once the data is returned, the Ethereum timestamp can be easily converted to human readable data (for browser display) like this.

```
transactionsDate = new Date(1550878929 * 1000).toGMTString()
```
The above epoch to date translation will output a value like this
```
Sat Feb 23 2019 09:42:09 GMT+1000 (Australian Eastern Standard Time)
```
### Query search engine server's event logs using native Elasticsearch syntax
This example lets you fetch all of the search engine requests, during the last 24 hours, which returned a response status code of 200.

```
var now = Math.floor(Date.now() / 1000)
var yesterday =  Math.floor((Date.now() - (1*24*60*60*1000)) / 1000)
var q = {
  "query": {
    "bool": {
      "must": [{
          "match": {
            "responseStatus": "200"
          }
        },
        {
          "range": {
            "timestamp": {
              "gte": yesterday,
              "lt": now
            }
          }
        }
      ]
    }
  }
}
```
Call the function like this
```
esss.queryAccessLogsUsingDsl(q)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```

### Express harvest an ABI

```javascript
var abiHash = '0xcc7a8e503d0020095a55ea78198edf358200c39452b6dbbd9a5d26f425cde6bf'
var blockFloor = '4855734'
```

Call the function

```
esss.expressHarvestAnAbi(abiHash, blockFloor)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```
The above code will return a response object like this

```
{ "response": "true" }
```
or this
```
{ "response": "false" }
```
You can use this response object to change how the DApp frontend responds to the end user.
For example.
```javascript
esss.expressHarvestAnAbi(abiHash, blockFloor).then((theStatus) => {
    console.log(JSON.parse(theStatus).response);
    if (JSON.parse(theStatus).response == "true") {
        // Do something 
    } else {
        console.log(JSON.parse(theStatus).response);
        // Do something else
    }
});
```

### Update the indexed state of a contract at a particular address
To update the indexed state of a contract in relation to all of its associated ABIs please set the `abi` var to the string keyword of `'all'`, as shown below.
```javascript
var abi = 'all'
var contractAddress = '0x1234...56789'
```
If you would only like to update the indexed state of a contract in relation to a specific ABI the you can add one ABI explicitly as a string, as shown below.
```javascript
var abi = '[{"valid": "abi", "goes": "here"}]'
var contractAddress = '0x1234...56789
```

Call the function
```javascript
esss.updateStateOfContractAddress(abi, contractAddress)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```
The above code will return a response object like this

```
{ "response": "true" }
```
or this
```
{ "response": "false" }
```
You can use this response object to change how the DApp frontend responds to the end user.
For example.
```javascript
esss.updateStateOfContractAddress(JSON.stringify(abi), instance.address).then((theStatus) => {
    console.log(JSON.parse(theStatus).response);
    if (JSON.parse(theStatus).response == "true") {
        // Do something 
    } else {
        console.log(JSON.parse(theStatus).response);
        // Do something else
    }
});
```
### Update the quality field in ES
Create variables to be passed into the `updateQualityScore` function.

```javascript
var contractAddress = '0x1234...56789
var qualityScore = '25'
```

Call the function
```javascript
esss.updateQualityScore(contractAddress, qualityScore)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```

### Get block interval as per the smart contract search engine config
This returns the block interval setting from the search engine's config. 
```javascript
esss.getBlockInterval()
.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```
Returns a single integer
```
1
```

### Get most recent indexed block number
This returns the block number of the block which has the most recent contract in it
```javascript
esss.getMostRecentIndexedBlockNumber()
.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```
Returns a single integer
```
2098765
```

### Check to see if a transaction has has resolved into a deployed contract yet
Create the variable to be passed into the confirmDeployment function
```javascript
var txHash = 'hash which may or may not have resulted in a deployed contract' //0x1234
```

Call the function
```javascript
esss.confirmDeployment(txHash)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```

Returns data like this if contract address is valid
```
{
  "response": "0x69962D233c454b3f958fA5bc08f61FD252A01E9a"
}
```
Returns data like this if contract address is None 
```
{
  "response": "None"
}
```

### Describe an item using its transaction hash
Create variables to be passed into the `submitAbi` function.

```javascript
var txHash = 'hash of transaction which deployed contract' //0x1234
```

Call the function
```javascript
esss.describeUsingTx(txHash)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```

### Submit ABI and hash for indexing
Create variables to be passed into the `submitAbi` function.

```javascript
var abi = '[valid abi goes here]'
var txHash = 'hash of transaction which deployed contract' //0x1234
```

Call the function
```javascript
esss.submitAbi(abi, txHash)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```


### Submit many ABIs and a single hash for indexing
Create variables to be passed into the `submitManyAbis` function.

```javascript
var abis = {'abis': {0: {'abi': [valid abi string goes here]}, 1: {'abi': [valid abi string goes here]}}}
var txHash = 'hash of transaction which deployed contract' //0x1234
```

Call the function
```javascript
esss.submitManyAbis(abis, txHash)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```

### Sha an ABI
This produces a canonical deterministic Sha3 hash of an ABI. The hash (which is returned from this function) can be used to filter searches as well as customise frontend displays. The next item in this documentation `searchUsingAbi` is a good example of searching for items which adhere to a specific ABI. As you will see, we are about to use this newly created abiSha3 for search. 

```javascript
var abi = '[valid abi goes here]'
```

Call the function
```javascript
esss.shaAbi(abi)
.then(function(result) {
    console.log(JSON.parse(result)["abiSha3"])
  })
  .catch(function() {
    console.log("Error");
  });
```

Returns hash like this
```javascript
0x4722ca26325a45bfad1538b8a73d341548cfa007765f81071e3b0f966adcedff
```

### Search using Address
This returns an indexed item based on its contract address

Call the function by passing in the address of the contract
```javascript
address = '0xfa390f18c916ef2ac3c060920e7dd509baf94eea';
esss.searchUsingAddress(address)
    .then(function(result) {
        console.log(result)
    })
    .catch(function() {
        console.log("Error");
    });
```

### Search using ABI 
This returns any and all items in the index which have the canonical deterministic Sha3 hash which we calculated in the previous step.

Call the function by passing in the Sha3 of the ABI.
```javascript
abi = '0x4722ca26325a45bfad1538b8a73d341548cfa007765f81071e3b0f966adcedff';
esss.searchUsingAbi(abi)
    .then(function(result) {
        console.log(result)
    })
    .catch(function() {
        console.log("Error");
    });
```

Returns (many of) the following data structures in a list format i.e. `[{"TxHash":...}, {{"TxHash":...}}, {{"TxHash":...}}]`

You can iterate through the results or access each list index explicitly as follows. `result[0].functionData.name //CyberMiles Token`

```javascript
 {
    "TxHash": "0x4e950082ac6360c6f8152331a30cbad0c7d08525c4c3914d5236d6fc15f684e8", 
    "abiShaList": [
      "0xeebaaf546eec4bda1a771e7246e58ce83290ce0d24723c3ed62e21506994fc64", 
      "0x2b5710e2cf7eb7c9bd50bfac8e89070bdfed6eb58f0c26915f034595e5443286", 
      "0x7f63f9caca226af6ac1e87fee18b638da04cfbb980f202e8f17855a6d4617a69"
    ], 
    "blockNumber": 4654938, 
    "contractAddress": "0xf85fEea2FdD81d51177F6b8F35F0e6734Ce45F5F", 
    "creator": "0xe5a5d9775ef541b9640bf252d1e725a9b6ccd135", 
    "functionData": {
      "INITIAL_SUPPLY": "1000000000000000000000000000", 
      "decimals": "18", 
      "name": "CyberMiles Token", 
      "owner": "0xE5a5d9775EF541B9640bF252D1E725a9B6CCD135", 
      "paused": "True", 
      "symbol": "CMT", 
      "totalSupply": "1000000000000000000000000000"
    }, 
    "functionDataId": "0xeed7572566a5dc329cc25d8d279987897d8bfe92ddfbfc1840e50851798a12ef", 
    "indexInProgress": "false", 
    "quality": "50", 
    "requiresUpdating": "yes", 
    "uniqueAbiAndAddressHash": "0xeb1e434155dba8a43848ac724b5567bcc6a07b756377e842438229d199ab5e77"
}
```

### Search using Keywords
This returns any and all items in the index which contain one or more instances of *any* of the words in the list.

Prepare the list as JSON
```javascript
data = {}
data["keywords"] = ["cmt", "CyberMiles", "token"]
```

Call the function by passing in the JSON
```javascript
esss.searchUsingKeywords(data)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```

Returns data in the same format as shown above.

### Search using Keywords and ABI
This returns any and all items in the index which contain the ABI hash or any of the words in the list of keywords.

Prepare the list as JSON
```javascript
data = {}
data["keywords"] = ["cmt", "CyberMiles", "token"]
```
Call the function by passing in the Sha3 of the ABI and the list of keywords.

```javascript
esss.searchUsingKeywordsAndAbi("0x2b5710e2cf7eb7c9bd50bfac8e89070bdfed6eb58f0c26915f034595e5443286", data)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
  ```

Returns data in the same format as shown above.

### Get ABI count
This returns the number of indexed ABIs
```javascript
esss.getAbiCount()
.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```
Returns a single integer
```
3
```

### Get all count
This returns the number of contracts which are known (regardless of whether the smart contract search engine has an ABI which is associated with that contract)
```javascript
esss.getAllCount()
.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```
Returns a single integer
```
333
```

### Get contract count
This returns the number of contracts which have at least one ABI associated with them
```javascript
esss.getContractCount()
.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```
Returns a single integer
```
33
```




