const { ParseError } = require('../errors/Parser.js');
const { ParseArgs, ExecuteQuery } = require('./Query.js');
const { ExecuteTransaction } = require('./Query.js');

function ParseValues(values) {
    for(let i = 0; i < values.length; i++) {
        if(typeof values[i] === "object") {
            values[i] = JSON.stringify(values[i]);
        }
    }
    return values;
}

async function AwaitTransaction(dbId, queries) {
    if(typeof dbId !== "number") {
        queries = dbId;
        dbId = Config.DefaultDB;
    }
    const queriesList = [];
    queriesList = parseTransaction(queries); 
    console.log(queriesList)
    if (queriesList.length < 1) return [];
    if (dbId === undefined || queries === undefined) return ParseError("You've provided invalid arguments to AwaitTransaction.");

    // return await ExecuteTransaction(dbId, queriesList, null);
}

async function Transaction(dbId, queries, callback) {
    if(typeof dbId !== "number") {
        callback = queries;
        queries = dbId;
        dbId = Config.DefaultDB;
    }
    const queriesList = [];
    for(let i = 0; i < queries.length; i++) {
        queriesList.push({query: queries[i][0] || queries[i]["query"], values: ParseValues(queries[i][1] || queries[i]["values"])})
    }
    if (queriesList.length < 1) return [];
    if (dbId === undefined || queries === undefined) return ParseError("You've provided invalid arguments to AwaitTransaction.");

    return await ExecuteTransaction(dbId, queriesList, callback);
}

global.exports("AwaitTransaction", AwaitTransaction);
global.exports("Transaction", Transaction);
