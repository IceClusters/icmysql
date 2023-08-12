const { DirExist } = require('../utils/Files.js')

var loadedData = {};
var changedFiles = [];
var loadingData = true;

async function InitData() {
    if (!await DirExist(Config.SaveDirPath)) {
        await CreateIfNotExist(Config.SaveDirPath + `/${GetCurrentResourceName()}.json`, "{}");
    }

    ReadDir(Config.SaveDirPath).then(async function (files) {
        let promises = [];
        for (let i = 0; i < files.length; i++) {
            if (!files[i].endsWith(".json")) continue;
            let fileName = files[i].replace(".json", "");
            promises.push(ReadFile(Config.SaveDirPath + "/" + files[i]).then(function (data) {
                loadedData[fileName] = JSON.parse(data);
            }));
        }
        await Promise.all(promises);
        loadingData = false;
        Log(LogTypes.Debug, `Loaded data from: ${files.map(file => file.replace(".json", "")).join(", ")}`);
    });
}

// module.exports = { InitData }