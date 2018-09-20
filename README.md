# ECC20-WALLET-SERVICE
Application to create addreess, transfer token, check balance and listining event trasnfer token and give notication too webhook and telegram if any event erc20 tarnsfer

## Config
Please check [config/index.js](erc20-wallet-service/blob/master/config/index.js) in that config, can set 
- runnin app port
- api key
- blockchain network
- wallet phasspharese
- token info that will be listened 
- webhook and telegream notification if any event erc20 tarnsfer 

## API
Please check doc/rest.http, the api avaailable is
- create address  (when creating address keystore will save in folder keystore)
- check balance
- info token
- send token
