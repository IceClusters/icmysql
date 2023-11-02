const { MongoClient } = require('mongodb');
const { ParseError } = require('../../errors/Parser.js');
const { Log, LogTypes } = require('../../utils/Logger.js');
const { PrepareObject } = require('./utils.js');

async function MongoMiddleware(dbId, params) {
    ScheduleResourceTick(global.resourceName);
    if (dbId == null) return ParseError('^1Invalid params to make mongoquery^0');
    if (typeof dbId === "object") {
        params = dbId;
        dbId = Config.DefaultMongoDB;
    }
    while (global.connectingMongo) {
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    if (typeof dbId !== "number" || typeof params !== 'object') return ParseError('^1Invalid params to make mongoquery^0');
    if (global.MongoConnections[dbId] == null) return ParseError('^1MongoDB with id ' + dbId + ' not found^0');
    const db = global.MongoConnections[dbId];
    const collection = db.collection(params.collection);
    if (collection == null) return ParseError('^1Collection ' + params.collection + ' not found^0');
    return { collection: collection, params: params };
}

async function MongoInsertOne(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const data = await MongoMiddleware(dbId, params);
        if (typeof data !== "object") return null;

        const document = PrepareObject(data.params.document);
        const options = PrepareObject(data.params.options);
        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.insertOne(document, options);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB find error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoInsertMany(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const data = await MongoMiddleware(dbId, params);
        if (typeof data !== "object") return null;

        const documents = PrepareObject(data.params.documents);
        const options = PrepareObject(data.params.options);
        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.insertMany(documents, options);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB find error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoFindOne(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const data = await MongoMiddleware(dbId, params);
        if (typeof data !== "object") return null;

        const query = PrepareObject(data.params.query);
        const options = PrepareObject(data.params.options);

        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.findOne(query, options);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB find error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoFindMany(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const data = await MongoMiddleware(dbId, params);
        if (typeof data !== "object") return null;

        const query = PrepareObject(data.params.query);
        const options = PrepareObject(data.params.options);

        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.find(query, options).toArray();
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB find error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoUpdateOne(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const data = await MongoMiddleware(dbId, params);
        if (typeof data !== "object") return null;

        const query = PrepareObject(data.params.query);
        const update = PrepareObject(data.params.update);
        const options = PrepareObject(data.params.options);

        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.updateOne(query, update, options);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB find error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoUpdateMany(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const data = await MongoMiddleware(dbId, params);
        if (typeof data !== "object") return null;

        const query = PrepareObject(data.params.query);
        const update = PrepareObject(data.params.update);
        const options = PrepareObject(data.params.options);

        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.updateMany(query, update, options);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB find error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoCount(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const data = await MongoMiddleware(dbId, params);
        if (typeof data !== "object") return null;

        const query = PrepareObject(data.params.query);
        const options = PrepareObject(data.params.options);

        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.countDocuments(query, options);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB find error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoDeleteOne(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const data = await MongoMiddleware(dbId, params);
        if (typeof data !== "object") return null;

        const query = PrepareObject(data.params.query);
        const options = PrepareObject(data.params.options);

        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.deleteOne(query, options);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB find error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoDeleteMany(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const data = await MongoMiddleware(dbId, params);
        if (typeof data !== "object") return null;

        const query = PrepareObject(data.params.query);
        const options = PrepareObject(data.params.options);

        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.deleteMany(query, options);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB find error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoCreateIndex(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        if (typeof params !== "object") return null;
        if (typeof params.collection !== "string") return null;
        if (typeof params.index !== "object") return null;
        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.createIndex(params.index);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB create index error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoStartTransactionSession(dbId, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const session = global.MongoConnections[dbId].startSession();
        const result = await session.withTransaction(callback);
        return result;
    } catch (error) {
        ParseError("MongoDB transaction error catched:", error.message);
        return null;
    }
}

async function MongoWithTransaction(dbId, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const session = global.MongoConnections[dbId].startSession();
        const result = await session.withTransaction(callback);
        return result;
    } catch (error) {
        ParseError("MongoDB transaction error catched:", error.message);
        return null;
    }
}

async function MongoBulkWrite(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        if (typeof params !== "object") return null;
        if (typeof params.collection !== "string") return null;
        if (typeof params.operations !== "object") return null;
        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.bulkWrite(params.operations);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB bulk write error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoReplaceOne(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        if (typeof params !== "object") return null;
        if (typeof params.collection !== "string") return null;
        if (typeof params.filter !== "object") return null;
        if (typeof params.replacement !== "object") return null;
        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.replaceOne(params.filter, params.replacement);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB replace one error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoReplaceMany(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        if (typeof params !== "object") return null;
        if (typeof params.collection !== "string") return null;
        if (typeof params.filter !== "object") return null;
        if (typeof params.replacement !== "object") return null;
        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.replaceMany(params.filter, params.replacement);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB replace many error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoIsConnected(dbId) {
    try {
        const db = global.MongoConnections[dbId];
        const result = await db.command({ ping: 1 });
        return result.ok === 1;
    } catch (error) {
        return false;
    }
}

global.exports('MongoInsertOne', MongoInsertOne);
global.exports('MongoInsertMany', MongoInsertMany);
global.exports('MongoFindOne', MongoFindOne);
global.exports('MongoFindMany', MongoFindMany);
global.exports('MongoUpdateOne', MongoUpdateOne);
global.exports('MongoUpdateMany', MongoUpdateMany);
global.exports('MongoCount', MongoCount);
global.exports('MongoDeleteOne', MongoDeleteOne);
global.exports('MongoDeleteMany', MongoDeleteMany);
global.exports('MongoCreateIndex', MongoCreateIndex);
global.exports('MongoStartTransactionSession', MongoStartTransactionSession);
global.exports('MongoWithTransaction', MongoWithTransaction);
global.exports('MongoBulkWrite', MongoBulkWrite);
global.exports('MongoReplaceOne', MongoReplaceOne);
global.exports('MongoReplaceMany', MongoReplaceMany);
global.exports('MongoIsConnected', MongoIsConnected);