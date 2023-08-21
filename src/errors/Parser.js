const { SendDiscordLog } = require('../utils/Discord.js');
const ErrorList = require('./List.js');
const { GetKey } = require('../language/localisation.js');
const { Log, LogTypes } = require('../utils/Logger.js')
const { GetLanguage } = require('../language/localisation.js')

var errors = [];
var quickFix = [];
var unknowErrors = [];

function GetErrors() {
    return { "quickFix": quickFix, "unknowErrors": unknowErrors };
}

function ParseError(error, replaceParams = []) {
    errors.push(error);
    var errorData = null;

    for (let i = 0; i < ErrorList.length; i++) {
        ErrorList[i].tags.forEach(tag => {
            if (error.includes(tag)) {
                return errorData = ErrorList[i];
            }
        });
    }

    if (errorData == null) {
        if (Config.SendUnknownErrors)
            SendDiscordLog({
                "content": null,
                "embeds": [
                    {
                        "title": GetKey("UnkownError"),
                        "description": GetKey("UnkownErrorDescription") + "\n `" + error + "`",
                        "color": 16711680
                    }
                ],
                "attachments": []
            })
        unknowErrors.push(error);
        Log(LogTypes.Error, error + "^0");
    }
    else {
        quickFix.push(errorData);
        var errorSolution = errorData.solution[GetLanguage()];
        var errorDescription = errorData.description[GetLanguage()];
        const keyword = "{ice_mysql_error_replace}";
        replaceParams.forEach(param => {
            errorSolution = errorSolution.replace(keyword, param);
            errorDescription = errorDescription.replace(keyword, param);
        });
        Log(LogTypes.Error, error + "^0", errorDescription, errorSolution);
        if (Config.SendCommonErrors)
            SendDiscordLog({
                "content": null,
                "embeds": [
                    {
                        "title": GetKey("ErrorDetected"),
                        "description": GetKey("ErrorDetectedDescription") + "\n `" + error + "`\n\n" + GetKey("Description") + ": " + errorDescription + "\n\n" + GetKey("Possible_Solutions") + ": " + errorSolution + "\n\n",
                        "color": 16755968
                    }
                ],
                "attachments": []
            })

        if (Config.ShowErrorDescription)
            Log(LogTypes.Info, `^5${GetKey("Description")}: ${errorDescription}^0`);
        if (Config.ShowErrorSolution)
            Log(LogTypes.Solution, `^3${GetKey("Possible_Solutions")}: ${errorSolution}^0`);
    }
}

module.exports = { ParseError, GetErrors }