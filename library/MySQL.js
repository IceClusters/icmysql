const ice_mysql = exports.ice_mysql;

MySQL = {
    ORM: {
        FindAll: function (...args) {
            return ice_mysql.FindAll(...args);
        },
        FindOne: function (...args) {
            return ice_mysql.FindOne(...args);
        },
        FindById: function (...args) {
            return ice_mysql.FindById(...args)
        },
        Modify: function (...args) {
            return ice_mysql.Modify(...args)
        },
        FindAndCountAll: function (...args) {
            return ice_mysql.FindAndCountAll(...args)
        },
        Create: function (...args) {
            return ice_mysql.Create(...args)
        },
        Destroy: function (...args) {
            return ice_mysql.Destroy(...args)
        },
        Count: function (...args) {
            return ice_mysql.Count(...args)
        },
        Max: function (...args) {
            return ice_mysql.Max(...args)
        },
        Min: function (...args) {
            return ice_mysql.Min(...args)
        },
        Sum: function (...args) {
            return ice_mysql.Sum(...args)
        },
        Increment: function (...args) {
            return ice_mysql.Increment(...args)
        },
        Decrement: function (...args) {
            return ice_mysql.Decrement(...args)
        },
        BulkCreate: function (...args) {
            return ice_mysql.BulkCreate(...args)
        },
    },
    Query: function (...args) {
        return ice_mysql.Query(...args)
    },
    AwaitQuery: function (...args) {
        return ice_mysql.AwaitQuery(...args)
    },
    Select: function (...args) {
        return ice_mysql.Select(...args)
    },
    AwaitSelect: function (...args) {
        return ice_mysql.AwaitSelect(...args)
    },
    Insert: function (...args) {
        return ice_mysql.Insert(...args)
    },
    AwaitInsert: function (...args) {
        return ice_mysql.AwaitInsert(...args)
    },
    Update: function (...args) {
        return ice_mysql.Update(...args)
    },
    AwaitUpdate: function (...args) {
        return ice_mysql.AwaitUpdate(...args)
    },
    Delete: function (...args) {
        return ice_mysql.Delete(...args)
    },
    AwaitDelete: function (...args) {
        return ice_mysql.AwaitDelete(...args)
    },
    Transaction: function (...args) {
        return ice_mysql.Transaction(...args)
    },
    AwaitTransaction: function (...args) {
        return ice_mysql.AwaitTransaction(...args)
    }
}