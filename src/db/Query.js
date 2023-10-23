const { ParseError } = require('../errors/Parser.js');
const crypto = require("crypto");
const LRU = require('lru-cache');
const { ReplaceNamedParams, ReplaceDotParams, ConvertNilParams } = require('./Params.js');
const { QueryTypes } = require('sequelize');
const { IsConnecting, GetConnection, ReleaseConnection } = require('./Connections.js');
const { performance } = require('perf_hooks');
const { AddDebugCache, DeleteCache, AddQuery } = require('./Debug.js');
const { Log, LogTypes } = require('../utils/Logger.js');

global.QueryTypes = Object.freeze({ "Query": "QUERY", "Select": "SELECT", "Insert": "INSERT", "Update": "UPDATE", "Delete": "DELETE", "Unique": "UNIQUE", "Scalar": "SCALAR", "Single": "SINGLE", "Raw": "RAW", "Execute": "EXECUTE"});

global.queryCache = new LRU({
    max: 50 * 1024 * 1024,
})

function transformToBoolean(fields, result) {
    const res = result;
    if (fields) {
        fields.forEach((field) => {
            if (field.columnType === 1 && field.columnLength === 1) {
            result.forEach((_, index) => {
                res[index][field.name] = (result[index][field.name] !== 0);
            });
            }
        });
    }
    return res;
}

function generateQueryHash(dbId, type, query, values) {
    const hash = crypto.createHash("sha1");
    const data = dbId + type + query + JSON.stringify(values);
    hash.update(data);
    return hash.digest("base64");
}

function ExtractTable(sqlQuery) {
    const selectIndex = sqlQuery.indexOf('SELECT');
    const updateIndex = sqlQuery.indexOf('UPDATE');
    const deleteIndex = sqlQuery.indexOf('DELETE');
    const insertIndex = sqlQuery.indexOf('INSERT');
    const setIndex = sqlQuery.indexOf('SET');
    const fromIndex = sqlQuery.indexOf('FROM');
    const whereIndex = sqlQuery.indexOf('WHERE');

    if (selectIndex !== -1 && (selectIndex < updateIndex || updateIndex === -1)
        && (selectIndex < deleteIndex || deleteIndex === -1)
        && (selectIndex < insertIndex || insertIndex === -1)) {
        if (fromIndex === -1) {
            return null;
        }

        let table = sqlQuery.substring(fromIndex + 5, whereIndex !== -1 ? whereIndex : sqlQuery.length).trim();
        const joinIndex = table.indexOf('JOIN');
        if (joinIndex !== -1) {
            table = table.substring(0, joinIndex).trim();
        }
        const aliasIndex = table.indexOf(' AS ');
        if (aliasIndex !== -1) {
            table = table.substring(0, aliasIndex).trim();
        }

        return table;
    } else if (updateIndex !== -1 && setIndex !== -1 && updateIndex < setIndex) {
        let table = sqlQuery.substring(updateIndex + 6, setIndex).trim();
        const aliasIndex = table.indexOf(' AS ');
        if (aliasIndex !== -1) {
            table = table.substring(0, aliasIndex).trim();
        }

        return table;
    } else if (deleteIndex !== -1 && fromIndex !== -1 && deleteIndex < fromIndex) {
        let table = sqlQuery.substring(fromIndex + 5, whereIndex !== -1 ? whereIndex : sqlQuery.length).trim();
        const aliasIndex = table.indexOf(' AS ');
        if (aliasIndex !== -1) {
            table = table.substring(0, aliasIndex).trim();
        }

        return table;
    } else if (insertIndex !== -1 && fromIndex !== -1 && insertIndex < fromIndex) {
        let table = sqlQuery.substring(fromIndex + 5).trim();
        const aliasIndex = table.indexOf(' AS ');
        if (aliasIndex !== -1) {
            table = table.substring(0, aliasIndex).trim();
        }

        return table;
    } else {
        return null;
    }
}

