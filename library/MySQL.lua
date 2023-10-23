local icmysql = exports.icmysql
local MySQLData = {}
local dbReady = false

MySQLData.__call = function(self, ...)
    local newObj = {}
    setmetatable(newObj, self)
    self.__index = self
    return newObj
end

local ORMFunctions = {"FindAll", "FindOne", "FindById", "Modify", "FindAndCountAll", "Create", "Destroy", "Count", "Max", "Min", "Sum", "Increment", "Decrement", "BulkCreate"}
local QueryFunctions = {"Query", "AwaitQuery", "Select", "AwaitSelect", "Insert", "AwaitInsert", "Update", "AwaitUpdate", "Delete", "AwaitDelete", "Transaction", "AwaitTransaction", "Unique", "AwaitUnique", "Single", "AwaitSingle"}
local MongoFunctions = {"MongoInsertOne", "MongoInsertMany", "MongoFindOne", "MongoFindMany", "MongoUpdateOne", "MongoUpdateMany", "MongoCount", "MongoDeleteOne", "MongoDeleteMany", "MongoCreateIndex", "MongoStartTransactionSession", "MongoWithTransaction", "MongoBulkWrite", "MongoReplaceOne", "MongoReplaceMany", "MongoIsConnected"}
local RedisFunctions = {"RedisGet", "RedisSet", "RedisDel", "RedisExists", "RedisExpire", "RedisUpdate", "RedisFlush", "RedisKeys", "RedisMGet", "CloseRedis", "OpenRedis", "ReloadRedis" }

MySQL = {
    ORM = {},

    -- Replace OxMySQL functions
    Sync = {
        insert = function(...) 
            return icmysql.AwaitInsert(nil, ...)
        end,
        fetchAll = function(...) 
            return icmysql.AwaitQuery(nil, ...)
        end,
        fetchSingle = function(...) 
            return icmysql.AwaitSelect(nil, ...)
        end,
        fetchScalar = function(...) 
            return icmysql.AwaitScalar(nil, ...)
        end,
        transaction = function(...) 
            return icmysql.AwaitTransaction(nil, ...)
        end,
        execute = function(...) 
            return icmysql.AwaitUpdate(nil, ...)
        end,
    },
    Async = {
        insert = function(...) 
            return icmysql.Insert(nil, ...)
        end,
        fetchAll = function(...) 
            return icmysql.Query(nil, ...)
        end,
        fetchSingle = function(...)
            return icmysql.Select(nil, ...)
        end,
        fetchScalar = function(...) 
            return icmysql.Scalar(nil, ...)
        end,
        transaction = function(...) 
            return icmysql.Transaction(nil, ...)
        end,
        execute = function(...) 
            return icmysql.Update(nil, ...)
        end,
    },
    insert = setmetatable({
        await = function(...) 
            return icmysql.AwaitInsert(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return icmysql.Insert(nil, ...)
        end
    }),
    prepare = setmetatable({
        await = function(...) 
            return icmysql.AwaitPrepare(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return icmysql.Prepare(nil, ...)
        end
    }),
    query = setmetatable({
        await = function(...) 
            return icmysql.AwaitQuery(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return icmysql.Query(nil, ...)
        end
    }),
    rawExecute = setmetatable({
        await = function(...) 
            return icmysql.AwaitRaw(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return icmysql.Raw(nil, ...)
        end
    }),
    scalar = setmetatable({
        await = function(...) 
            return icmysql.AwaitScalar(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return icmysql.Scalar(nil, ...)
        end
    }),
    single = setmetatable({
        await = function(...) 
            return icmysql.AwaitSingle(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return icmysql.Single(nil, ...)
        end
    }),
    transaction = setmetatable({
        await = function(...) 
            return icmysql.AwaitTransaction(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return icmysql.Transaction(nil, ...)
        end
    }),
    update = setmetatable({
        await = function(...) 
            return icmysql.AwaitUpdate(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return icmysql.Update(nil, ...)
        end
    }),
}

for _, func in ipairs(ORMFunctions) do
    MySQL.ORM[func] = function(...)
        return icmysql[func](...)
    end
end

for _, func in pairs(QueryFunctions) do
    MySQL[func] = function(...)
        return icmysql[func](nil, ...)
    end
end
MySQL.Mongo = {}
for _, func in pairs(MongoFunctions) do
    MySQL.Mongo[func:gsub("Mongo", "")] = function(...)
        return icmysql[func](nil, ...)
    end
end
MySQL.Redis = {}
for _, func in pairs(RedisFunctions) do
    MySQL.Redis[func:gsub("Redis", "")] = function(...)
        return icmysql[func](nil, ...)
    end
end

MySQL.ready = function(cb)
    CreateThread(function()
        while(not dbReady) do 
            dbReady = icmysql.IsReady()
            Wait(10)
        end
        cb()    
    end)
end

setmetatable(MySQL, MySQLData)