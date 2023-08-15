const { ParseError } = require('../errors/Parser.js');
const { RegisterConnection } = require('../db/Connections.js')

function ParseCredentials(credentials) {
    if (!credentials || credentials === "null") return ParseError(`^3Can't find credentials in server.cfg.^0`);

    const values = {};
    if (!credentials.includes("mysql://"))
        credentials.split(';').forEach((item) => {
            const [key, value] = item.split('=');
            if (key && value)
                values[key.trim()] = value.trim();
        });
    else {
        const urlParts = new URL(credentials);
        values.user = urlParts.username;
        values.password = urlParts.password;
        values.host = urlParts.hostname;
        values.port = urlParts.port;
        values.database = urlParts.pathname.slice(1);
    }

    if (!values.host || !values.user || !values.database) {
        ParseError(`^1Invalid credentials provided in server.cfg.^0`);
        return;
    }

    const host = values.host;
    const user = values.user;
    const password = values.password || '';
    const database = values.database;
    const port = values.port || '3306';

    return {
        host: host,
        user: user,
        password: password,
        database: database,
        port: port
    };
}

async function ReadCFG() {
    var i = 0;
    for (; ;) {
        i++;
        const credentials = GetConvar(`mysqlCredentials_${i}`, "null");
        if (i > Config.MaxDB || credentials === "null") break;
        const data = ParseCredentials(credentials)
        if (data != null)
            RegisterConnection(i, ParseCredentials(credentials))
    }
    if (i == 1) {
        ParseError(`^3Can't find credentials in server.cfg.^0`);
    }
}

module.exports = { ReadCFG };