const { ParseError } = require('../errors/Parser.js');
const { performance } = require('perf_hooks');
const { createPool } = require('mysql2/promise.js')
const { DirExist } = require('../utils/Files.js')
const { RegisterORMConnection, GenerateModels } = require('./orm/index.js')
const { Log, LogTypes } = require('../utils/Logger.js')
const { PrepareBackup } = require('../db/backup/index.js')
const { AddDB, SetDBORM } = require('./debug/Debug.js')
const { GetKey } = require('../language/localisation.js')
const { SendDiscordLog } = require('../utils/Discord.js')

var connecting = true;
global.pools = {};
global.poolsORM = Config.ORM ? {} : null;
global.mongoConnetions = {};

async function CheckConnection(credentials) {
    try {
        credentials.multipleStatements = true;
        credentials.namedPlaceholders = true;
        const pool = createPool(credentials);
        const connection = await pool.getConnection();
        connection.release();
        return true;
    } catch (e) {
        return e.message;
    }
}

async function RegisterConnection(index, credentials) {
    ScheduleResourceTick(global.resourceName)
    const start = performance.now();
    const checkConnection = await CheckConnection(credentials);
    if (checkConnection !== true) {
        ParseError(`^3Can't connect to database ${index}, ${checkConnection}.^0`);
        return;
    }
    credentials.multipleStatements = true;
    credentials.namedPlaceholders = true;
    credentials.connectTimeout = Config.ConnectionTimeout;
    credentials.trace = false;
    credentials.supportBigNumbers = true;
    credentials.typeCast = require('../utils/TypeCast.js');
    credentials.flags = ["CONNECT_WITH_DB"];

    const pool = createPool(credentials);
    pool.on('connection', function (connection) {
        connection.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    });
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

async function GetConnection(index) {
    const connection = await global.pools[index].getConnection();
    return connection;
}

function ReleaseConnection(index, connection) {
    connection.release();
}

function DisconnectDB(index) {
    if (!global.pools[index]) return;
    
    global.pools[index].end();
    delete global.pools[index];
    Log(LogTypes.Warning, `Database ${index} was disconnected.^0`);
    if(Config.SendDatabaseDisconnect)
        SendDiscordLog({
            "content": null,
            "embeds": [
                {
                    "title": GetKey("DBDisconnectTitle"),
                    "description": GetKey("DBDisconnectDescription"),
                    "color": 16755968
                }
            ],
            "attachments": []
        });
}

global.exports("IsReady", function(){
    return !connecting;
})

RegisterCommand("disconnectdb", async function(source, args, rawCommand){
    if(Number(source) != 0) return;

    if (!Config.MySQL) return Log(LogTypes.Warning, "^3" + GetKey("TryMySQLWithoutEnabled")+"^0");
    if (!Config.AllowDBDisconnection) return Log(LogTypes.Warning, "^3" + GetKey("TryDisconnectWithoutEnabled")+"^0");
    const dbId = args[0].length > 0 ? args[0] == "*" ? "*" : Number(args[0]) : Config.DefaultDB;
    if(!pools[dbId] && dbId != "*") return ParseError(`^1Can't find DB with ID: ${dbId} ^0`, null);
    
    if(dbId == "*") {
        const keys = Object.keys(pools[i])[0]
        for(let i = 0; i < keys; i++) {
            DisconnectDB(keys[i]);
        }
        return;
    }
    DisconnectDB(dbId);
	
}, false)

module.exports = { GetORMPools, RegisterConnection, IsConnecting, GetConnection, ReleaseConnection }
