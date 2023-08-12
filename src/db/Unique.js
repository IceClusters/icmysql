const { ParseError } = require('../errors/Parser.js');
const { ParseArgs, ExecuteQuery } = require('./Query.js');

async function AwaitUnique(dbId, query, values, cache) {
    const data = await ParseArgs(dbId, query, values, cache);
    if (data === undefined) return null;

    return await ExecuteQuery(global.QueryTypes.Unique, data.dbId, data.query, data.values, null, data.cache);
}

async function Unique(dbId, query, values, callback, cache) {
    const data = await ParseArgs(dbId, query, values, callback, cache);
    if (data === undefined) return null;
    // if (typeof data.callback !== "function") return ParseError("You must provide a callback function.")
    await ExecuteQuery(global.QueryTypes.Unique, data.dbId, data.query, data.values, data.callback, data.cache);
}

global.exports("AwaitUnique", AwaitUnique);
global.exports("Unique", Unique);