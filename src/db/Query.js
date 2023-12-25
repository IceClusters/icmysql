const { ParseError } = require('../errors/Parser.js');
const { ReplaceNamedParams } = require('./Params.js');
const { GetConnection, ReleaseConnection } = require('./Connections.js');
const { performance } = require('perf_hooks');
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
    const start = performance.now();
    let connection = null;
    try {
        if (global.interceptor) {
            const resultMiddleware = await QueryInterceptor({ resourceName, type, dbId, query, values, callback, cache });
            if (resultMiddleware === null) return callback ? callback(null) : null;
            ({ resourceName, type, dbId, query, values, callback, cache } = resultMiddleware);
        }

        connection = await GetConnection(dbId);

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
        const [rows] = (type == "Raw" || type == "Scalar" || type == "Single" || type == "Update" || type == "Insert" || type == "Query") 
            ? await connection.query(query, values) : await connection.execute(query, values);
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
        // const invokingResource = GetInvokingResource();
        return await ExecuteQuery(invokingResource, type, data.dbId, data.query, data.values, data.callback, data.cache);
    }
    const awaitMethod = async function(dbId, query, values, cache) {
        ScheduleResourceTick(global.resourceName)
        const data = await ParseArgs(dbId, query, values, null, cache);
        if (data == null) return null;
        // const invokingResource = GetInvokingResource();
        return await ExecuteQuery(invokingResource, data.dbId, data.query, data.values, data.cache);
    }
    AddExport(type, method);
    AddExport(`Await${type}`, awaitMethod);
}

for(type in queryTypes) {
    AddMethod(queryTypes[type]);
}

module.exports = { ExecuteQuery, ExecuteTransaction }
