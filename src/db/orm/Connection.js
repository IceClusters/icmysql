const SequelizeAuto = require('sequelize-auto');
const { Sequelize, Op } = require('sequelize');
const { ParseError } = require('../../errors/Parser.js');
const { Log, LogTypes } = require('../../utils/Logger.js');
const { performance } = require('perf_hooks');
const { RegisterORMConnection } = require('./index.js');

function ParseCredentials(credentials) {
    const data = credentials.split(";").map(elemento => elemento.replace(/ /g, ""));
    const retval = {};
    data.forEach(element => {
        retval[element.split("=")[0]] = element.split("=")[1]
    });
    return retval
}

function ReadORMCredentials() {
    var i = 0;
    for (; ;) {
        i++;
        const credentials = GetConvar(`ormCredentials_${i}`, "null");
        if (i > Config.MaxDB || credentials === "null") break;
        RegisterORMConnection(i, ParseCredentials(credentials))
    }
    if (i == 1) {
        ParseError(`^3Can't find mongo credentials in server.cfg.^0`);
    }
}

setTimeout(() => {
    ReadORMCredentials()
});