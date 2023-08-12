const { ParseError } = require('../errors/Parser.js');
const { ParseArgs, ExecuteQuery } = require('./Query.js');

async function AwaitUpdate(dbId, query, values) {
    const data = await ParseArgs(dbId, query, values, true);
    if (data == undefined) return null;

    return await ExecuteQuery(QueryTypes.Update, data.dbId, data.query, data.values, null, data.cache);
}

async function Update(dbId, query, values, callback) {
    const data = await ParseArgs(dbId, query, values, callback, true);
    if (data == undefined) return null;
    // if (typeof data.callback !== "function") return ParseError("You must provide a callback function.")
    await ExecuteQuery(QueryTypes.Update, data.dbId, data.query, data.values, data.callback, data.cache);
}

global.exports("AwaitUpdate", AwaitUpdate);
global.exports("Update", Update);