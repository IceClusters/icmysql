const { MongoClient } = require('mongodb');
const { Log, LogTypes } = require('../../utils/Logger.js');
const { performance } = require('perf_hooks');
require('./Query.js')

global.MongoConnections = {};
global.connectingMongo = true;

function ParseMongoCrendentials(credentials, index) {
    if (credentials == "null") return null;
    if (!credentials.includes("mongodb://")) {
        ParseError(`^3MongoDB credentials must start with mongodb://^0`);
        return null;
    }
    const split = credentials.split("/");
    const databaseName = split[split.length - 1];
    if (databaseName == "") return ParseError(`^3MongoDB credentials must contain database name^0`);
    credentials = credentials.replace(`/${databaseName}`, "");
    const start = performance.now();
    try {
        const client = new MongoClient(credentials, {
            useUnifiedTopology: true,
            connectTimeoutMS: Config.ConnectiTimout,
            serverSelectionTimeoutMS: Config.ConnectiTimout
        });

        client.connect()
            .then(() => {
                const end = performance.now();
                const db = client.db(databaseName)
                global.MongoConnections[index] = db;
                Log(LogTypes.Info, `^2Mongo DB#${index} connected successfully in ${(end - start).toFixed(4)}ms`);
                global.connectingMongo = false;
            })
            .catch(err => {
                ParseError(`^3Can't connect to mongodb#${index}, ${err.message}^0`);
            });
    } catch (e) {
        ParseError(`^3Can't connect to mongodb#${index}, ${e.message}^0`);
    }
}

function ReadMongoCredentials() {
    var i = 0;
    for (; ;) {
        i++;
        const credentials = GetConvar(`mongoCredentials_${i}`, "null");
        if (i > Config.MaxDB || credentials === "null") break;
        const data = ParseMongoCrendentials(credentials, i)
        if (data != null)
            RegisterConnection(i, data)
    }
    if (i == 1) {
        ParseError(`^3Can't find mongo credentials in server.cfg.^0`);
    }
}

setTimeout(() => {
    ReadMongoCredentials()
});