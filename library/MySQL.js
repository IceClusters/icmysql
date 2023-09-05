const icmysql = exports.icmysql;

const ORMFunctions = ["FindAll", "FindOne", "FindById", "Modify", "FindAndCountAll", "Create", "Destroy", "Count", "Max", "Min", "Sum", "Increment", "Decrement", "BulkCreate"]
const QueryFunctions = ["Query", "AwaitQuery", "Select", "AwaitSelect", "Insert", "AwaitInsert", "Update", "AwaitUpdate", "Delete", "AwaitDelete", "Transaction", "AwaitTransaction", "Unique", "AwaitUnique", "Single", "AwaitSingle"]
const MongoFunctions = ["MongoInsert", "MongoFind", "MongoUpdate", "MongoCount", "MongoDelete"]

MySQL = {
    ORM: {},
    Mongo: {}
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