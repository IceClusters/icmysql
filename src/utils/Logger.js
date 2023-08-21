const os = require('os');
const { ParseError } = require('../errors/Parser.js')
const { GetTimestamp, GetTime } = require('../utils/Time.js');
const { GetOldestFiles, CreateIfNotExist, AppendData, DeleteFile } = require('../utils/Files.js')
const path = require('path');

const LogTypes = Object.freeze({ "Info": "INFO", "Warning": "WARNING", "Error": "ERROR", "Debug": "DEBUG", "Solution": "SOLUTION" })
var logReady = false;
var logPath = `${Config.LogFilesPath}_${GetTimestamp()}.log`;
var logs = [];

function GetComponents() {
    const architecture = os.arch();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const cpus = os.cpus();

    return `Hardware Information:\n---------------------\nArchitecture: ${architecture}\nTotal Memory: ${totalMemory} bytes (${(totalMemory / (1024 ** 3)).toFixed(2)} GB)\nFree Memory: ${freeMemory} bytes (${(freeMemory / (1024 ** 3)).toFixed(2)} GB)\n\nCPU Information:\n---------------\nNumber of Cores: ${cpus.length}\nModel: ${cpus[0].model}\nSpeed: ${cpus[0].speed} MHz\n\n\n`;
}

async function InitLogs() {
    GetOldestFiles(path.dirname(logPath), Config.MaxLogFiles).then(filesToDelete => {
        if (filesToDelete.length == 0) return;
        for (const file of filesToDelete) {
            const filePath = path.join(path.dirname(logPath), file.name);
            DeleteFile(filePath);
        }
    }).catch(err => {
        ParseError(`Can't delete old logs: ${err.message}`);
    });
    await CreateIfNotExist(logPath, "ICE MYSQL\n" + GetComponents());
    logReady = true;
}

async function Log(logType, message, description = null, solution = null) {
    while (!logReady) {
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    if (!logType || !message) return;
    var logMessage = `[${GetTime()}] [${logType}] ${message}`;
    switch (logType) {
        case LogTypes.Info:
            console.log(`${message}^0`);
            break;
        case LogTypes.Warning:
            console.warn(`${message}^0`);
            break;
        case LogTypes.Error:
            console.error(`${message}^0`);
            break;
        case LogTypes.Debug:
            Config.Debug ? console.log(`^5${message}^0`) : null;
            break;
        case LogTypes.Solution:
            console.log(`^3${message}^0`);
            break;
    }
    logs.push({
        type: logType,
        message: logMessage,
        description: description,
        solution: solution
    });
    AppendData(logPath, logMessage.replace(/\^(\d+)/g, '') + "\n");
}

async function GetLogs() {
    return logs;
}

module.exports = { Log, LogTypes, InitLogs, GetLogs }