const config = require('../config');
const abi = require('../config/erc20abi');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.network.httpProvider));
const contractAddress = config.wallet.token.address;
const tokenContract = new web3.eth.Contract(abi,contractAddress);
const BigNumber = require('bignumber.js');
class TokenServices {

    info(){
        let workers = [
            tokenContract.methods.name().call(),
            tokenContract.methods.symbol().call(),
            tokenContract.methods.totalSupply().call(),
            tokenContract.methods.decimals().call()
        ];
        return Promise.all(workers).then(res=>{
            let decimals = res[3];
            let divisor = 10**decimals;
            divisor = new BigNumber(divisor);
            let totalSupply = res[2];
            totalSupply = new BigNumber(totalSupply);
            return Promise.resolve({
                'name':res[0],
                'symbol':res[1],
                'totalSupply':totalSupply.dividedBy(divisor).toNumber(),
                'decimals':decimals,
            })
        }).catch(err=>{
            return Promise.reject(err);
        });
    }

    balance(address){
        return  tokenContract.methods.balanceOf(address).call().then(balance=>{
            let decimals = config.wallet.token.decimal;
            let divisor = 10**decimals;
            divisor = new BigNumber(divisor);
            balance = new BigNumber(balance);
            return Promise.resolve(
                balance.dividedBy(divisor).toNumber()
            )
        }).catch(err=>{
            return Promise.reject(err);
        });
    }

    transferParam(fromAddress,toAddress,amount){
        let count = 0;
        const gasPrice = web3.eth.gasPrice;
        return web3.eth.getTransactionCount(fromAddress).then(_count=>{
            count = _count;
            let multiplier = 10**config.wallet.token.decimal;
            const txParams = {
                from: fromAddress,
                nonce: web3.utils.toHex(count),
                gasPrice: web3.utils.toHex(gasPrice),
                gasLimit: web3.utils.toHex(config.network.gasLimit),
                to: tokenContract._address,
                value: web3.utils.toHex(0),
                data: tokenContract.methods.transfer(toAddress, amount * multiplier).encodeABI(),
                chainId: config.network.chainId
            };
            return Promise.resolve(txParams);
        });
    }

}

module.exports = new TokenServices();
