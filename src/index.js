const { ParseError } = require('./errors/Parser.js');
const { CheckVersion } = require('./utils/Updater.js');
const { ParseLocalisations } = require('./language/localisation.js');
const { ReadCFG } = require('./db/Reader.js');
const { InitLogs } = require('./utils/Logger.js');
require('./db/Select.js');
require('./db/Update.js');
require('./db/Insert.js');
require('./db/Delete.js');
require('./db/Transactions.js');
require('./db/Unique.js');
if (Config.MongoDB) require('./db/mongo/Connections.js');
if (Config.Redis) require('./db/redis/index.js');

setTimeout(async () => {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        if (Config.CheckForUpdates) {
            await CheckVersion();
        }
        // InitData()
        ParseLocalisations();
        ReadCFG();
        InitLogs();
    } catch (error) {
        ParseError(error.message)
    }
});