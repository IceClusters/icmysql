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

async function AwaitTransaction(dbId, queries, params) {
    ScheduleResourceTick(global.resourceName)
    if(typeof dbId !== "number") {
        params = queries;
        queries = dbId;
        dbId = Config.DefaultDB;
    }
    const queriesList = [];
    if(Object.keys(queries[0])[0] == "query") {
        for(let i = 0; i < queries.length; i++) {
            queriesList.push({query: queries[i]["query"], values: queries[i]["values"]})
        }
    } else if(Object.keys(queries[0])[0] == "0" && params == null) {
        for(let i = 0; i < queries.length; i++) {
            queriesList.push({query: queries[i][0], values: queries[i][1]})
        }
    } else {
        for(let i = 0; i < queries.length; i++) {
            queriesList.push({query : queries[i]})
        }
    }
    return await ExecuteTransaction(dbId, queriesList, params, null /* CALLBACK */);
}


function Transaction(dbId, queries, params, callback) {
    ScheduleResourceTick(global.resourceName)
    if(typeof dbId !== "number") {
        callback = params;
        params = queries;
        queries = dbId;
        dbId = Config.DefaultDB;
    }
    if(typeof params === "function") { callback = params; params = null;}
    const queriesList = [];
    if(Object.keys(queries[0])[0] == "query") {
        for(let i = 0; i < queries.length; i++) {
            queriesList.push({query: queries[i]["query"], values: queries[i]["values"]})
        }
    } else if(Object.keys(queries[0])[0] == "0" && params == null) {
        for(let i = 0; i < queries.length; i++) {
            queriesList.push({query: queries[i][0], values: queries[i][1]})
        }
    } else {
        for(let i = 0; i < queries.length; i++) {
            queriesList.push({query : queries[i]})
        }
    }
    ExecuteTransaction(dbId, queriesList, params, callback);
}

global.exports("AwaitTransaction", AwaitTransaction);
global.exports("Transaction", Transaction);
