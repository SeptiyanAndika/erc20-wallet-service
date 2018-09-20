const config = require('../config');
const TelegramBot = require('node-telegram-bot-api');
const token = config.wallet.notification.telegram.token || null;
const groupId=config.wallet.notification.telegram.groupId  || null
const bot = new TelegramBot(token, {polling: false});

class NotificationServices {

    sendNotificationTranfer(param){
        if(token != null && groupId !=null){
            this.sendTelegramTranfer(param);
        }

        if(config.wallet.notification.webHooks.length>0){
            this.sendWebhookTransfer(param).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err);
            })
        }
    };

    sendTelegramTranfer(param){
        let message = `<b>Transfer Token ${config.wallet.token.symbol}</b>\n`;
        message += `From : ${param.fromAddress}\n`
        message += `To : ${param.toAddress}\n`
        message += `Amount : ${param.amount}\n`
        bot.sendMessage(groupId, message,{parse_mode:'HTML'});
    }

    sendWebhookTransfer(param){
        let webHooksUrl = config.wallet.notification.webHooks;
        let workers=[];
        webHooksUrl.forEach(item=>{
            workers.push(axios.post(item, param))
        });

        return Promise.all(workers);
    }


}


module.exports = new NotificationServices();