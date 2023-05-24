const mysql = require('mysql');
const { performance } = require('perf_hooks');
const { ReadDatabaseCredentials } = require('./src/db.js');
const { MakeQuery } = require('./src/queries.js');

let databaseCredentials = {};
let databaseConnections = [];

let databasesReady = false;

ReadDatabaseCredentials()

global.exports('MakeQuery', (db, query) => {
    // To accept two or one parameter
    if(query == undefined){
        query = db;
        db = 1
    }
    if(Object.keys(databaseCredentials).length == 0){
        return console.error(`Can't make the following query: ${query}, because any databaseCredential has been gived in server.cfg`)
    }
    // Check if the db id gived is valid
    if(db > databaseConnections.length){
        return console.error(`DB#${db} don't exist, the highest DB id is ${databaseConnections.length}, make sure that you aren't choosing a higher value, or make sure that DB#${db} is accessible from the server.`);;
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
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
});