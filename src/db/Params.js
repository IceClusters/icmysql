const { escape } = require('mysql2')

function ReplaceNamedParams(query, params) {
    for (var [key, value] of Object.entries(params)) {
        key = key.replace("@", "");
        const regex = new RegExp(`@${key}\\b`, 'g');
        const escapedValue = value === null ? 'NULL' : escape(value);
        query = query.replace(regex, escapedValue);
    }
    return query;
}

function ReplaceDotParams(query, params) {
    for (var [key, value] of Object.entries(params)) {
        key = key.replace(":", "");
        const regex = new RegExp(`\\:${key}\\b`, 'g');
        const escapedValue = value === null ? 'NULL' : escape(value);
        query = query.replace(regex, escapedValue);
    }
    return query;
}

function ConvertNilParams(params) {
    function GetMaxIndex(params) {
        let maxIndex = 0;
        for (const key in params) {
            if (maxIndex < key) {
                maxIndex = key;
            }
        }
        return maxIndex;
    }
    var newParams = [];
    for (let i = 0; i < GetMaxIndex(params); i++) {
        newParams[i] = params[i + 1] === null ? escape("NULL") : escape(params[i + 1]);
    }
    return newParams;
}

module.exports = { ReplaceNamedParams, ReplaceDotParams, ConvertNilParams }