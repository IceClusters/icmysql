local ice_mysql = exports.ice_mysql
local MySQLData = {}

local function customAwait(func, ...)
    local promiseObj = Promise.new()

    func(nil, ..., function(result, error)
        if error then
            promiseObj:reject(error)
        else
            promiseObj:resolve(result)
        end
    end, GetCurrentResourceName(), true)

    return Citizen.Await(promiseObj)
end

MySQLData.__call = function(self, ...)
    local newObj = {}
    setmetatable(newObj, self)
    self.__index = self
    return newObj
end

local ORMFunctions = {"FindAll", "FindOne", "FindById", "Modify", "FindAndCountAll", "Create", "Destroy", "Count", "Max", "Min", "Sum", "Increment", "Decrement", "BulkCreate"}
local QueryFunctions = {"Query", "AwaitQuery", "Select", "AwaitSelect", "Insert", "AwaitInsert", "Update", "AwaitUpdate", "Delete", "AwaitDelete", "Transaction", "AwaitTransaction", "Unique", "AwaitUnique", "Single", "AwaitSingle"}
local MongoFunctions = {"MongoInsert", "MongoFind", "MongoUpdate", "MongoCount", "MongoDelete"}
Mongo = {}
MySQL = {
    ORM = {},

    -- Replace OxMySQL functions
    Sync = {
        insert = function(...) 
            return ice_mysql.AwaitInsert(nil, ...)
        end,
        fetchAll = function(...) 
            return ice_mysql.AwaitQuery(nil, ...)
        end,
        fetchScalar = function(...) 
            return ice_mysql.AwaitScalar(nil, ...)
        end,
        transaction = function(...) 
            return ice_mysql.AwaitTransaction(nil, ...)
        end,
        execute = function(...) 
            return ice_mysql.AwaitUpdate(nil, ...)
        end,
    },
    Async = {
        insert = function(...) 
            return ice_mysql.Insert(nil, ...)
        end,
        fetchAll = function(...) 
            return ice_mysql.Query(nil, ...)
        end,
        fetchScalar = function(...) 
            return ice_mysql.Scalar(nil, ...)
        end,
        transaction = function(...) 
            return ice_mysql.Transaction(nil, ...)
        end,
        execute = function(...) 
            return ice_mysql.Update(nil, ...)
        end,
    },
    insert = setmetatable({
        await = function(...) 
            return ice_mysql.AwaitInsert(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return ice_mysql.Insert(nil, ...)
        end
    }),
    prepare = setmetatable({
        await = function(...) 
            return ice_mysql.AwaitPrepare(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return ice_mysql.Prepare(nil, ...)
        end
    }),
    query = setmetatable({
        await = function(...) 
            return ice_mysql.AwaitQuery(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return ice_mysql.Query(nil, ...)
        end
    }),
    rawExecute = setmetatable({
        await = function(...) 
            return ice_mysql.AwaitRaw(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return ice_mysql.Raw(nil, ...)
        end
    }),
    scalar = setmetatable({
        await = function(...) 
            return ice_mysql.AwaitScalar(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return ice_mysql.Scalar(nil, ...)
        end
    }),
    single = setmetatable({
        await = function(...) 
            return ice_mysql.AwaitSingle(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return ice_mysql.Single(nil, ...)
        end
    }),
    transaction = setmetatable({
        await = function(...) 
            return ice_mysql.AwaitTransaction(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return ice_mysql.Transaction(nil, ...)
        end
    }),
    update = setmetatable({
        await = function(...) 
            return ice_mysql.AwaitUpdate(nil, ...)
        end,
    }, {
        __call = function(self, ...)
            return ice_mysql.Update(nil, ...)
        end
    }),
}

for _, func in ipairs(ORMFunctions) do
    MySQL.ORM[func] = function(...)
        return ice_mysql[func](...)
    end
end

for _, func in pairs(QueryFunctions) do
    MySQL[func] = function(...)
        return ice_mysql[func](nil, ...)
    end
end

for _, func in pairs(MongoFunctions) do
    Mongo[func] = function(...)
        return ice_mysql[func](nil, ...)
    end
end

-- MySQL = {

    -- Other functions
    -- JSON = {
    --     GetData = function(...) 
    --         return ice_mysql.GetData(nil, ...)
    --     end,
    --     SetData = function(...) 
    --         return ice_mysql.SetData(nil, ...)
    --     end,
    --     RemoveData = function(...) 
    --         return ice_mysql.RemoveData(nil, ...)
    --     end,
    --     SaveData = function() 
    --         return ice_mysql.SaveData(nil)
    --     end,
    -- }
-- }

setmetatable(MySQL, MySQLData)