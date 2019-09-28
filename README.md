Blockchain data services protocol library

If you would like to use this product outside of a server environment i.e. just use HTML/JS on the client side, please head over to the [traditional non node js area](https://github.com/second-state/es-ss.js/tree/master/traditional_non_node_js). Otherwise, continue below using NodeJS.

## Node install
To use this in a Node.js environment please install using npm, as shown below.

```bash
npm install es-ss.js
```
## Import
Once installed, please require it inside your software's appropriate application (js) file, as shown below.

```javascript
let esss = require("es-ss.js"); 
let ESSS = esss.ESSS;
```
## Set provider
You can then create an instantiation of the es-js software by passing in the provider (passing in any single working smart contract search engine provider URL as part of the instantiation). Here are some examples.

```javascript
// Ethereum (ETH) MainNet 
let searchEngineProvider = new ESSS('https://eth.search.secondstate.io');

// Ethereum Classic (ETC) MainNet
//let searchEngineProvider = new ESSS('https://etc.search.secondstate.io');

// CyberMiles (CMT) MainNet
//let searchEngineProvider = new ESSS('https://cmt.search.secondstate.io');

// CyberMiles (CMT) TestNet
//let searchEngineProvider = new ESSS('https://testnet.cmt.search.secondstate.io');

// SecondState DevChain
//let searchEngineProvider = new ESSS('https://devchain.ss.search.secondstate.io');
```
You can now call each of the available functions as shown below in the *Usage* section.

# Usage Examples
The following are all using the `EthMainNet` provider from above. Please ensure to use the correct provider for your application.

### Search using native Elasticsearch DSL
```javascript
var q = { query: { match_all: {} } }
```
Or perhaps, once you have a contract address from the above you can practice just returning one record (at contract adddress 0x...)
```
var q = {"query":{"bool":{"must":[{"match":{"contractAddress":"0x6A4eB89b9d0519F6e344D36a70b4450193bd9C78"}}]}}}
```

Call the function
```javascript
searchEngineProvider.queryUsingDsl(q).then((theResult) => {
    console.log(theResult);
})
```
### Query EVENTS using native Elasticsearch syntax

Fetch events which were emitted by a particular smart `contractAddress`
```javascript
var q = {"query":{"bool":{"must":[{"match":{"contractAddress":"0xbab9a7803afa2bf76175bbc308340f029b71a585"}}]}}}
```

You can also query using numerical range. Here we look at all transactions send to an address over the last 24 hours.

```
var now = Math.floor(Date.now() / 1000)
var yesterday =  Math.floor((Date.now() - (1*24*60*60*1000)) / 1000)
var q = {
  "query": {
    "bool": {
      "must": [{
          "match": {
            "contractAddress": "0xbab9a7803afa2bf76175bbc308340f029b71a585"
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
Call the function

```
searchEngineProvider.queryEventUsingDsl(q).then((theResult) => {
    console.log(theResult);
```
The code above will return data like this
```
[{
        "_source": {
            "TxHash": "0xd56124d1f0e3b4bbc90ec534fcf50353c2db0d4c1235e157d0faed218b596d12",
            "blockNumber": 6774071,
            "contractAddress": "0xbaB9a7803afA2Bf76175BBc308340F029b71a585",
            "eventLogData": {
                "0": [{
                    "sseo5": 333,
                    "sseo6": 332,
                    "sseo7": 333
                }]
            },
            "from": "0xd7617c5e4f0aaeb288e622764cf0d34fa5acefe8",
            "id": "0x5415ac1e",
            "inputs": [{
                    "indexed": "True",
                    "name": "sseo5",
                    "type": "uint256"
                },
                {
                    "indexed": "True",
                    "name": "sseo6",
                    "type": "uint256"
                },
                {
                    "indexed": "False",
                    "name": "sseo7",
                    "type": "uint256"
                }
            ],
            "name": "EventThree",
            "timestamp": 1569638619,
            "txEventKey": "0xbc39a5d3c55db07ffe43413ed75dcab420acfda61f979a1e9a893aa5016c00e4"
        }
    },
    {
        "_source": {
            "TxHash": "0xbef0095d509d2f2f810b217ef26204922901dc06136a4b2022bb1b823ead2ef8",
            "blockNumber": 6770900,
            "contractAddress": "0xbaB9a7803afA2Bf76175BBc308340F029b71a585",
            "eventLogData": {
                "0": [{
                    "asdf": 10,
                    "asdf2": 9
                }]
            },
            "from": "0xd7617c5e4f0aaeb288e622764cf0d34fa5acefe8",
            "id": "0xdc8fec5c",
            "inputs": [{
                    "indexed": "True",
                    "name": "asdf",
                    "type": "uint256"
                },
                {
                    "indexed": "True",
                    "name": "asdf2",
                    "type": "uint256"
                }
            ],
            "name": "EventOne",
            "timestamp": 1569635386,
            "txEventKey": "0xff24d7a98a20fd1e5a7030866264c334a7acf61332b45a3887bfce43137f2914"
        }
    },
    {
        "_source": {
            "TxHash": "0x0322253cbefcfda9599f8bd43e3f5d9084ab4b6bf9e21e61898f9ae977761d91",
            "blockNumber": 6770967,
            "contractAddress": "0xbaB9a7803afA2Bf76175BBc308340F029b71a585",
            "eventLogData": {
                "0": [{
                    "asdf": 20,
                    "asdf2": 19
                }]
            },
            "from": "0xd7617c5e4f0aaeb288e622764cf0d34fa5acefe8",
            "id": "0xdc8fec5c",
            "inputs": [{
                    "indexed": "True",
                    "name": "asdf",
                    "type": "uint256"
                },
                {
                    "indexed": "True",
                    "name": "asdf2",
                    "type": "uint256"
                }
            ],
            "name": "EventOne",
            "timestamp": 1569635454,
            "txEventKey": "0x7a9ab94a786ba870204730e7d6c504384429ab76a13d4ff9cbb7ca5943cd715d"
        }
    },
    {
        "_source": {
            "TxHash": "0xd56124d1f0e3b4bbc90ec534fcf50353c2db0d4c1235e157d0faed218b596d12",
            "blockNumber": 6774071,
            "contractAddress": "0xbaB9a7803afA2Bf76175BBc308340F029b71a585",
            "eventLogData": {
                "0": [{
                    "sseo3": 333,
                    "sseo4": 332
                }]
            },
            "from": "0xd7617c5e4f0aaeb288e622764cf0d34fa5acefe8",
            "id": "0x9021d3b7",
            "inputs": [{
                    "indexed": "True",
                    "name": "sseo3",
                    "type": "uint256"
                },
                {
                    "indexed": "False",
                    "name": "sseo4",
                    "type": "uint256"
                }
            ],
            "name": "EventTwo",
            "timestamp": 1569638619,
            "txEventKey": "0x1eec7da435469b4405ce9d67f99789a0fbdb1ad5693273b17b9ab329a81559e5"
        }
    },
    {
        "_source": {
            "TxHash": "0xec31a3b4b907b94376f1ba36f9a4b190aa834117967cb8ce12b4385f07619950",
            "blockNumber": 6773641,
            "contractAddress": "0xbaB9a7803afA2Bf76175BBc308340F029b71a585",
            "eventLogData": {
                "0": [{
                    "sseo1": 99,
                    "sseo2": 98
                }]
            },
            "from": "0xd7617c5e4f0aaeb288e622764cf0d34fa5acefe8",
            "id": "0xdc8fec5c",
            "inputs": [{
                    "indexed": "True",
                    "name": "sseo1",
                    "type": "uint256"
                },
                {
                    "indexed": "True",
                    "name": "sseo2",
                    "type": "uint256"
                }
            ],
            "name": "EventOne",
            "timestamp": 1569638181,
            "txEventKey": "0xe0aa9f4d38e724319175b41df9a1fe232ca04d73b7737a2356b3594bb29edc5c"
        }
    }
]
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
searchEngineProvider.queryTxUsingDsl(q).then((theResult) => {
    console.log(theResult);
})
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
### Query search engine server's Apache2 access logs using native Elasticsearch syntax
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
searchEngineProvider.queryAccessLogsUsingDsl(q)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```
The following example will return the count of unique IP addresses (individual users) who received a success 200 response code during the last 24 hours
```
var now = Math.floor(Date.now() / 1000)
var yesterday = Math.floor((Date.now() - (1 * 24 * 60 * 60 * 1000)) / 1000)
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
    },
    "aggs": {
        "by_ip": {
            "terms": {
                "field": "callingIP"
            }
        }
    }
}
```

```
searchEngineProvider.queryAccessLogsUsingDsl(q)
    .then(function(result) {
        var uniqueList = []
        var a = JSON.parse(result);
        for (i = 0; i < a.length; i++) {
            if (uniqueList.indexOf(a[i]["_source"]["callingIp"]) == -1) {
                uniqueList.push(a[i]["_source"]["callingIp"])
            }
        }
        console.log("Unique IP Addresses: " + uniqueList.length);
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
searchEngineProvider.expressHarvestAnAbi(abiHash, blockFloor)
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
searchEngineProvider.expressHarvestAnAbi(abiHash, blockFloor).then((theStatus) => {
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
var contractAddress = '0x1234...56789
```
If you would only like to update the indexed state of a contract in relation to a specific ABI the you can add one ABI explicitly as a string, as shown below.
```javascript
var abi = '[{"valid": "abi", "goes": "here"}]'
var contractAddress = '0x1234...56789
```

Call the function
```javascript
var indexingResult = searchEngineProvider.updateStateOfContractAddress(abi, contractAddress);
indexingResult.then(function(result) {
    console.log("Result is " + result);
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
searchEngineProvider.updateStateOfContractAddress(JSON.stringify(abi), instance.address).then((theStatus) => {
    console.log(JSON.parse(theStatus).response);
    if (JSON.parse(theStatus).response == "true") {
        // Do something 
    } else {
        console.log(JSON.parse(theStatus).response);
        // Do something else
    }
});
```

### Get the block interval, as per the smart contract search engine config

```javascript
var number = searchEngineProvider.getBlockInterval();
number.then(function(result) {
    console.log("Most recent block number is " + result);
  })
  .catch(function() {
    console.log("Error");
});
```
Call the function using different syntax
```
searchEngineProvider.getBlockInterval().then((theResult) => {
    console.log(theResult);
})
```
Returns single int
```
1
```

### Get the most recent indexed block number

```javascript
var number = searchEngineProvider.getMostRecentIndexedBlockNumber();
number.then(function(result) {
    console.log("Most recent block number is " + result);
  })
  .catch(function() {
    console.log("Error");
});
```

### Check to see if a contract has been deployed using the respective transaction hash
Create the variable to be passed in to the confirmDeployment function

```javascript
var txHash = 'hash of transaction which is perhaps not an already deployed contract' //0x1234
```

Call the function
```javascript
var description = searchEngineProvider.confirmDeployment(txHash);
description.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```

Call the function using different syntax
```
searchEngineProvider.confirmDeployment(txHash).then((theResult) => {
    var r = JSON.parse(theResult);
    console.log(r);
})
```

Returns data like this
```
{ response: '0x69962D233c454b3f958fA5bc08f61FD252A01E9a' }
```

### Describe an item using its transaction hash
Create variables to be passed into the `describeUsingTx` function.

```javascript
var txHash = 'hash of transaction which deployed contract' //0x1234
```

Call the function
```javascript
var description = searchEngineProvider.describeUsingTx(txHash);
description.then(function(result) {
    console.log("Result is " + result);
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
var abiSubmission = searchEngineProvider.submitAbi(abi, txHash);
abiSubmission.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```

### Submit many ABIs (in conjuntion with a single Tx hash) for indexing
Create variables to be passed into the `submitManyAbis` function.


```javascript
var abis = {'abis': {0: {'abi': [valid abi string goes here]}, 1: {'abi': [valid abi string goes here]}}}
var txHash = 'hash of transaction which deployed contract' //0x1234
```

Call the function
```javascript
var abiSubmission = searchEngineProvider.submitManyAbis(abis, txHash);
abiSubmission.then(function(result) {
    console.log("Result is " + result);
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
var abiSha = searchEngineProvider.shaAbi(abi);
abiSha.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```

Returns hash like this
```javascript
0x4722ca26325a45bfad1538b8a73d341548cfa007765f81071e3b0f966adcedff
```
### Search using an Address
This returns an indexed item based on its contract address

Call the function by passing in the address of the smart contract
```javascript
address = '0xfA390F18C916EF2aC3C060920e7DD509baf94EEa';
var addressSearch = searchEngineProvider.searchUsingAddress(address);
addressSearch.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```

### Search using ABI 
This returns any and all items in the index which have the canonical deterministic Sha3 hash which we calculated in the previous step.

Call the function by passing in the Sha3 of the ABI.
```javascript
abiHash = '0x4722ca26325a45bfad1538b8a73d341548cfa007765f81071e3b0f966adcedff';
var abiSearch = searchEngineProvider.searchUsingAbi(abiHash);
abiSearch.then(function(result) {
    console.log("Result is " + result);
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
var keywordSearch = searchEngineProvider.searchUsingKeywords(data);
keywordSearch.then(function(result) {
    console.log("Result is " + result);
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
Prepare the abiHash as a string
```javascript
abiHash = '0x4722ca26325a45bfad1538b8a73d341548cfa007765f81071e3b0f966adcedff';
```
Call the function by passing in the Sha3 of the ABI and the list of keywords.

```javascript
var keywordAbiSearch = searchEngineProvider.searchUsingKeywordsAndAbi(abiHash, data);
keywordAbiSearch.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
  ```

Returns data in the same format as shown above.

### Get ABI count
This returns the number of indexed ABIs
```javascript
var abiCount = searchEngineProvider.getAbiCount();
abiCount.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```
Returns a single integer
```
105
```

### Get all count
This returns the number of contracts which are known (regardless of whether the smart contract search engine has an ABI which is associated with that contract)
```javascript
var allCount = searchEngineProvider.getAllCount();
allCount.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```
Returns a single integer
```
953457
```

### Get contract count
This returns the number of contracts which have at least one ABI associated with them
```javascript
var contractCount = searchEngineProvider.getContractCount();
contractCount.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });

```
Returns a single integer
```
24501
```

### Update the quality score field
```javascript
var contractAddress = '0x12345...678'
var qualityScore = '50' //Must be a number between 0 and 100
```

Call the function
```javascript
var qualityScoreResult = searchEngineProvider.updateQualityScore(contractAddress, qualityScore);
qualityScoreResult.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
```
