const { ParseError } = require('../errors/Parser.js');
const { ParseArgs, ExecuteQuery } = require('./Query.js');

async function AwaitDelete(dbId, query, values) {
    const data = await ParseArgs(dbId, query, values, true);
    if (data == undefined) return null;
    const invokingResource = GetInvokingResource();
    return await ExecuteQuery(invokingResource, QueryTypes.Delete, data.dbId, data.query, data.values, null, data.cache);
}

async function Delete(dbId, query, values, callback) {
    const data = await ParseArgs(dbId, query, values, callback, true);
    if (data == undefined) return null;
    // if (typeof data.callback !== "function") return ParseError("You must provide a callback function.")
    const invokingResource = GetInvokingResource();
    await ExecuteQuery(invokingResource, QueryTypes.Delete, data.dbId, data.query, data.values, data.callback, data.cache);
}

global.exports("AwaitDelete", AwaitDelete);
global.exports("Delete", Delete);