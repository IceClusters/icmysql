const MakeQuery = function (conn, query) {
    return new Promise(function (resolve, reject) {
        if (!databasesReady) reject("The database isn't connected right now.")
        try {
            databaseConnections[conn - 1].query(query, function (err, result, fields) {
                if (err) console.error(err.message)
                resolve(result);
            })
        }
        catch (err) {
            reject(err.message);
        }
    });
}

module.exports = { MakeQuery }