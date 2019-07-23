function ESSS(_searchEngineBaseUrl) {
    this.searchEngineBaseUrl = _searchEngineBaseUrl;
    
    // Search Engine Base URL (Please include protocol. Please do not include trailing slash)
    // Example: https://search-engine.com
    /*constructor(_searchEngineBaseUrl) {
        this.searchEngineBaseUrl = _searchEngineBaseUrl;
        console.log("Search Engine Base URL set to: " + this.searchEngineBaseUrl);
    }*/

    this.describe = function(){
        let description = "Provider: " + this.searchEngineBaseUrl;
        return description;
    }

    this.getSearchEngineBaseUrl = function(){
        return this.searchEngineBaseUrl;
    }

    this.setSearchEngineBaseUrl = function(_searchEngineBaseUrl){
        this.searchEngineBaseUrl = _searchEngineBaseUrl;
    }

    this.getAbiCount = function() {
        let url = this.getSearchEngineBaseUrl() + "/api/es_get_abi_count";
        return new Promise(function(resolve, reject) {
            XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        jsonResponse = JSON.parse(xhr.responseText);
                        abiCount = jsonResponse["hits"]["total"]
                        resolve(abiCount);
                    }
                } 
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
                xhr.send(JSON.stringify());
            });
    }

    this.getAllCount = function() {
        let url = this.getSearchEngineBaseUrl() + "/api/es_get_all_count";
        return new Promise(function(resolve, reject) {
            XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        jsonResponse = JSON.parse(xhr.responseText);
                        allCount = jsonResponse["hits"]["total"]
                        resolve(allCount);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.send(JSON.stringify());
        });
    }


    this.getContractCount = function() {
        let url = this.getSearchEngineBaseUrl() + "/api/es_get_contract_count";
        return new Promise(function(resolve, reject) {
            XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        jsonResponse = JSON.parse(xhr.responseText);
                        contractCount = jsonResponse["hits"]["total"]
                        resolve(contractCount);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.send(JSON.stringify());
        });
    }

    this.describeUsingTx = function(_transactionHash) {
        let url = this.getSearchEngineBaseUrl() + "/api/describe_using_tx";
        return new Promise(function(resolve, reject) {
        XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        //data
        var data = {};
        data["hash"] = _transactionHash;
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        });
    }

    this.submitAbi = function(_abi, _transactionHash) {
        let url = this.getSearchEngineBaseUrl() + "/api/submit_abi";
        return new Promise(function(resolve, reject) {
        XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        //data
        var data = {};
        data["abi"] = _abi;
        data["hash"] = _transactionHash;
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        });
    }

    this.submitManyAbis = function(_abis, _transactionHash) {
        let url = this.getSearchEngineBaseUrl() + "/api/submit_many_abis";
        return new Promise(function(resolve, reject) {
        XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        //data
        var data = {};
        data["abis"] = _abis;
        data["hash"] = _transactionHash;
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        });
    }


    this.shaAbi = function(_abi) {
        let url = this.getSearchEngineBaseUrl() + "/api/sha_an_abi";
        return new Promise(function(resolve, reject) {
            XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            var data = {};
            data["abi"] = _abi;
            
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        });
    }

    this.searchUsingAbi = function(_abiHash) {
        let url = this.getSearchEngineBaseUrl() + "/api/es_search";
        return new Promise(function(resolve, reject) {
            // request initialisation
            XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            //data
            var data = '{"query":{"bool":{"must":[{"match":{"abiShaList":"' + _abiHash + '"}}]}}}'
            //execution
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
        });
    }

    this.searchUsingKeywords = function(_keywords) {
        let url = this.getSearchEngineBaseUrl() + "/api/es_search";
        return new Promise(function(resolve, reject) {
            // request initialisation
            XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            //data
            var listOfKeywords = _keywords["keywords"];
            var string = "";
            var i;
            for (i = 0; i < listOfKeywords.length; i++) {
                if (string.length == 0) {
                    string = string + '"' + listOfKeywords[i];
                } else {
                    string = string + "," + listOfKeywords[i];
                }
            }
            string = string + '"'
            var data = '{"query":{"query_string":{"query":' + string + '}}}';
            console.log(data);
            //execution
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(JSON.parse(data)));
        });
    }

    this.searchUsingKeywordsAndAbi = function(_abiHash, _keywords) {
        let url = this.getSearchEngineBaseUrl() + "/api/es_search";
        return new Promise(function(resolve, reject) {
        // request initialisation
        XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        //data
        var listOfKeywords = _keywords["keywords"];
        var string = "";
        var i;
        for (i = 0; i < listOfKeywords.length; i++) {
            if (string.length == 0) {
                string = string + '"' + listOfKeywords[i];
            } else {
                string = string + "," + listOfKeywords[i];
            }
        }
        string = string + '"'
        var data = '{"query":{"bool":{"must":[{"match":{"abiShaList":"' + _abiHash + '"}},{"query_string":{"query":' + string + '}}]}}}';
        console.log(data);
            //execution
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(JSON.parse(data)));
        });
    }
}
module.exports = {
    ESSS: ESSS
}
