function ESSS(_searchEngineBaseUrl) {
    this.searchEngineBaseUrl = _searchEngineBaseUrl;
    this.indexStatus = {};

    this.setIndexStatusToTrue = function(_transactionHash){
        this.indexStatus[_transactionHash] = true;
    }

    this.setIndexStatusToFalse = function(_transactionHash){
        this.indexStatus[_transactionHash] = false;
    }

    this.getIndexStatus = function(_transactionHash){
        return this.indexStatus[_transactionHash];
    }

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

    this.getMostRecentIndexedBlockNumber = function() {
        let url = this.getSearchEngineBaseUrl() + "/api/most_recent_indexed_block_number";
        return new Promise(function(resolve, reject) {
            XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        jsonResponse = JSON.parse(xhr.responseText);
                        blockNumber = jsonResponse["aggregations"]["most_recent_block"]["value"]
                        resolve(blockNumber);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.send(JSON.stringify());
        });
    }

    this.updateStateOfContractAddress = function(_abi, _address) {
        let url = this.getSearchEngineBaseUrl() + "/api/update_state_of_contract_address";
        return new Promise(function(resolve, reject) {
            XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            //data
            var data = {};
            data["abi"] = _abi;
            data["address"] = _address;
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                } 
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.send(JSON.stringify(data));
            });
    }

    this.updateQualityScore = function(_contractAddress, _qualityScore) {
        let url = this.getSearchEngineBaseUrl() + "/api/es_update_quality";
        return new Promise(function(resolve, reject) {
            XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            //data
            var data = {};
            data["contractAddress"] = _contractAddress;
            data["qualityScore"] = _qualityScore;
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                } 
            };
            xhr.onerror = reject;
            xhr.open("POST", url, true);
            xhr.send(JSON.stringify(data));
            });
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

    this.confirmDeployment = function(_transactionHash) {
        let url = this.getSearchEngineBaseUrl() + "/api/confirm_deployment";
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

    this.searchUsingAddress = function(_address) {
        let url = this.getSearchEngineBaseUrl() + "/api/es_search";
        return new Promise(function(resolve, reject) {
            // request initialisation
            XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            //data
            var data = '{"query":{"bool":{"must":[{"match":{"contractAddress":"' + _address + '"}}]}}}'
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
        //console.log(data);
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
