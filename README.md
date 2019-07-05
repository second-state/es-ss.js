Blockchain data services protocol library

# Setup

## Import into your project

### HTML/JS
TODO

### Node
TODO

# Usage

## Instantiate
Pass in the protocol & base URL ( *without the trailing slash* ) of a working [smart contract search engine](https://github.com/second-state/smart-contract-search-engine) implementation.

`var esss = new ESSS("https://ethereum.search.secondstate.io")`

### Submit ABI and hash for indexing
Create variables to be passed into the function

`var abi = '[valid abi goes here]'`
`var txHash = 'hash of transaction which deployed contract' //0x1234`

Call the function
`esss.submitAbi(abi, txHash)`

