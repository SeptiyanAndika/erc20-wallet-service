const tokenService = require('../service/token');
const walletService = require('../service/wallet');
const transactionService = require('../service/transaction');
class  TransactionController {

   async send(ctx, next){
       try {
           let body = ctx.request.body;
           let fromAddress = body.fromAddress;
           let toAddress = body.toAddress;
           let amount = body.amount
           let balance = await tokenService.balance(fromAddress);

           if(balance<amount){
               ctx.status = 400;
               ctx.body = {
                   success:false,
                   message_code:'not_enough_balance',
                   error:{
                       balance:balance,
                   }
               }
               return;
           }

           let txParam = await  tokenService.transferParam(fromAddress,toAddress,amount)
           let serializedTx = await walletService.signTransaction(fromAddress,txParam);
           let txDetail = await transactionService.sendSigned(serializedTx);
           ctx.body = {
               success:true,
               message_code:'success_send_token',
               data:txDetail,
           }


       }catch (err) {
           console.log(err);
           ctx.status = 400;
           ctx.body = {
               success:false,
               message_code:'error_send_token',
               error: err
           }
       }
    }

}
module.exports = new  TransactionController()
