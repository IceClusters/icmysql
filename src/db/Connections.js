const { ParseError } = require('../errors/Parser.js');
const { performance } = require('perf_hooks');
const mysql = require('mysql2/promise.js')
const { DirExist } = require('../utils/Files.js')
const { RegisterORMConnection, GenerateModels } = require('./orm/index.js')
const { Log, LogTypes } = require('../utils/Logger.js')
const { PrepareBackup } = require('../db/backup/index.js')
const { AddDB, SetDBORM } = require('./debug/Debug.js')

var connecting = true;
global.pools = {};
global.poolsORM = Config.ORM ? {} : null;
global.mongoConnetions = {};

async function CheckConnection(credentials) {
    try {
        credentials.multipleStatements = true;
        credentials.namedPlaceholders = true;
        const pool = mysql.createPool(credentials);
        const connection = await pool.getConnection();
        connection.release();
        return true;
    } catch (e) {
        return e.message;
    }
}

async function RegisterConnection(index, credentials) {
    ScheduleResourceTick(GetCurrentResourceName())
    const start = performance.now();
    const checkConnection = await CheckConnection(credentials);
    if (checkConnection !== true) {
        ParseError(`^3Can't connect to database ${index}, ${checkConnection}.^0`);
        return;
    }
    credentials.multipleStatements = true;
    credentials.namedPlaceholders = true;
    const pool = mysql.createPool(credentials, { connectionLimit: Config.ConnectionLimit, queueLimit: Config.QueueLimit });
    const end = performance.now();
    global.pools[index] = pool;
    AddDB(index, "mysql", (end - start).toFixed(4));
    Log(LogTypes.Info, `^2Database ${index} connected successfully in ${(end - start).toFixed(4)}ms`);
    PrepareBackup(index, credentials);
    connecting = false;
}

function ReleasePool(index, resource) {
    if (!global.pools[index]) return;
    global.pools[index].end();
    delete global.pools[index];
    Log(LogTypes.Warn, `^5Database ${index} was realised by ${resource}.`);
}

function GetPools() {
    return global.pools;
}

function GetORMPools() {
    return JSON.stringify(global.poolsORM);
}

function IsConnecting() {
    return connecting;
}

var connectionCache = {};

async function GetConnection(index) {
    if (!connectionCache[index] || connectionCache[index].length === 0) {
        connectionCache[index] = [];
        const connection = await global.pools[index].getConnection();
        connectionCache[index].push(connection);
        return connection;
    }
    return connectionCache[index][0];
}

function ReleaseConnection(index, connection) {
    if (!connectionCache[index]) return;

    if (connectionCache[index].length >= Config.MaxConnectionLimit) {
        connection.release();
        return;
    }

    connectionCache[index].push(connection);
}

global.exports("IsReady", function(){
    return !connecting;
})

module.exports = { GetORMPools, RegisterConnection, IsConnecting, GetConnection, ReleaseConnection }
