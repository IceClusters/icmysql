const { ParseError } = require('./errors/Parser.js');
const { CheckVersion } = require('./utils/Updater.js');
const { ParseLocalisations } = require('./language/localisation.js');
const { ReadCFG } = require('./db/Reader.js');
const { InitLogs } = require('./utils/Logger.js');

require('./db/Transactions.js');
if (Config.MongoDB) require('./db/mongo/Connections.js');
if (Config.Redis) require('./db/redis/index.js');

setTimeout(async () => {
    try {
        if (Config.CheckForUpdates) {
            await CheckVersion();
        }
        // InitData() // This is the JSON system, disabled until fix the high cpu usage
        ParseLocalisations();
        if(Config.MySQL){
            ReadCFG();
        } else if(Config.ORM) {
            ParseError(`^3The MySQL support is disabled, but you're trying to use ORM, if you want to use ORM enable the MySQL support in config.js.^0`)
        }
        if(!Config.MySQL && !Config.MongoDB && !Config.Redis) {
            ParseError(`^3You need to enable at least one database system in config.js.^0`)
        }
        InitLogs();
    } catch (error) {
        ParseError(error.message)
    }
});