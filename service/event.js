const config = require('../config');
const abi = require('../config/erc20abi');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.network.wssProvider));
const contractAddress = config.wallet.token.address;
const tokenContract = new web3.eth.Contract(abi,contractAddress);
const BigNumber = require('bignumber.js');
const notificationServices = require('./notification');
console.log(`listening event from ${config.network.wssProvider} with contract adddress ${contractAddress}`)
tokenContract.events.allEvents({fromBlock: 0, toBlock: "latest"}, function(error, event){
    console.log("allEvents");
    console.log(error);
    console.log("event : ",event);
    if(event.event=="Transfer"){
        let amount = event.returnValues._value;
        let decimals = config.wallet.token.decimal;
        let divisor = 10**decimals;
        divisor = new BigNumber(divisor);
        amount = new BigNumber(amount);
        let params={
            fromAddress:event.returnValues._from,
            toAddress:event.returnValues._to,
            amount:amount.dividedBy(divisor).toNumber()
        }
        notificationServices.sendNotificationTranfer(params);

    }
})


