const { GetErrors } = require('../errors/Parser.js');
const { ReadDir, DirExist } = require('../utils/Files.js')
var queries = [];
var cache = [];
var dbs = [];

function AddDB(db) {
    dbs.push({
        id: db,
        orm: false
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
    queries.forEach(query => {
        if (!resources.includes(query.resourceName)) {
            resources.push({ name: query.resourceName, description: GetResourceMetadata(query.resourceName, "description", 0) });
        }
    });
    return resources;
}

function GetQueries(resourceName) {
    var queries = [];
    queries.forEach(query => {
        if (query.resourceName == resourceName) {
            queries.push(query);
        }
    });
    return queries;
}

function GetQueryCache() {
    return JSON.stringify(cache, null, 2)
}

function CheckPermission(src) {
    if (!Config.Enabled) return false;
    if (Config.DebugLicenses.length === 0) return false;
    const license = GetPlayerIdentifierByType(src, "license");
    for (const element of Config.DebugLicenses) {
        if (element == license) {
            return true;
        }
    }
    return false;
}

RegisterCommand("resourcesDani", function () {
    console.log(JSON.stringify(GetResources(), null, 2))
});

RegisterNetEvent("ice_mysql:server:getresources");
AddEventHandler("ice_mysql:server:getresources", function () {
    if (!CheckPermission(source)) return;
    TriggerClientEvent("ice_mysql:client:getbackup", source, GetResources())
});

RegisterNetEvent("ice_mysql:server:getquerycache");
AddEventHandler("ice_mysql:server:getquerycache", function () {
    if (!CheckPermission(source)) return;
    TriggerClientEvent("ice_mysql:client:getbackup", source, GetQueryCache())
});

RegisterNetEvent("ice_mysql:server:geterrors");
AddEventHandler("ice_mysql:server:geterrors", function () {
    if (!CheckPermission(source)) return;
    TriggerClientEvent("ice_mysql:client:getbackup", source, GetErrors())
});

RegisterNetEvent("ice_mysql:server:getbackup");
AddEventHandler("ice_mysql:server:getbackup", async function (source) {
    const src = source
    if (!CheckPermission(src)) return;
    if (await DirExist(Config.BackupDirPath))
        TriggerClientEvent("ice_mysql:client:getbackup", src, await ReadDir(Config.BackupDirPath))
});

if (Config.Enabled) {
    RegisterCommand("debug_ui", (source) => {
        if (!CheckPermission(source)) return;
        TriggerClientEvent("ice_mysql:client:openDebugUI", source);
    });
}


module.exports = { AddQuery, AddDebugCache, DeleteCache, AddDB, SetDBORM }