const { ParseError } = require('../errors/Parser.js');
const { ParseArgs, ExecuteQuery } = require('./Query.js');

async function AwaitInsert(dbId, query, values) {
    const data = await ParseArgs(dbId, query, values, true);
    if (data == undefined) return null;

    return await ExecuteQuery(QueryTypes.Insert, data.dbId, data.query, data.values, null, false);
}

async function Insert(dbId, query, values, callback) {
    const data = await ParseArgs(dbId, query, values, callback, true);
    if (data == undefined) return null;
    // if (typeof data.callback !== "function") return ParseError("You must provide a callback function.")
    await ExecuteQuery(QueryTypes.Insert, data.dbId, data.query, data.values, data.callback, false);
}

global.exports("AwaitInsert", AwaitInsert);
global.exports("Insert", Insert);