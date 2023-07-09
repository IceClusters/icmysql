const mysql = require('mysql2');
const { performance } = require('perf_hooks');
const { ReadDatabaseCredentials } = require('./src/db.js');
const { MakeQuery } = require('./src/queries.js');
const { type } = require('os');

let databaseCredentials = {};
let databaseConnections = [];
let queryLogs = [];

let databasesReady = false;

ReadDatabaseCredentials()

RegisterServerEvent('ice_mysql:getQueryLogs');
AddEventHandler("ice_mysql:getQueryLogs", function () {
    TriggerClientEvent("ice_mysql:getDebugInfo", source, queryLogs);
});

global.exports('MakeQuery', (db, query, params, isDebuging) => {
    // To accept two or one parameter
    if (query == undefined) {
        query = db;
        db = 1
    } else if (typeof params == "boolean") {
        isDebuging = params;
        params = undefined;
    } else if (typeof query == "boolean") {
        isDebuging = query;
        query = undefined;
    }
    if (Object.keys(databaseCredentials).length == 0) {
        return console.error(`Can't make the following query: ${query}, because any databaseCredential has been gived in server.cfg`)
    }
    // Check if the db id gived is valid
    if (db > databaseConnections.length) {
        return console.error(`DB#${db} don't exist, the highest DB id is ${databaseConnections.length}, make sure that you aren't choosing a higher value, or make sure that DB#${db} is accessible from the server.`);;
    }
    const resourceName = GetInvokingResource();
    const startQuery = performance.now();
    return new Promise(async (resolve, reject) => {
        // Wait until databases are ready
        while (!databasesReady) {
            await new Promise(resolve => setTimeout(resolve, 1));
        }
        try {
            var data = await MakeQuery(db, query, params, isDebuging, resourceName);
            const endQuery = performance.now();
            // Warning message if the query has taken more than 500 ms
            if ((endQuery - startQuery) > 500) {
                console.log(`^3WARN: Query has taken ${(endQuery - startQuery).toFixed(2)} ms to execute, query: ^0${query}^3 in ^0DB#${db}^0`);
            }
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
});

global.exports('AsyncMakeQuery', (db, query, callback) => {
    // To accept two or three parameter
    if (typeof query == "function") {
        callback = query;
        query = db;
        db = 1;
    }
    if (typeof callback != "function" || typeof query != "string") {
        return console.error('Missing callback or query parameters')
    }
    if (Object.keys(databaseCredentials).length === 0) {
        console.error(`Can't make the following query: ${query}, because any databaseCredential has been given in server.cfg`);
        if (callback) {
            callback(null);
        }
        return;
    }
    // Check if the db id given is valid
    if (db > databaseConnections.length) {
        console.error(`DB#${db} doesn't exist. The highest DB id is ${databaseConnections.length}. Make sure that you aren't choosing a higher value, or make sure that DB#${db} is accessible from the server.`);
        if (callback) {
            callback(null);
        }
        return;
    }
    const startQuery = performance.now();

    return new Promise(async (resolve, reject) => {
        // Wait until databases are ready
        while (!databasesReady) {
            await new Promise(resolve => setTimeout(resolve, 1));
        }
        try {
            const data = await MakeQuery(db, query);
            const endQuery = performance.now();
            // Warning message if the query has taken more than 500 ms
            if ((endQuery - startQuery) > 500) {
                console.log(`^3WARN: Query has taken ${(endQuery - startQuery).toFixed(2)} ms to execute, query: ^0${query}^3 in ^0DB#${db}^0`);
            }
            if (callback) {
                callback(data);
            }
        } catch (err) {
            console.error(err);
            if (callback) {
                callback(null);
            }
        }
    });
});

// // Internal benchmark
// async function executeQueries() {
//     while (!databasesReady) {
//         await new Promise(resolve => setTimeout(resolve, 1));
//     }
//     console.log('Executing queries...');
//     const queryTimes = [];
//     let totalExecutionTime = 0;
//     for (let i = 0; i < 10000; i++) {
//         try {
//             const startTime = performance.now();
//             const data = await MakeQuery(1, "SELECT identifier FROM users WHERE `group`='admin'");
//             const endTime = performance.now();
//             const executionTime = endTime - startTime;
//             totalExecutionTime += executionTime;
//             queryTimes.push(executionTime);
//         } catch (error) {
//             console.error('Error executing query:', error);
//         }
//     }
//     const minTime = Math.min(...queryTimes);
//     const avgTime = totalExecutionTime / 10000;

//     console.log(`Low: ${minTime.toFixed(4)}ms | Avg: ${avgTime.toFixed(8)}ms | Total: ${totalExecutionTime}ms (10000 queries)`);
// }
// executeQueries();