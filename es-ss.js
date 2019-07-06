class ESSS {
    // Search Engine Base URL (Please include protocol. Please do not include trailing slash)
    // Example: https://search-engine.com
    constructor(_searchEngineBaseUrl) {
        this.searchEngineBaseUrl = _searchEngineBaseUrl;
        console.log("Search Engine Base URL set to: " + this.searchEngineBaseUrl);
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

    }

    searchUsingKeywordsAndAbi(_abiHash, keywords) {

    }

}

/*
{
  "query": {
    "bool": {
      "must": [
        { "match": { "abiShaList": "0xeebaaf546eec4bda1a771e7246e58ce83290ce0d24723c3ed62e21506994fc64" }},
        {"query_string":{"query":"cmt, token"}}
      ]
    }
  }
}
*/
