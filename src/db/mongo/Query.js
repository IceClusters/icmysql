const { MongoClient } = require('mongodb');
const { ParseError } = require('../../errors/Parser.js');
const { Log, LogTypes } = require('../../utils/Logger.js');
const { PrepareObject } = require('./utils.js');

async function MongoMiddleware(dbId, params) {
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

async function MongoInsert(dbId, params, callback) {
    try {
        if (typeof callback !== "function") callback = null;
        const data = await MongoMiddleware(dbId, params);
        if (typeof data !== "object") return null;

        const documents = PrepareObject(data.params.documents);
        const options = PrepareObject(data.params.options);
        const collection = global.MongoConnections[dbId].collection(params.collection)
        const result = await collection.insertOne(documents, options);
        return callback ? callback(result) : result;
    } catch (error) {
        ParseError("MongoDB find error catched:", error.message);
        return callback ? callback(null) : null;
    }
}

async function MongoFind(dbId, params, callback) {
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

async function MongoUpdate(dbId, params, callback) {
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

async function MongoDelete(dbId, params, callback) {
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

global.exports('MongoInsert', MongoInsert);
global.exports('MongoFind', MongoFind);
global.exports('MongoUpdate', MongoUpdate);
global.exports('MongoCount', MongoCount);
global.exports('MongoDelete', MongoDelete);