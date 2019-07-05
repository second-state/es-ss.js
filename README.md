Blockchain data services protocol library

The following are examples of how to use Javascript to interact with the smart contract search engine endpoints.

# Submitting an ABI
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
var _dataObj = JSON.stringify(data);
// Issue the call to the "submit_abi" endpoint
$.ajax({
    url: "https://ethereum.search.secondstate.io/api/submit_abi",
    type: "POST",
    data: _dataObj,
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
