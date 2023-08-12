const { ParseError } = require('../errors/Parser.js');

async function GetDataInteral(resourceName, type, key, defaultValue) {
    while (loadingData) {
        await new Promise(resolve => setTimeout(resolve, 1))
    };
    if (resourceName == null || key == null || defaultValue == null || type == null) return ParseError("Invalid parameters for LoadData function");
    if (type !== typeof defaultValue) return ParseError("Invalid variable type for LoadData function", [typeof defaultValue, type]);
    if (loadedData[resourceName] == null || loadedData[resourceName][type] == null || loadedData[resourceName][type][key] == null) return defaultValue;
    return loadedData[resourceName][type][key];
}

function SetDataInteral(resourceName, type, key, value) {

    if (resourceName == null || key == null || type == null || value == null) return ParseError("Invalid parameters for SetData function");
    if (!loadedData[resourceName]) {
        loadedData[resourceName] = {};
    }
    if (!loadedData[resourceName][type]) {
        loadedData[resourceName][type] = {};
    }
    loadedData[resourceName][type][key] = value;
    if (!changedFiles.includes(resourceName))
        changedFiles.push(resourceName);
}

function RemoveDataInteral(resourceName, type, key) {
    if (resourceName == null || key == null || type == null) return ParseError("Invalid parameters for RemoveData function");
    if (loadedData[resourceName] == null || loadedData[resourceName][type] == null || loadedData[resourceName][type][key] == null) return;
    delete loadedData[resourceName][type][key];
    if (!changedFiles.includes(resourceName))
        changedFiles.push(resourceName);
}

async function GetData(resourceName, type, key, defaultValue) {
    if (resourceName == null || key == null || type == null) return ParseError("Invalid parameters for LoadData function");
    if (defaultValue == undefined) {
        defaultValue = key;
        key = type;
        type = resourceName;
        resourceName = GetInvokingResource();
    }
    if (typeof resourceName != "string" || typeof key != "string" || typeof type != "string") return ParseError("Invalid parameters for LoadData function");
    return await GetDataInteral(resourceName, type, key, defaultValue);
}

function SetData(resourceName, type, key, value) {
    if (resourceName == null || key == null || type == null) return ParseError("Invalid parameters for LoadData function");
    if (typeof resourceName != "string" || typeof key != "string" || typeof type != "string") return ParseError("Invalid parameters for LoadData function");
    if (value == null) {
        value = key;
        key = type;
        type = resourceName;
        resourceName = GetInvokingResource();
    }
    return SetDataInteral(resourceName, type, key, value);
}

function RemoveData(resourceName, type, key) {
    if (resourceName == null || key == null || type == null) return ParseError("Invalid parameters for LoadData function");
    if (typeof resourceName != "string" || typeof key != "string" || typeof type != "string") return ParseError("Invalid parameters for LoadData function");
    if (key == null) {
        key = type;
        type = resourceName;
        resourceName = GetInvokingResource();
    }
    return RemoveDataInteral(resourceName, type, key);
}

if (typeof Config.SaveInterval !== "number" || Config.SaveInterval < 5000) {
    Config.SaveInterval = 30000;
    ParseError("Invalid SaveInterval value")
}

// setInterval(async () => {
//     await SaveData();
// }, Config.SaveInterval);

// global.exports('GetData', GetData);
// global.exports('SetData', SetData);
// global.exports('RemoveData', RemoveData);