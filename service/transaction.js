const config = require('../config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.network.httpProvider));

class TransactionServices {
    sendSigned(serializedTx){
        return web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    }
}

module.exports = new TransactionServices();