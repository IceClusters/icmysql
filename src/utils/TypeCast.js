module.exports = function(field, next) {
    const { type, string, buffer, length, charset } = field;
    const typeHandlers = {
        'DATETIME': field => new Date(field.string()).getTime(),
        'DATETIME2': field => new Date(field.string()).getTime(),
        'TIMESTAMP': field => new Date(field.string()).getTime(),
        'TIMESTAMP2': field => new Date(field.string()).getTime(),
        'NEWDATE': field => new Date(field.string()).getTime(),
        'DATE': field => new Date(field.string() + ' 00:00:00').getTime(),
        'TINY': field => field.length === 1 ? field.string() === '1' : next(),
        'BIT': field => field.length === 1 ? field.buffer()[0] === 1 : field.buffer()[0],
        'TINY_BLOB': field => field.charset === 63 ? (field.buffer() === null ? [null] : [...field.buffer()]) : field.string(),
        'MEDIUM_BLOB': field => field.charset === 63 ? (field.buffer() === null ? [null] : [...field.buffer()]) : field.string(),
        'LONG_BLOB': field => field.charset === 63 ? (field.buffer() === null ? [null] : [...field.buffer()]) : field.string(),
        'BLOB': field => field.charset === 63 ? (field.buffer() === null ? [null] : [...field.buffer()]) : field.string()
    };
    
    const handler = typeHandlers[type];
    return handler ? handler(field) : next();
}