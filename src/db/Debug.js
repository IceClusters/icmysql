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
        description: GetResourceMetadata(resourceName, "description", 0),
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
            resources.push(query.resourceName);
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


RegisterNetEvent("ice_mysql:getresources");
AddEventHandler("ice_mysql:getresources", function () {
    if (!CheckPermission(source)) return;
    console.log(GetResources());
});

RegisterNetEvent("ice_mysql:getresources");
AddEventHandler("ice_mysql:getquerycache", function () {
    if (!CheckPermission(source)) return;
    console.log(GetQueryCache());
});

RegisterNetEvent("ice_mysql:geterrors");
AddEventHandler("ice_mysql:geterrors", function () {
    if (!CheckPermission(source)) return;
    console.log(GetErrors());
});

RegisterNetEvent("ice_mysql:getbackup");
AddEventHandler("ice_mysql:getbackup", async function () {
    if (!CheckPermission(source)) return;
    if (await DirExist(Config.BackupDirPath))
        console.log(await ReadDir(Config.BackupDirPath));
});

if (Config.Enabled) {
    RegisterCommand("debug_ui", (source) => {
        if (!CheckPermission(source)) return;
        TriggerClientEvent("ice_mysql:openDebugUI", source);
    });
}


module.exports = { AddQuery, AddDebugCache, DeleteCache, AddDB, SetDBORM }