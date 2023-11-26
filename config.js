Config = {};
Config.Language = "en"; // en, es, fr

// DataMemSave(TEMPORALY DISABLED UNTIL I FIND A WAY TO FIX PERFORMANCE ISSUES)
Config.SaveDirPath = "IcMysql/Data/"; // Path respective to the FXServer.exe file
Config.SaveInterval = 20000; // The interval in milliseconds that the resource will save the data in the JSON file don't put a value less than 5000

// Errors
Config.Debug = true; // Show debug messages in the console
Config.ShowErrorDescription = true; // Show the error description if is registered in the list
Config.ShowErrorSolution = true; // Show the error solution if is registered in the list

// LOGS
Config.LogFilesPath = "IcMysql/Logs/IcMysql"; // Path respective to the FXServer.exe file
Config.MaxLogFiles = 10; // The count of log files that will be saved, the oldest will be deleted

// Discord Logs
Config.DiscordLogs = false; // Enable the discord logs
Config.DiscordWebhook = "" // The discord webhook that will be used to send relevant data, if you don't want to send the error reports change the previous value to false
Config.SendUnknownErrors = true; // Send the unknown errors to the discord webhook
Config.SendCommonErrors = true; // Send the common errors to the discord webhook that include a posible solution
Config.SendSaveData = true; // Send the file name that is being saved
Config.SendBackupInfo = true; // Send the backup event when a backup is executed
Config.SendDatabaseMapped = true; // Send the database mapped event when a database is mapped
Config.SendDatabaseDisconnect = true; // Send the database disconnect event when a database is disconnected

// BACKUP
Config.BackupEnabled = false; // Enable the backup system
Config.MysqlDumpPath = "C:/Program Files/MariaDB 11.1/bin/mysqldump.exe"; // The path of the mysqldump.exe file, in this case is the path of the xampp mysql dump 
// MOST USED PATHS
// XAMPP: C:/xampp/mysql/bin/mysqldump.exe
// WAMP: C:/wamp/bin/mysql/mysql5.7.26/bin/mysqldump.exe
// MariaDB: C:/Program Files/MariaDB 11.1/bin/mysqldump.exe
Config.BackupDirPath = "IcMysql/Backups"; // Path respective to the FXServer.exe file
Config.MaxBackups = 4; // The max count of backups that will be saved, the oldest will be deleted
Config.Days = [5, 14, 23, 29]; // The days that the backup will be executed, if the array is empty the backup will be executed every day
Config.Hour = "23:00" // The hour in 24h format that the backup will be executed, in this example the backup will be executed at 4:30 AM

// DATABASE
Config.MySQL = true; // Enable the MySQL support
Config.MaxDB = 10; // The max count of databases that can be readed in the server.cfg file
Config.MaxConnectionLimit = 15; // The max count of connections that can be created per database(recomend to not alter this value too much)
Config.QueueLimit = 100; // The max count of queries that can be queued per database(recomend to not alter this value too much)
Config.DefaultDB = 1; // The default database that will be used if the database is not specified in the query
Config.SlowQueryWarn = 300; // The time in milliseconds that the query will be considered slow and will be logged in the console
Config.CacheMaxSize = 50; // The time of the cache in megabytes that will be used to store the queries, if the cache is full the oldest query will be deleted, please don't increase a lot this value because the cache is stored in the RAM
Config.AllowDBDisconnection = true; // Allow the disconnection command to be executed, this will close the conection of a specific database

// MongoDB
Config.MongoDB = false; // Enable the MongoDB support
Config.DefaultMongoDB = 1;
Config.ConnectiTimout = 5000; // The time in milliseconds that the MongoDB will wait for a connection to be available in the pool, if the time is exceeded a error will be thrown

// Debug UI
Config.Enabled = true; // Enable the debug UI
Config.DebugLicenses = ["license:0ca0dfbead8e22c4235769d9380d1fb9d6f32d5a"] // The licenses of the players that will be able to use the debug UI.

// ORM
Config.ORM = false; // Enable the ORM queries, this depend of the MySQL support
Config.DefaultORMDB = 1; // The default database that will be used if the database is not specified in the orm query
Config.RawData = true; // If the ORM will return the raw data or the model instance that contains sequelize data
Config.ConnectionsORM = [0, 10] // Minimum and maximum count of connections that will be created for the ORM, this is used to create a pool of connections that will be used by the ORM, this is used to avoid the creation of a connection for each query
Config.ORMConnectionTimout = 15000 // The time in milliseconds that the ORM will wait for a connection to be available in the pool, if the time is exceeded a error will be thrown
Config.LogORMConnections = true; // Show in the console when a connection is created or released by the ORM

// Redis
Config.Redis = false; // Enable the Redis support

// Update
Config.CheckForUpdates = true; // Check for updates when the server starts
Config.AutoUpdate = false; // If there is a new version, the resource will ask you to type a command if you want to update it
// After update you need to restart the server to apply the changes