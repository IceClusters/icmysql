const oxmysql = require('./scripts/oxmysql.json');
const { ParseArgs, ParseResponse } = require('../../utils/Parser.js');

module.exports = function(name, func){
    for(let i = 0; i < Object.keys(oxmysql.functions).length; i++){
        const oxFunc = Object.keys(oxmysql.functions)[i];
        const icFunc = Object.values(oxmysql.functions)[i];
        if(icFunc == name) {
            AddEventHandler(`__cfx_export_oxmysql_${oxFunc}`, async function(cb){
                return cb(await func);
            });
            break;
        }
    }
    global.exports(name, func);
}