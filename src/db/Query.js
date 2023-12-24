const { ParseError } = require('../errors/Parser.js');
const { ReplaceNamedParams, ReplaceDotParams, ConvertNilParams } = require('./Params.js');
const { QueryTypes } = require('sequelize');
const { GetConnection, ReleaseConnection } = require('./Connections.js');
const { performance } = require('perf_hooks');
const { AddDebugCache, DeleteCache, AddQuery } = require('./debug/Debug.js');
const { Log, LogTypes } = require('../utils/Logger.js');
const { ParseArgs, ParseResponse, ParseNilArgs } = require('../utils/Parser.js');
const QueryInterceptor = require('./debug/Interceptor.js').Middleware;
const AddExport = require('./exports/main.js');

global.queryTypes = Object.freeze({
    "Query": "Query",
    "Prepare": "Prepare",
    "Insert": "Insert",
    "Update": "Update",
    "Delete": "Delete",
    "Scalar": "Scalar",
    "Single": "Single",
    "Raw": "Raw"
});

async function ExecuteQuery(resourceName, type, dbId, query, values, callback, cache) {
    let start = performance.now();
    let connection = await GetConnection(dbId);
    try {
        if(global.interceptor) {
            const resultMiddleware = await QueryInterceptor({ resourceName: resourceName, type: type, dbId: dbId, query: query, values: values, callback: callback, cache: cache });
            if(resultMiddleware == null) return callback ? callback(null) : null;
            resourceName = resultMiddleware.resourceName;
            type = resultMiddleware.type;
            dbId = resultMiddleware.dbId;
            query = resultMiddleware.query;
            values = resultMiddleware.values;
            callback = resultMiddleware.callback;
            cache = resultMiddleware.cache;
            start = performance.now();
            connection = await GetConnection(dbId);
        }
        
        if (values) {
            if(typeof(values) === "string")
                values = [values];
        } else {
            values = null;
        }
        values = ParseNilArgs(query, values)
        if (query.includes("@")) {
            query = ReplaceNamedParams(query, values)
            values = null;
        }
        var [rows] = [null, null];
        if(type == "Raw" || type == "Scalar" || type == "Single" || type == "Update" || type == "Insert" || type == "Query") {
            [rows] = await connection.query(query, values);
        } else {
            [rows] = await connection.execute(query, values);
        }
        const end = performance.now();
        const time = (end - start).toFixed(3);
        if (time >= Config.SlowQueryWarn) {
            Log(LogTypes.Warning, `Slow query detected: ${query} - ${time}ms`)
        }
        let result = ParseResponse(type, rows);
        try {
            return callback ? callback(result) : result;
        } catch(err) {
            return result;
        }
    } catch (err) {
        ParseError(`Error while executing query: ${err} , query: ${query}, values: ${values}`, null, true);
    } finally {
        ReleaseConnection(dbId, connection)
    }
}

async function ExecuteTransaction(dbId, queries, params, callback) {
    const connection = await GetConnection(dbId);
    await connection.beginTransaction();
    try {
        const queryPromises = queries.map((queryObject) => {
            if (queryObject["query"].includes("@")) {
                queryObject["query"] = ReplaceNamedParams(queryObject["query"], queryObject["values"] == null ? (params != null ? params : []) : queryObject["values"])
                queryObject["values"] = null;
            }
            return connection.query(queryObject["query"], queryObject["values"] == null ? (params != null ? params : []) : queryObject["values"]);
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
            if (typeof callback === "function") {
                callback(false);
            }
            return false;
        }
        await connection.commit();
        connection.release();
        if (typeof callback === "function") {
            callback(true);
        }
        return true;
    } catch (err) {
        await connection.rollback();
        connection.release();
        ParseError(`Error while executing transaction: ${err.message} `);
        if (typeof callback === "function") {
            callback(false);
        }
        return false;
    }
}

function AddMethod(type) {
    const method = async function(dbId, query, values, callback, cache) {
        ScheduleResourceTick(global.resourceName)
        const data = await ParseArgs(dbId, query, values, callback, cache);
        if (data == null) return null;
        const invokingResource = GetInvokingResource();
        return await ExecuteQuery(invokingResource, type, data.dbId, data.query, data.values, data.callback, data.cache);
    }
    AddExport(type, method);

    const awaitMethod = async function(dbId, query, values, cache) {
        ScheduleResourceTick(global.resourceName)
        const data = await ParseArgs(dbId, query, values, null, cache);
        if (data == null) return null;
        const invokingResource = GetInvokingResource();
        return await ExecuteQuery(invokingResource, type, data.dbId, data.query, data.values, null, data.cache);
    }
    AddExport(`Await${type}`, awaitMethod);
}

for(type in queryTypes) {
    AddMethod(queryTypes[type]);
}

module.exports = { ExecuteQuery, ExecuteTransaction }
