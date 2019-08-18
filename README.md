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
let searchEngineProvider = new ESSS('https://ethereum.search.secondstate.io');

// Ethereum Classic (ETC) MainNet
//let searchEngineProvider = new ESSS('https://ethereum-classic.search.secondstate.io');

// CyberMiles (CMT) MainNet
//let searchEngineProvider = new ESSS('https://cmt.search.secondstate.io');

// CyberMiles (CMT) TestNet
//let searchEngineProvider = new ESSS('https://cmt-testnet.search.secondstate.io');

// SecondState DevChain
//let searchEngineProvider = new ESSS('https://devchain-es.secondstate.io');
```
You can now call each of the available functions as shown below in the *Usage* section.

# Usage Examples
The following are all using the `EthMainNet` provider from above. Please ensure to use the correct provider for your application.

### Update the indexed state of a contract at a particular address
```javascript
var abi = '[valid abi goes here]'
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