async function ParseArgs(dbId, query, values, callback, cache) {
    while (IsConnecting()) {
        await new Promise(resolve => requestAnimationFrame(resolve));
    }

    if (dbId === undefined) {
        return ParseError("Invalid params for query function.");
    }

    if (typeof dbId === "string") {
        cache = callback;
        callback = values;
        values = query;
        query = dbId;
        dbId = Config.DefaultDB;
    }

    if (typeof values === "function") {
        callback = values;
        values = [];
        if (typeof callback === "boolean")
            cache = callback;
        else
            cache = false;
    } else if (typeof values === "boolean") {
        cache = values;
        values = [];
    } else if (typeof values === "object") {
        if (typeof callback === "boolean")
            cache = callback;
        else
            cache = false;
    } else {
        values = [];
    }
    if (cache === undefined) cache = false;
    if (typeof dbId !== "number" || typeof query !== "string" || typeof values !== "object" || typeof cache !== "boolean") return ParseError("Invalid params for query function.");
    if (pools[dbId] == null) return ParseError(`The database ${dbId} is not registered.`);
    return { dbId: dbId, query: query, values: values, callback: callback, cache: cache };
}

async function ExecuteQuery(resourceName, type, dbId, query, values, callback, cache) {
    const start = performance.now();
    ScheduleResourceTick(GetCurrentResourceName())
    const table = ExtractTable(query);
    const hash = generateQueryHash(dbId, type, query, values);
    if (cache && (type == "SELECT" || type == "UNIQUE" || type == "SINGLE")) {
        if (global.queryCache.has(table) && global.queryCache.get(table).has(hash)) {
            const cachedResult = global.queryCache.get(table).get(hash);
            return callback ? callback(cachedResult) : cachedResult;
        }

        if (!global.queryCache.has(table)) {
            global.queryCache.set(table, new LRU(100));
        }
    }
    const connection = await GetConnection(dbId);
    try {
        if (values) {
            if(typeof(values) === "string")
                values = [values]
            // console.log("antes era: ", values)
            // values = ConvertNilParams(values)
        } else {
            values = null;
        }
        if (query.includes("@")) {
            query = ReplaceNamedParams(query, values)
            values = null;
        }
        // if (query.includes(":")) {
        //     query = ReplaceDotParams(query, values);
        //     values = null;
        // }
        var [rows, fields] = [null, null];
        if(type == "RAW") {
            [rows, fields] = await connection.query(query, values);
        } else {
            [rows, fields] = await connection.execute(query, values);
        }
        const end = performance.now();
        const time = (end - start).toFixed(3);
        if (time >= Config.SlowQueryWarn) {
            Log(LogTypes.Warning, `Slow query detected: ${query} - ${time}ms`)
        }
        if (Config.Enabled && resourceName != null) {
            AddQuery(resourceName, type.toString(), dbId, query, values, rows, time);
            if (cache)
                AddDebugCache(table, hash, rows)
        }
        if (cache && table && (type == "SELECT" || type == "UNIQUE" || type == "SINGLE")) {
            var data = null;
            if (type == "SELECT" && rows.length === 1) {
                if (Object.entries(rows[0]).length === 1) {
                    data = rows[0][Object.keys(rows[0])[0]];
                }
                else
                    data = rows[0];
            }
            if (type == "UNIQUE") {
                if (rows.length > 0 && fields.length > 0) {
                    data = rows[0][fields[0].name];
                }
                if (rows.length <= 0)
                    data = null
                else
                    data = rows[0][Object.keys(rows[0])[0]]
            }
            if (type == "SINGLE") {
                if (rows.length > 0 && fields.length > 0) {
                    data = rows[0];
                }
                data = null;
            }
            if (data != null)
                global.queryCache.get(table).set(hash, data);
        }
        if (type == "UNIQUE") {
            if (rows.length <= 0)
                return callback ? callback() : null;
            else
                return callback ? callback(rows[0][Object.keys(rows[0])[0]]) : rows[0][Object.keys(rows[0])[0]];
        }
        else if (type == "INSERT") {
            if (rows.length === 0) {
                return null;
            }
            return callback ? callback(rows["insertId"]) : rows["insertId"];
        }
        else if (type == "SELECT") {
            if (rows.length === 0) {
                return callback ? callback() : null;
            }
            if (rows.length === 1) {
                if (Object.entries(rows[0]).length === 1) {
                    return callback ? callback(rows[0][Object.keys(rows[0])[0]]) : rows[0][Object.keys(rows[0])[0]];
                }
                return callback ? callback(rows[0]) : rows[0];
            }
            return callback ? callback(rows) : rows;
        }
        else if (type == "SCALAR") {
            if (rows.length > 0 && fields.length > 0) {
                return callback ? callback(rows[0][fields[0].name]) : rows[0][fields[0].name];
            }
            return callback ? callback() : null;
        }
        else if (type == "SINGLE") {
            if (rows.length > 0 && fields.length > 0) {
                return callback ? callback(rows[0]) : rows[0];
            }
            return callback ? callback() : null;
        }
        else if (type == "UPDATE") {
            return callback ? callback(rows["affectedRows"]) : rows["affectedRows"];
        } else if(type == "EXECUTE") {
            return callback ? callback(transformToBoolean(fields, rows), fields) : transformToBoolean(fields, rows);
        }
        return callback ? callback(rows) : rows;
    } catch (err) {
        ParseError(`Error while executing query: ${err} , query: ${query}, values: ${values}`);
        return null;
    } finally {
        ReleaseConnection(dbId, connection)
        var query = query.toLowerCase();
        if (
            (query.toLowerCase().includes("update") || 
                query.toLowerCase().includes("delete") || 
                query.toLowerCase().includes("insert") || 
                query.toLowerCase().includes("replace")
            ) && table && global.queryCache.has(table)
        ){
            global.queryCache.del(table);
            DeleteCache(table, hash)
        }
    }
}

