const  config   = require('./config/index');
const  Koa      = require('koa');
const  json     = require('koa-json')
const  Router   = require('koa-router');
const  bodyParser = require('koa-bodyparser');

const  router   = new Router();
const  app  = new Koa();
const  walletController = require('./controller/wallet')
const  tokenController = require('./controller/token')
const  transactionController = require('./controller/transaction')
app.use(bodyParser())
app.use(json())
app.use(function(ctx, next){
    if(ctx.request.header["x-api-key"]==config.xApiKey){
        return next();
    }else {
        ctx.status = 401;
        ctx.body = {
            success:false,
            messsage:"please check your x-api-key"
        }
        return
    }
});
app.use(router.routes());

router.get('/', (ctx, next) => {
    ctx.body = "Wallet erc20"
});

router.post('/address', walletController.createAddress);
router.get('/balance/:address', walletController.balance);
router.get('/token/info', tokenController.info);
router.post('/send', transactionController.send);

require('./service/event'); // run service for watch event

const server = app.listen(config.port);
console.log(`Run in port : ${server.address().port}`)