const path = require('path');
const fs = require('fs');
const solc = require('solc');

const solpath = path.resolve(__dirname, 'contracts.sol');
const contract = fs.readFileSync(solpath, 'utf-8');
const data = solc.compile(contract, 1);

console.log(data.contracts[':ParrentAddress'].interface);
module.exports = data.contracts[':TokenERC20'];
