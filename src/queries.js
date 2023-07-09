/*
["ice_testing"] = [
    {
        "dbID": 1,
        "query": "SELECT * FROM users WHERE identifier=?",
        "params": ["steam:11000010c4e0b3e"],
        "executionTime": 0.1592754,
        "date": "2021-05-02T15:32:00.000Z,
        "result": [
            {
                "identifier": "steam:11000010c4e0b3e",
            }
        ],
        "error": null,
    }
]
*/

const MakeQuery = function (conn, query, params, isDebuging, rscName) {
    return new Promise(async function (resolve, reject) {
        if (isDebuging) {
            var queryFinished = false;

            var executionTime = null;
            var date = null;
            var queryResult = null;
        }
        var error = null;
        if (!databasesReady) {
            error = "The database isn't connected right now."
            return console.error(error)
        }
        if (query.includes("?") && !params) {
            error = "You need to specify the parameters to replace in the query or remove ? character."
            return console.error(error)
        }
        try {
            const start = performance.now();
            databaseConnections[conn - 1].query(query, params, function (err, result, fields) {
                if (err) console.error(err.message)
                resolve(result);
                if (isDebuging) {
                    const end = performance.now();
                    executionTime = end - start;
                    date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    queryFinished = true;
                    queryResult = result;
                }
            })
        }
        catch (err) {
            error = err.message;
            reject(error);
        }
        if (!isDebuging) return;
        while (!queryFinished) {
            await new Promise(resolve => setTimeout(resolve, 1));
            if (Buffer.from(queryLogs).byteLength > 5000000) {
                queryLogs = [];
            }
            queryLogs.push({ "resourceName": rscName, "dbID": conn, "query": query, "params": params, "executionTime": executionTime, "date": date, "result": queryResult, "error": error })
        }
    });
}

module.exports = { MakeQuery }