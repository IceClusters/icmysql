function ReadDatabaseCredentials() {
    for (let i = 0; i < 10; i++) {
        // Loop through all mysqlCredentials in server.cfg
        const data = GetConvar(`mysqlCredentials_${i + 1}`, "null").split(";");
        if (data[0] === "null") break;
        var parsedCredential = {};
        // Read data and split unnecesaries characters or spaces
        for (var k = 0; k < data.length; k++) {
            var par = data[k].trim();
            var separator = par.indexOf("=");

            if (separator !== -1) {
                var key = par.slice(0, separator).trim();
                var value = par.slice(separator + 1).trim();

                parsedCredential[key] = value;
            }
        }
        databaseCredentials[i] = {
            "host": parsedCredential.host,
            "user": parsedCredential.user,
            "password": parsedCredential.password,
            "dbName": parsedCredential.dbName,
            "port": parsedCredential.port,
        }
    }
    // If one or more databases credentials are in the cfg then try to connect
    return databaseCredentials[0] ? ConnectToDatabases() : console.error("Can't find any mysqlCredentials1 in server.cfg")
}

function ConnectToDatabases() {
    let connected = 0;
    let timeSpent = 0;
    for (let i = 0; i < Object.keys(databaseCredentials).length; i++) {
        let startPer = performance.now();
        // Create connection with credentials
        var con = mysql.createConnection({
            host: databaseCredentials[i].host,
            user: databaseCredentials[i].user,
            password: databaseCredentials[i].password,
            database: databaseCredentials[i].dbName,
            port: databaseCredentials[i].port,
        })
        con.connect(function (err) {
            connected++;
            // Check if the number of tried databases connection is equal to the amount of DB in server.cfg
            const endPer = performance.now();
            const elapsedTimePer = endPer - startPer;
            if (connected == Object.keys(databaseCredentials).length) {
                databasesReady = true;
                // Wait 100 ms because the above console.log is showed before this message
                setTimeout(() => {
                    console.log(`Connected to ${databaseConnections.length} data${databaseConnections.length > 1 ? 'bases' : 'base'} in ${Math.round((timeSpent + Number.EPSILON) * 100) / 100} ms`);
                }, 100);
            }
            if (err) {
                console.log(`^3Error while trying to connect to DB#${i + 1}: ^1${err.message}^0`)
                return;
            }
            const colorMs = elapsedTimePer >= 1000 ? "1" : elapsedTimePer >= 500 ? "3" : "2"
            timeSpent += Math.round((elapsedTimePer + Number.EPSILON) * 100) / 100
            console.log(`^2Successfully connected to DB#${i + 1} in ^${colorMs}${elapsedTimePer.toFixed(2)} ms^0`)
            databaseConnections[i] = con;
        })
    }
    return true
}

module.exports = { ReadDatabaseCredentials, ConnectToDatabases }