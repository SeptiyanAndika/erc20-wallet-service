const walletService = require('../service/wallet');
const tokenService = require('../service/token');
class WalletController {

   async createAddress(ctx, next){
       try {
           const address = await  walletService.createAddress();
           ctx.body = {
               success:true,
               message_code:'success_create_address',
               address:address
           }
       }catch (err) {
           ctx.status = 400;
           ctx.body = {
               success:false,
               message_code:'error_create_address',
               error: err
           }
       }
    }

    async balance(ctx, next){
        try {
            const address = ctx.params.address
            const balance = await tokenService.balance(address);
            ctx.body = {
                success:true,
                message_code:'success_get_balance',
                balance:balance,
            }
        }catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                success:false,
                message_code:'error_get_balance',
                error: err
            }
        }
    }
}
module.exports = new WalletController()