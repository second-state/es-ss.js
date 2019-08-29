// The following ABIs are variations which facilitate the testing of the code
_theAbi = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
//_theAbi = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"},{"name":"_to","type":"address"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"}]
//_theAbi = [{"constant":false,"inputs":[{"type":"uint256","name":"_value"},{"name":"_to","type":"address"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"}]
//_theAbi = [{"payable":false,"constant":false,"inputs":[{"type":"uint256","name":"_value"},{"name":"_to","type":"address"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function","stateMutability":"nonpayable"}]
//_theAbi = [{"payable":false,"constant":false,"inputs":[{"type":"uint256","name":"_value"},{"name":"_to","type":"address"}],"name":"transfer","outputs":[{"type":"bool","name":""}],"type":"function","stateMutability":"nonpayable"}]
//_theAbi = [{"payable":false,"constant":false,"inputs":[{"type":"uint256","name":"_value"},{"name":"_to","type":"address"}],"name":"transfer","outputs":[{"type":"bool","name":""}],"type":"function","stateMutability":"nonpayable"}]
//_theAbi = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

// The following compare function allows us to sort internal data by its name key
function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    let comparison = 0;
    if (nameA > nameB) {
        comparison = 1;
    } else if (nameA < nameB) {
        comparison = -1;
    }
    return comparison;
}

// The following shaAnAbi function aims to produce the same output as the original Python code in the smart contract search engine
function shaAnAbi(_theJSONAbi) {
    // Find the length of the ABI
    var abiLength = _theJSONAbi.length;
    //console.log("ABI Length:" + abiLength)
    // Iterate through the items in the ABI
    for (var i = 0; i < abiLength; i++) {
        //console.log(JSON.stringify(_theJSONAbi[i]));
        for (const [key, value] of Object.entries(_theJSONAbi[i])) {
            //console.log("Key: " + key + "\nValue: " + value);
            if (typeof value !== "string" && typeof value !== "boolean" && typeof value !== "number" && value.length > 1) {
                if (value[0].constructor == Object) {
                    value.sort(compare);
                } else {
                    value.sort();
                }
            }
        }
    }
    theAbiSorted = _theJSONAbi.sort();
    theAbiAsString = JSON.stringify(_theJSONAbi);
    // Javascript's stringify function does not produce the same output as Python's dumps function. This is a very interesting and real issue which requires some manual intervention. The following code makes Javascript compliant to the pre-existing Python
    theAbiAsString2 = theAbiAsString.replace(/[\:]/g, ": ");
    theAbiAsString3 = theAbiAsString2.replace(/[\,]/g, ", ");
    theAbiAsString4 = theAbiAsString3.replace(/[\r\n\t]/g, "");
    theAbiAsString5 = theAbiAsString4.replace(/ +/g, ' ');
    console.log("AFTER");
    console.log(theAbiAsString5);
    theAbiHash = web3.toHex(web3.sha3(text=theAbiAsString5));
    console.log(theAbiHash);
}

jsonObject = JSON.parse(JSON.stringify(_theAbi));

// The desired result is not 100% tested. This work will continue immediately and this will be updated ASAP
//shaAnAbi(jsonObject);
