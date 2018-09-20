const fs = require('fs');
const util = require('util');
const fs_writeFile = util.promisify(fs.writeFile);
const fs_readFile = util.promisify(fs.readFile);
class FileRepository {

    saveKeystore(address,json){
       return fs_writeFile(`./keystore/${address}.json`,JSON.stringify(json));
    }

    raedKeystore(address){
        return fs_readFile(`./keystore/${address}.json`, "utf8").then(res=>{
            return Promise.resolve(res);
        }).catch(err=>{
            return Promise.resolve(null);
        });
    }

}
module.exports = new FileRepository();