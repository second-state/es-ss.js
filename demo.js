let esss = require('./es-ss');
let ESSS = esss.ESSS;
let searchEngineProvider = new ESSS('https://devchain-es.secondstate.io');
abi = "0x36d32fa47738e800edba9a074ffdce4c417c3aef4d8afddd054982db4333a036";
data = {};
data["keywords"] = ["AccountOne", "AccountTwo"];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function demo() {
    console.log("demo");
    var keywordAbiSearch = searchEngineProvider.searchUsingKeywordsAndAbi(abi, data);
    keywordAbiSearch.then(function(result) {
            if (result.length > 0){
                console.log(result);
            }

        })
        .catch(function() {
            console.log("Error");
        });


}


demo();
