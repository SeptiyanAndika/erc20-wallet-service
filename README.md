# ECC20-WALLET-SERVICE
Application to create address, transfer token, check balance and listing event transfer token and give notification to webhook and telegram if any event erc20 transfer

## Config
Please check [config/index.js](config/index.js) in that config, can set 
- runnin app port
- api key
- blockchain network
- wallet phasspharese
- token info that will be listened 
- webhook and telegream notification if any event erc20 tarnsfer 

## API
Please check [doc/rest.http](doc/rest.http), the api avaailable is
- create address  (when creating address keystore will save in folder [keystore](keystore))
- check balance
- info token
- send token
