Blockchain data services protocol library

# Setup

Please download and include [the es-ss.js](https://github.com/second-state/es-ss.js/blob/master/es-ss.js) file in your project.

# Usage

## Instantiate
Pass in the protocol & base URL ( *without the trailing slash* ) of a working [smart contract search engine](https://github.com/second-state/smart-contract-search-engine) implementation.

```javascript
var esss = new ESSS("https://ethereum.search.secondstate.io")
```

## Call functions

instance.function(args)

### Submit ABI and hash for indexing
Create variables to be passed into the `submitAbi` function.

```javascript
var abi = '[valid abi goes here]'
var txHash = 'hash of transaction which deployed contract' //0x1234
```

Call the function
```javascript
esss.submitAbi(abi, txHash)
```

### Sha an ABI
This produces a canonical deterministic Sha3 hash of an ABI. The hash (which is returned from this function) can be used to filter searches as well as customise frontend displays. The next item in this documentation `searchUsingAbi` is a good example of searching for items which adhere to a specific ABI. As you will see, we are about to use this newly created abiSha3 for search. 

```javascript
var abi = '[valid abi goes here]'
```

Call the function
```javascript
esss.shaAbi(abi)
```

Returns JSON with hash like this
```javascript
{
  "abiSha3": "0x4722ca26325a45bfad1538b8a73d341548cfa007765f81071e3b0f966adcedff"
}
```

### Search using ABI 
This returns any and all items in the index which have the canonical deterministic Sha3 hash which we calculated in the previous step.

Call the function by passing in the Sha3 of the ABI.
```javascript
esss.searchUsingAbi("0x4722ca26325a45bfad1538b8a73d341548cfa007765f81071e3b0f966adcedff")
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
```

Returns data in the same format as shown above.


