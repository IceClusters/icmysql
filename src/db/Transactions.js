const { ParseError } = require('../errors/Parser.js');
const { ParseArgs, ExecuteQuery } = require('./Query.js');
const { ExecuteTransaction } = require('./Query.js')

async function AwaitTransaction(dbId, queries, parameters) {
    if (typeof dbId !== "number") {
        values = queries;
        queries = dbId;
        dbId = Config.DefaultDB;
    }
    const valuesArgs = values;
    var queriesList = [];
    if (values === undefined) {
        for (let i = 0; i < queries.length; i++) {
            queriesList.push({ query: queries[i][0] || queries[i]["query"], values: queries[i][1] || queries[i]["values"] })
        }
    } else {
        for (let i = 0; i < queries.length; i++) {
            queriesList.push({ query: queries[i], values: valuesArgs })
        }
    }
    if (queriesList.length < 1) return [];
    if (dbId === undefined || queries === undefined) return ParseError("You've provided invalid arguments to AwaitTransaction.");

    return await ExecuteTransaction(dbId, queriesList, null);
}

// setTimeout(() => {
//     AwaitTransaction(1, [
//         'INSERT INTO `test` (id, name) VALUES (@someid, @somename)',
//         'SET `name` = @newname IN `test` WHERE `id` = @someid'
//     ],
//         [
//             [someid = 2],
//             [somename = 'John Doe'],
//         ]);
// }, 1000);

async function Transaction(dbId, queries, callback) {
    const data = ParseTransactionArgs(dbId, queries, callback);
    if (data == undefined) return typeof data.callback === "function" ? data.callback(null) : null;
    return await ExecuteTransaction(data.dbId, data.queries, data.callback);
}

global.exports("AwaitTransaction", AwaitTransaction);
global.exports("Transaction", Transaction);
