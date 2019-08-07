var esss = require('./es-ss');

module.exports = esss

/* Example Usage below

// Importing into your application
let esss = require("es-ss.js");  
let ESSS = esss.ESSS;

//Examples of setting the provider 
// Ethereum (ETH) MainNet 
let searchEngineProvider = new ESSS('https://ethereum.search.secondstate.io');

// Ethereum Classic (ETC) MainNet
//let searchEngineProvider = new ESSS('https://ethereum-classic.search.secondstate.io');

// CyberMiles (CMT) MainNet
//let searchEngineProvider = new ESSS('https://cmt.search.secondstate.io');

// CyberMiles (CMT) TestNet
//let searchEngineProvider = new ESSS('https://cmt-testnet.search.secondstate.io');

// SecondState DevChain
//let searchEngineProvider = new ESSS('https://devchain-es.secondstate.io/');

// Examples of function calls
// Please note, these examples all use ETH MainNet, you must reference your correct provider for your needs

//getAbiCount
var abiCount = searchEngineProvider.getAbiCount();
abiCount.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });

//getAllCount
var allCount = searchEngineProvider.getAllCount();
allCount.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });

//getContractCount
var contractCount = searchEngineProvider.getContractCount();
contractCount.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });

//submitAbi
var abiSubmission = searchEngineProvider.submitAbi(abi, tx);
abiSubmission.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });

//shaAbi
var abiSha = searchEngineProvider.shaAbi(abi);
abiSha.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });

//searchUsingAbi
abiHash = '0x8d167c9d853afbe7638706bf45f613cd7d8b6e8fdb8bab069052105b7bf9b3c4';
var abiSearch = searchEngineProvider.searchUsingAbi(abiHash);
abiSearch.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });

//searchUsingKeywords
keywords = {};
keywords["keywords"] = ['cybermiles, cmt'];
var keywordSearch = searchEngineProvider.searchUsingKeywords(keywords);
keywordSearch.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });

// searchUsingKeywordsAndAbi
abiHash = '0x8d167c9d853afbe7638706bf45f613cd7d8b6e8fdb8bab069052105b7bf9b3c4';
keywords = {};
keywords["keywords"] = ['ETHLIUM'];
var keywordAbiSearch = searchEngineProvider.searchUsingKeywordsAndAbi(abiHash, keywords);
keywordAbiSearch.then(function(result) {
    console.log("Result is " + result);
  })
  .catch(function() {
    console.log("Error");
  });
*/
