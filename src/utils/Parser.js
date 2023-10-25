const { IsConnecting } = require('../db/Connections.js');

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

function ParseResponse(type, rows) {
    switch (type) {
        case 'Prepare':
            return (rows.affectedRows != null) ? rows.affectedRows : (rows.length == 1) ? (Object.keys(rows[0]).length == 1 ? rows[0][Object.keys(rows[0])[0]] : rows[0]) : (rows.length == 0 ? null : rows);
        case 'Insert':
            return rows.affectedRows != null ? rows.insertId : null;
    
        case 'Update':
            return rows.affectedRows != null ? rows.affectedRows : null;
    
        case 'Single':
            return rows.length != null ? rows[0] : null;
    
        case 'Scalar':
            return (rows.length != null && rows[0] != null && Object.values(rows[0])[0] != null) ? Object.values(rows[0])[0] : null;
    
        default:
            return rows || null;
      }
}

module.exports = { ParseArgs, ParseResponse }