const abi = [{
  "constant": true,
  "inputs": [],
  "name": "getTotalBalance",
  "outputs": [{"name": "", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "charge",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "_getValue", "type": "uint256"}],
  "name": "putForward",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{"name": "_addr", "type": "address"}],
  "name": "getBalanceOf",
  "outputs": [{"name": "", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "_to", "type": "address"}, {"name": "_transferValue", "type": "uint256"}],
  "name": "transfer",
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
  "anonymous": false,
  "inputs": [{"indexed": false, "name": "chargeAddr", "type": "address"}],
  "name": "eventCharge",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "name": "putForwardAddr", "type": "address"}, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "eventPutForward",
  "type": "event"
}]
export {abi};
