const mysql = require('mysql2')

function ReplaceNamedParams(query, params) {
    for (const [key, value] of Object.entries(params)) {
        const regex = new RegExp(`@${key}\\b`, 'g');
        query = query.replace(regex, mysql.escape(value));
    }
    return query;
};

function ReplaceDotParams(query, params) {
    for (const [key, value] of Object.entries(params)) {
        const regex = new RegExp(`\\:${key}\\b`, 'g');
        query = query.replace(regex, mysql.escape(value));
    }
    return query;
}

module.exports = { ReplaceNamedParams, ReplaceDotParams }