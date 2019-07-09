class ESSS {
    // Search Engine Base URL (Please include protocol. Please do not include trailing slash)
    // Example: https://search-engine.com
    constructor(_searchEngineBaseUrl) {
        this.searchEngineBaseUrl = _searchEngineBaseUrl;
        console.log("Search Engine Base URL set to: " + this.searchEngineBaseUrl);
    }

    getAbiCount() {
        // request initialisation
        var xhr = new XMLHttpRequest();
        var url = this.searchEngineBaseUrl + "/api/es_get_abi_count";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        //execution
        xhr.onload = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    jsonResponse = JSON.parse(xhr.responseText);
                    console.log(jsonResponse["hits"]["total"]);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(JSON.stringify());
    }

    getAllCount() {
        // request initialisation
        var xhr = new XMLHttpRequest();
        var url = this.searchEngineBaseUrl + "/api/es_get_all_count";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        //execution
        xhr.onload = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    jsonResponse = JSON.parse(xhr.responseText);
                    console.log(jsonResponse["hits"]["total"]);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(JSON.stringify());
    }

    getContractCount() {
        // request initialisation
        var xhr = new XMLHttpRequest();
        var url = this.searchEngineBaseUrl + "/api/es_get_contract_count";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        //execution
        xhr.onload = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    jsonResponse = JSON.parse(xhr.responseText);
                    console.log(jsonResponse["hits"]["total"]);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(JSON.stringify());
    }

    submitAbi(_abi, _transactionHash) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        var url = this.searchEngineBaseUrl + "/api/submit_abi";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        //data
        var data = {};
        data["abi"] = _abi;
        data["hash"] = _transactionHash;
        //execution
        xhr.onload = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(JSON.stringify(data));
    }

    shaAbi(_abi) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        var url = this.searchEngineBaseUrl + "/api/sha_an_abi";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        //data
        var data = {};
        data["abi"] = _abi;
        //execution
        xhr.onload = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(JSON.stringify(data));
    }

    searchUsingAbi(_abiHash) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        var url = this.searchEngineBaseUrl + "/api/es_search";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        //data
        var data = '{"query":{"bool":{"must":[{"match":{"abiShaList":"' + _abiHash + '"}}]}}}'
        //execution
        xhr.onload = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(JSON.stringify(JSON.parse(data)));
    }

    searchUsingKeywords(_keywords) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        var url = this.searchEngineBaseUrl + "/api/es_search";
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
                    console.log(xhr.responseText);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(JSON.stringify(JSON.parse(data)));

    }

    searchUsingKeywordsAndAbi(_abiHash, _keywords) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        var url = this.searchEngineBaseUrl + "/api/es_search";
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
                    console.log(xhr.responseText);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(JSON.stringify(JSON.parse(data)));
    }
}
