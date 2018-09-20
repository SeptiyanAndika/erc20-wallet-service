const tokenService = require('../service/token');
class TokenController {

   async info(ctx, next){
       try {
           const info = await  tokenService.info();
           ctx.body = {
               success:true,
               message_code:'success_get_info',
               data:info
           }
       }catch (err) {
           ctx.status = 400;
           ctx.body = {
               success:false,
               message_code:'error_get_info',
               error: err
           }
       }
    }

}
module.exports = new TokenController()