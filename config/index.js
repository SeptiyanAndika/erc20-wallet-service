module.exports = {
    port:3000,
    xApiKey:"12345678",
    network:{
        httpProvider: "https://rinkeby.infura.io",
        wssProvider: "wss://rinkeby.infura.io/ws",
        chainId: 42,
        gasLimit:4000000
    },
    database:{
        host: "localhost",
        port: 27017,
        name: "erc20"
    },
    wallet:{
        passphrase: "secretpassphrase1a5df8380e0e30", // scret use when create new address
        token: {
            symbol: "TestToken",
            address: "xxxxxxxxxx",
            decimal:9,
        },
        notification:{
            telegram:{
                groupId:'xxxxx',
                token:'xxxxxx'
            },
            webHooks:[]
        }
    },
}