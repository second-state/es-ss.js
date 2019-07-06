Blockchain data services protocol library

# Setup

Please download and include [the es-ss.js]("https://github.com/second-state/es-ss.js/blob/master/es-ss.js") file in your project.

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

