const extract = require('extract-zip')
const { ParseError } = require('../errors/Parser.js')
const axios = require('axios')

const urlVersion = `https://raw.githubusercontent.com/IceClusters/IceVersions/develop/${GetCurrentResourceName()}`;

async function GetVersion() {
    try {
        return await axios.get(urlVersion).then((response) => {
            if (response.status != 200) {
                return ParseError("Error checking version", [response.status]);
            }

            const versionNumbers = response.data.match(/\d+\.\d+\.\d+/g).map(numberWithDot =>
                numberWithDot.split('.').map(Number)
            )[0];
            if (versionNumbers == undefined) {
                return ParseError("Undefined version", [response.data]);
            }
            if (versionNumbers.length != 3) {
                return ParseError("Unkown version structure", [versionNumbers]);
            }
            return typeof versionNumbers == "object" ? versionNumbers : null;
        });
    } catch (e) {
        ParseError("Can't get version, error: " + e.message)
        return null
    }
}

async function UpdateScript() {
    const ignoreFiles = ["config.js"];
    const downloadUrl = "https://github.com/IceClusters/icmysql/archive/refs/heads/develop.zip";
    const extractPath = path.join(GetResourcePath(GetCurrentResourceName()));
    const downloadPath = path.join(extractPath, "icmysql.zip");
    const download = await axios({
        method: 'get',
        url: downloadUrl,
        responseType: 'stream'
    });
    const writer = fs.createWriteStream(downloadPath);
    download.data.pipe(writer);
    await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
    if (!fs.existsSync(extractPath)) {
        await CreateDirRecursive(extractPath)
    }
    try {
        await extract(downloadPath, { dir: path.resolve(extractPath, '..') });
        const newFolderPath = extractPath.replace("icmysql", "icmysql-old");
        const oldFolderPath = extractPath.replace("icmysql", "icmysql-develop");
        await fs.promises.copyFile(path.join(extractPath, "config.js"), path.join(oldFolderPath, "config.js"));
        await fs.promises.rename(extractPath, newFolderPath);
        await fs.promises.rename(path.join(path.resolve(extractPath, '..'), "icmysql-develop"), extractPath);
    } catch (err) {
        ParseError("Error updating resource", [err]);
    }
}

async function CheckVersion() {
    GetVersion().then(async function (version) {
        const currentVersion = GetResourceMetadata(GetCurrentResourceName(), 'version', 0).split('.').map(Number);
        if (currentVersion.length != 3) {
            return ParseError("Unkown current version structure", [currentVersion]);
        }
        var missingMajorUpdate = 0;
        var missingMinorUpdate = 0;
        var missingPatchUpdate = 0;
        for (let i = 0; i < version.length; i++) {
            if (version[i] > currentVersion[i]) {
                switch (i) {
                    case 0:
                        missingMajorUpdate = version[i] - currentVersion[i];
                        break;
                    case 1:
                        missingMinorUpdate = version[i] - currentVersion[i];
                        break;
                    case 2:
                        missingPatchUpdate = version[i] - currentVersion[i];
                        break;
                }
            }
        }
        if (missingMajorUpdate > 0 || missingMinorUpdate > 0 || missingPatchUpdate > 0) {
            Log(LogTypes.Info, "^6New version available");
            Log(LogTypes.Info, "^6Current version: " + currentVersion.join('.'));
            Log(LogTypes.Info, "^6New version: " + version.join('.'));
            if (Config.AutoUpdate) {
                Log(LogTypes.Info, "^3Updating resource...");
                await UpdateScript();
            }
        }
    });
}

module.exports = { CheckVersion }