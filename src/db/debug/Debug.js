const { DirExist } = require('../../utils/Files.js')
const { GetLogs } = require('../../utils/Logger.js');
const { GetBackupHistory } = require('../backup/index.js');
var queries = [];
var cache = [];
var dbs = [];

function AddDB(db, type, time) {
    dbs.push({
        id: db,
        orm: false,
        type: type,
        time: time
    });
}

function SetDBORM(db, orm) {
    dbs.forEach((item, index) => {
        if (item.id == db) {
            return dbs[index].orm = orm;
        }
    });
}

function AddQuery(resourceName, type, db, query, values, result, time) {
    queries.push({
        resourceName: resourceName,
        type: type,
        db: db,
        query: query,
        values: values,
        result: result,
        time: time,
        currentTimestamp: Date.now()
    });
}

function AddDebugCache(table, hash, values) {
    cache.push({
        table: table,
        hash: hash,
        values: values
    })
}

function DeleteCache(table, hash) {
    cache.forEach((item, index) => {
        if (item.table == table && item.hash == hash) {
            return cache.splice(index, 1);
        }
    });
}

function GetResources() {
    var resources = [];
    var resourceNames = [];
    queries.forEach(query => {
        if (!resourceNames.includes(query.resourceName)) {
            resourceNames.push(query.resourceName);
            resources.push({ name: query.resourceName, description: GetResourceMetadata(query.resourceName, "description", 0) });
        }
    });
    return resources;
}

function GetQueries() {
    return queries;
}

function GetQueryCache() {
    return JSON.stringify(cache, null, 2)
}

function CheckPermission(src) {
    if (!Config.Enabled) return false;
    if (Config.DebugLicenses.length === 0) return false;
    const license = GetPlayerIdentifier(src, 0);
    for (const element of Config.DebugLicenses) {
        if (element == license) {
            return true;
        }
    }
    return false;
}

RegisterNetEvent("icmysql:server:getdbs");
AddEventHandler("icmysql:server:getdbs", function () {
    if (!CheckPermission(source)) return;
    TriggerClientEvent("icmysql:client:getdbs", source, JSON.stringify(dbs))
});

RegisterNetEvent("icmysql:server:getresources");
AddEventHandler("icmysql:server:getresources", function () {
    if (!CheckPermission(source)) return;
    TriggerClientEvent("icmysql:client:getResources", source, GetResources())
});

RegisterNetEvent("icmysql:server:getquerycache");
AddEventHandler("icmysql:server:getquerycache", function () {
    if (!CheckPermission(source)) return;
    TriggerClientEvent("icmysql:client:getquerycache", source, GetQueryCache())
});

RegisterNetEvent("icmysql:server:getlogs");
AddEventHandler("icmysql:server:getlogs", async function () {
    if (!CheckPermission(source)) return;
    TriggerClientEvent("icmysql:client:getlogs", source, await GetLogs())
});

RegisterNetEvent("icmysql:server:getQueries");
AddEventHandler("icmysql:server:getQueries", function () {
    if (!CheckPermission(source)) return;
    TriggerClientEvent("icmysql:client:getQueries", source, GetQueries())
});

RegisterNetEvent("icmysql:server:getbackup");
AddEventHandler("icmysql:server:getbackup", async function () {
    const src = source;
    if (!CheckPermission(source)) return;
    if (await DirExist(Config.BackupDirPath))
        TriggerClientEvent("icmysql:client:getbackup", src, await GetBackupHistory())
});

if (Config.Enabled) {
    RegisterCommand("debug_ui", (source) => {
        if (!CheckPermission(source)) return;
        TriggerClientEvent("icmysql:client:openDebugUI", source);
    });
}


module.exports = { CheckPermission, AddQuery, AddDebugCache, DeleteCache, AddDB, SetDBORM }