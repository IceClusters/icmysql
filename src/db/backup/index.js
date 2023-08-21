const { exec } = require('child_process');
const { SendDiscordLog } = require('../../utils/Discord.js');
const { ParseError } = require('../../errors/Parser.js');
const { performance } = require('perf_hooks');
const { CreateDirRecursive, GetOldestFiles, DeleteFile } = require('../../utils/Files.js');
const { Log, LogTypes } = require('../../utils/Logger.js');
const { GetDate } = require('../../utils/Time.js')
const { GetKey } = require('../../language/localisation.js')
const { ReadDir, GetFileCreationDate, GetFileSize } = require('../../utils/Files.js')

var pendingBackup = [];
var backupMaded = false;

function execAsync(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

async function PrepareBackup(id, credentials) {
    var makeBackup = false;
    var day = new Date().getDate();
    for (let i = 0; i < Config.Days.length; i++) {
        if (Config.Days[i] == day) {
            makeBackup = true;
            break;
        }
    }
    if (!makeBackup) return;
    const BackupInterval = setInterval(async () => {
        var hour = new Date().getHours();
        var minutes = new Date().getMinutes();
        var exceptHour = Config.Hour.split(":")[0];
        var exceptedMinute = Config.Hour.split(":")[1];
        if (hour == parseInt(exceptHour) && minutes == parseInt(exceptedMinute)) {
            clearInterval(BackupInterval);
            pendingBackup.push(credentials);
            if (id == 1) {
                setTimeout(async () => {
                    await MakeBackup();
                }, 5000);
            }
        }
    }, 40000);
}

async function MakeBackup() {
    if (backupMaded) return;
    await CreateDirRecursive(Config.BackupDirPath)
    backupMaded = true;
    GetOldestFiles(Config.BackupDirPath, Config.MaxBackups).then(filesToDelete => {
        if (filesToDelete.length == 0) return;
        for (const file of filesToDelete) {
            const filePath = path.join(Config.BackupDirPath, file.name);
            DeleteFile(filePath);
        }
    }).catch(err => {
        ParseError(`Error deleting files, `, [err.message]);
    });
    var times = [];
    for (let i = 0; i < pendingBackup.length; i++) {
        const start = performance.now();
        const backupName = `${pendingBackup[i].database}_${GetDate().replace("/", "-").replace("/", "-")}`;
        var passwordString = "";
        if (pendingBackup[i].password) {
            passwordString = `-p${pendingBackup[i].password}`;
        }
        const command = `"${Config.MysqlDumpPath}" -h ${pendingBackup[i].host} ${passwordString} -u ${pendingBackup[i].user} ${pendingBackup[i].database} > ${Config.BackupDirPath}/${backupName}.sql`;
        process.env.MYSQL_PWD = pendingBackup[i].password;
        Log(LogTypes.Info, "^3" + GetKey("BackupStart"))
        try {
            await execAsync(command);
            process.env.MYSQL_PWD = null;
            Log(LogTypes.Info, "^2" + GetKey("BackupSuccess"));
            const end = performance.now();
            times.push({ path: `${Config.BackupDirPath}/${backupName}.sql`, duration: `${(end - start).toFixed(4)}ms` });
        } catch (error) {
            process.env.MYSQL_PWD = null;
            ParseError(`Backup error`, [error.message]);
        }
    }
    var pathList = "";
    for (let i = 0; i < times.length; i++) {
        pathList += `\n\`${times[i].path}\` in ${times[i].duration}`;
    }
    if (Config.SendBackupInfo)
        SendDiscordLog({
            "content": null,
            "embeds": [
                {
                    "title": "Backup Success",
                    "description": "Hey there! The database backup process has been successfully completed. 🎉\n\nYou can find the backup file at the following path:\n" + pathList,
                    "color": 8912728,
                    "footer": {
                        "text": "Ice MySQL"
                    },
                    "timestamp": "2023-08-02T10:07:00.000Z"
                }
            ],
            "attachments": []
        });
    process.env.MYSQL_PWD = null;
    pendingBackup = [];
}

async function GetBackupHistory() {
    const data = await ReadDir(Config.BackupDirPath);
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const name = data[i].split("_")[0];
        const date = data[i].split("_")[1].replace(".sql", "");
        const size = await GetFileSize(`${Config.BackupDirPath}/${data[i]}`) / 1000;
        result.push({ name: name, date: date, size: size });
    }
    return result;
}

module.exports = { PrepareBackup, GetBackupHistory }