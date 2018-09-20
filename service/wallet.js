const Wallet = require('ethereumjs-wallet');
const config = require('../config');
const fileRepo = require('../repository/file');
const EthereumTx = require('ethereumjs-tx')
const passphrase = config.wallet.passphrase;
class WalletServices {

    createAddress(){
        let wallet = Wallet.generate();
        let json = wallet.toV3(passphrase);
        let address = wallet.getAddressString();
        return fileRepo.saveKeystore(address,json).then(res=>{
            return Promise.resolve(address);
        })
    }

    getWalletByAddress(address){
        return fileRepo.raedKeystore(address).then(keystore=>{
            if(keystore==null){
                return Promise.reject({error:'address not found'})
            }else {
                return Wallet.fromV3(keystore,passphrase)
            }
        })
    }

    signTransaction(address,txParams){
        return this.getWalletByAddress(address).then(wallet=>{
            const tx = new EthereumTx(txParams)
            tx.sign(wallet.getPrivateKey())
            return Promise.resolve(tx.serialize());
        })

    }

}
module.exports = new WalletServices()