Blockchain data services protocol library

The following are examples of how to use Javascript to interact with the smart contract search engine endpoints.

# Submit ABI and hash for indexing

Endpoint: `base_url/` `api/submit_abi`

The smart contract search engine allows anyone to upload their ABI and have their smart contract instance indexed immediately.

There is a way for a given end user to submit an ABI (using a website interface). This can be seen at the [upload ABI page](https://ethereum.search.secondstate.io/ethAbi.html) on the [Ethereum smart contract search engine](https://ethereum.search.secondstate.io/ethIndex.html).

*Submitting and ABI can also be performed (programatically) by machine*, using the following Javascript syntax.

```javascript
// Create a blank data object
data = {}
// Add a string representation of a valid ABI (this is just a fictitious example to save space).
data["abi"] = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]'
// Add the transaction hash in which the above (ABI) was deployed (tx has of the newly instantiated smart contract instance)
data["hash"] = "0x9294bb3fad1cf84d17680c992f375d240d9367a8d089cbdb616af112b1482a59"
// Stringify the data for use via AJAX
var dataString = JSON.stringify(data);
// Issue the call to the "submit_abi" endpoint
$.ajax({
    url: "https://ethereum.search.secondstate.io/api/submit_abi",
    type: "POST",
    data: dataString,
    dataType: "json",
    contentType: "application/json",
    success: function(response) {
        console.log(response);
    },
    error: function(xhr) {
        console.log("Uploading of ABI failed");
    }
});
```
If the above code succeeds it is because there is a legitimate smart contract instance (which adheres to the ABI) at the transaction hash provided. If not, it will fail.

# Generating the canonical deterministic hash of an ABI

Endpoint: `base_url/` `api/sha_an_abi`

The 'api/sha_an_api' endpoint will return the canonical deterministic Sha3 hash of an ABI which is provided as shown below. Having the hash is useful for frontend development i.e. querying the search engine's API for items which are exclusive to that ABI and/or allowing custom (HTML/JS) frontend display based on that ABI.

```javascript
// Create a blank data object
data = {}
// Add a string representation of a valid ABI (this is the transfer function ABI for demonstration purposes)
data["abi"] = '[{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'
var dataString = JSON.stringify(data);
$.ajax({
    url: "https://ethereum.search.secondstate.io/api/sha_an_abi",
    type: "POST",
    data: dataString,
    dataType: "json",
    contentType: "application/json",
    success: function(response) {
        console.log(response);
    },
    error: function(xhr) {
        console.log("Hashing of ABI failed");
    }
});
```
This code will return the following JSON data
```javascript
{abiSha3: "0x7f63f9caca226af6ac1e87fee18b638da04cfbb980f202e8f17855a6d4617a69"}
```

# Search based on ABI

Endpoint: `base_url/` `api/search_via_abi`

The following Javascript code will return all items (from the search engine API) which adhere to the ABI in question. To perform the search query simply provide the canonical deterministic hash of the ABI (see above for instructions about how to calculate the hash).

```javascript
// Create a blank data object
data = {}
// Add a string representation of the canonical deterministic hash of the ABI in question
data["hash"] = '0x7f63f9caca226af6ac1e87fee18b638da04cfbb980f202e8f17855a6d4617a69'
var dataString = JSON.stringify(data);
$.ajax({
    url: "base_url/api/search_via_abi",
    type: "POST",
    data: dataString,
    dataType: "json",
    contentType: "application/json",
    success: function(response) {
        console.log(response);
    },
    error: function(xhr) {
        console.log("Unable to retrieve items for that hash");
    }
});
```

# Search based on Keywords

Endpoint: `base_url/` `api/search_via_keywords`

The following endpoint will return all items (from the smart contract search engine API) which contain the key words in the list.

```javascript
// Create a blank data object
data = {}
// Add a list of keywords 
data["keywords"] = '["cybermiles", "cmt"]'
var dataString = JSON.stringify(data);
$.ajax({
    url: "base_url/api/search_via_keywords",
    type: "POST",
    data: dataString,
    dataType: "json",
    contentType: "application/json",
    success: function(response) {
        console.log(response);
    },
    error: function(xhr) {
        console.log("Unable to retrieve items with those keywords");
    }
});
```

# Search based on keywords and ABI

Endpoint: `base_url/` `api/search_via_keywords_and_abi`

```javascript
// Create a blank data object
data = {}
// Add a string representation of the canonical deterministic hash of the ABI in question
data["hash"] = '0x7f63f9caca226af6ac1e87fee18b638da04cfbb980f202e8f17855a6d4617a69'
// Add a list of keywords 
data["keywords"] = '["cybermiles", "cmt"]'
var dataString = JSON.stringify(data);
$.ajax({
    url: "base_url/api/search_via_keywords_and_abi",
    type: "POST",
    data: dataString,
    dataType: "json",
    contentType: "application/json",
    success: function(response) {
        console.log(response);
    },
    error: function(xhr) {
        console.log("Unable to retrieve items with that ABI those keywords");
    }
});
```

