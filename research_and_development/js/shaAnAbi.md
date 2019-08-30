# Background
"Cryptographic operations like hashing and signing requires that the original data does not change during serialization or parsing [1]". Unlike Python, which facilatates key ordering of JSON objects during stringification, Javascript requires additional work to achieve this same feature.

# Application
The SecondState [Smart Contract Search Engine](https://github.com/second-state/smart-contract-search-engine) (SCSE) requires smart contract ABIs to be deterministically hashed. This allows individual smart contracts to be identified in the indices. At present Python is employed to achieve this task. 

# Solution
The [Javascript in this research and development section](https://github.com/second-state/es-ss.js/blob/master/research_and_development/js/shaAnAbi.js) is designed to achieve deterministic hashing which is on par with [the Python code](https://github.com/second-state/smart-contract-search-engine/blob/2bdc1924a69592216ae3f055383c3bdd4f2cb205/python/harvest.py#L292). 

Whilst this works well, it is not advised to use this Javascript for writing. It should only be used in a setting which will not create irreversable changes. For example it can be used by a DApp to locally create a deterministic hash of ABI text for search and display purposes (read only). Having this available in the Javascript client will provide a quicker hash (because the Javascript does not have to make the call to the server side Python and wait for the result).

# References
[1] https://tools.ietf.org/html/draft-rundgren-json-canonicalization-scheme-05

