const icmysql = exports.icmysql;

const ORMFunctions = ["FindAll", "FindOne", "FindById", "Modify", "FindAndCountAll", "Create", "Destroy", "Count", "Max", "Min", "Sum", "Increment", "Decrement", "BulkCreate"]
const QueryFunctions = ["Query", "AwaitQuery", "Select", "AwaitSelect", "Insert", "AwaitInsert", "Update", "AwaitUpdate", "Delete", "AwaitDelete", "Transaction", "AwaitTransaction", "Unique", "AwaitUnique", "Single", "AwaitSingle"]
const RedisFunctions = ["RedisGet", "RedisSet", "RedisDel", "RedisExists", "RedisExpire", "RedisUpdate", "RedisFlush", "RedisKeys", "RedisMGet", "CloseRedis", "OpenRedis", "ReloadRedis"]
const MongoFunctions = ["MongoInsertOne", "MongoInsertMany", "MongoFindOne", "MongoFindMany", "MongoUpdateOne", "MongoUpdateMany", "MongoCount", "MongoDeleteOne", "MongoDeleteMany", "MongoCreateIndex", "MongoStartTransactionSession", "MongoWithTransaction", "MongoBulkWrite", "MongoReplaceOne", "MongoReplaceMany", "MongoIsConnected"]

MySQL = {
    ORM: {},
    Mongo: {},
    Redis: {}
}

for (let i = 0; i < ORMFunctions.length; i++) {
    MySQL.ORM[ORMFunctions[i]] = function () {
        return icmysql[ORMFunctions[i]](...arguments)
    }
}
for (let i = 0; i < QueryFunctions.length; i++) {
    MySQL[QueryFunctions[i]] = function () {
        return icmysql[QueryFunctions[i]](...arguments)
    }
}
for (let i = 0; i < MongoFunctions.length; i++) {
    MySQL.Mongo[MongoFunctions[i]] = function () {
        return icmysql[MongoFunctions[i]](...arguments)
    }
}

for (let i = 0; i < RedisFunctions.length; i++) {
    MySQL.Redis[RedisFunctions[i]] = function () {
        return icmysql[RedisFunctions[i]](...arguments)
    }
}