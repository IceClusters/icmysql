const { SendDiscordLog } = require('../utils/Discord.js');

async function SaveData() {
    if (changedFiles.length == 0) return;
    for (let i = 0; i < changedFiles.length; i++) {
        if (await FileExist(Config.SaveDirPath + "/" + changedFiles[i] + ".json")) {
            await ModifyData(Config.SaveDirPath + "/" + changedFiles[i] + ".json", JSON.stringify(loadedData[changedFiles[i]]));
        }
        else {
            await CreateIfNotExist(Config.SaveDirPath + "/" + changedFiles[i] + ".json", JSON.stringify(loadedData[changedFiles[i]]));
        }
    }
    Log(LogTypes.Debug, `Saved data of ${changedFiles.map(file => file).join(", ")}`);
    if (Config.SendSaveData)
        SendDiscordLog({
            "content": null,
            "embeds": [
                {
                    "title": "JSON Saved",
                    "description": "The JSON files have been saved successfully.\n `" + changedFiles.map(file => file).join("\n") + "`",
                    "color": 16773720
                }
            ],
            "attachments": []
        })
    changedFiles = [];

}

global.exports('SaveData', SaveData);