async function ExecuteTransaction(dbId, queries, callback) {
    const connection = await GetConnection(dbId);
    await connection.beginTransaction();
    var modifiedTables = [];
    try {
        const queryPromises = queries.map((queryObject) => {
            if (queryObject["query"].includes("@")) {
                queryObject["query"] = ReplaceNamedParams(queryObject["query"], queryObject["values"])
                queryObject["values"] = null;
            }
            modifiedTables.push(ExtractTable(queryObject["query"]));
            return connection.query(queryObject["query"], queryObject["values"] || []);
        });
        const results = await Promise.allSettled(queryPromises);
        const hasErrors = results.some((result) => {
            if (result.reason && result.reason.message) {
                ParseError(`Error while executing query: ${result.reason.message} `);
            }
            return result.status === "rejected"
        });
        if (hasErrors) {
            await connection.rollback();
            ParseError("Some queries failed while executing transaction.");
            return typeof callback === "function" ? callback(false) : false;
        }
        await connection.commit();
        connection.release();
        return typeof callback === "function" ? callback(true) : true;
    } catch (err) {
        await connection.rollback();
        connection.release();
        ParseError(`Error while executing transaction: ${err.message} `);
        return typeof callback === "function" ? callback(false) : false;
    } finally {
        await connection.rollback();
        connection.release();
        modifiedTables.forEach((table) => {
            if (global.queryCache.has(table)) {
                global.queryCache.del(table);
            }
        });
    }
}

async function AwaitQuery(dbId, query, values, cache) {
    const data = await ParseArgs(dbId, query, values, cache);
    if (data === undefined) return null;
    const invokingResource = GetInvokingResource();
    return await ExecuteQuery(invokingResource, global.QueryTypes.Query, data.dbId, data.query, data.values, null, data.cache);
}

