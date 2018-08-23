const abi = [{
  "constant": false,
  "inputs": [{"name": "_version", "type": "string"}],
  "name": "deploy",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "getManager",
  "outputs": [{"name": "", "type": "address"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{"name": "_version", "type": "string"}],
  "name": "getAddressOf",
  "outputs": [{"name": "", "type": "address"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "getCurrentAddress",
  "outputs": [{"name": "", "type": "address"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}]
export {abi};