async function Query(dbId, query, values, callback, cache) {
    const data = await ParseArgs(dbId, query, values, callback, cache);
    if (data === undefined) return null;
    // if (typeof data.callback !== "function") return ParseError("You must provide a callback function.")
    const invokingResource = GetInvokingResource();
    await ExecuteQuery(invokingResource, global.QueryTypes.Query, data.dbId, data.query, data.values, data.callback, data.cache);
}

async function AwaitScalar(dbId, query, values, cache) {
    const data = await ParseArgs(dbId, query, values, cache);
    if (data === undefined) return null;
    const invokingResource = GetInvokingResource();
    return await ExecuteQuery(invokingResource, global.QueryTypes.Scalar, data.dbId, data.query, data.values, null, data.cache);
}

async function Scalar(dbId, query, values, callback, cache) {
    const data = await ParseArgs(dbId, query, values, callback, cache);
    if (data === undefined) return null;
    // if (typeof data.callback !== "function") return ParseError("You must provide a callback function.")
    const invokingResource = GetInvokingResource();
    await ExecuteQuery(invokingResource, global.QueryTypes.Scalar, data.dbId, data.query, data.values, data.callback, data.cache);
}

async function AwaitSingle(dbId, query, values, cache) {
    const data = await ParseArgs(dbId, query, values, cache);
    if (data === undefined) return null;
    const invokingResource = GetInvokingResource();
    return await ExecuteQuery(invokingResource, global.QueryTypes.Single, data.dbId, data.query, data.values, null, data.cache);
}

async function Single(dbId, query, values, callback, cache) {
    const data = await ParseArgs(dbId, query, values, callback, cache);
    if (data === undefined) return null;
    // if (typeof data.callback !== "function") return ParseError("You must provide a callback function.")
    const invokingResource = GetInvokingResource();
    await ExecuteQuery(invokingResource, global.QueryTypes.Single, data.dbId, data.query, data.values, data.callback, data.cache);
}

async function AwaitRaw(dbId, query, values, cache) {
    const data = await ParseArgs(dbId, query, values, cache);
    if (data === undefined) return null;
    const invokingResource = GetInvokingResource();
    return await ExecuteQuery(invokingResource, global.QueryTypes.Raw, data.dbId, data.query, data.values, null, data.cache);
}

async function Raw(dbId, query, values, callback, cache) {
    const data = await ParseArgs(dbId, query, values, callback, cache);
    if (data === undefined) return null;
    // if (typeof data.callback !== "function") return ParseError("You must provide a callback function.")
    const invokingResource = GetInvokingResource();
    await ExecuteQuery(invokingResource, global.QueryTypes.Raw, data.dbId, data.query, data.values, data.callback, data.cache);
}

async function AwaitExecute(dbId, query, values, cache) {
    const data = await ParseArgs(dbId, query, values, cache);
    if (data === undefined) return null;
    const invokingResource = GetInvokingResource();
    return await ExecuteQuery(invokingResource, global.QueryTypes.Execute, data.dbId, data.query, data.values, null, data.cache);
}

async function Execute(dbId, query, values, callback, cache) {
    const data = await ParseArgs(dbId, query, values, callback, cache);
    if (data === undefined) return null;
    // if (typeof data.callback !== "function") return ParseError("You must provide a callback function.")
    const invokingResource = GetInvokingResource();
    await ExecuteQuery(invokingResource, global.QueryTypes.Execute, data.dbId, data.query, data.values, data.callback, data.cache);
}

global.exports("Query", Query);
global.exports("AwaitQuery", AwaitQuery);
global.exports("Scalar", Scalar);
global.exports("AwaitScalar", AwaitScalar);
global.exports("Single", Single);
global.exports("AwaitSingle", AwaitSingle);
global.exports("Raw", Raw);
global.exports("AwaitRaw", AwaitRaw);
global.exports("Execute", Execute);
global.exports("AwaitExecute", AwaitExecute);

module.exports = { ParseArgs, ExecuteQuery, ExecuteTransaction }
