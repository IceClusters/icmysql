const redis = require('redis');
const { Log, LogTypes } = require('../../utils/Logger.js');
const { performance } = require('perf_hooks');
const { ParseError } = require('../../errors/Parser.js');

const credentials = GetConvar("redisCredentials", "null");
var client = null;
var start = 0;

async function ConnectToRedis() {
    if (credentials === "null") return ParseError("Unknown Redis credentials. Please set the redisCredentials convar in your server.cfg file.");
    client = redis.createClient({
        url: credentials
    });
    start = performance.now();
    client.once('ready', () => {
        Log(LogTypes.Info, `^2Redis connected in ${performance.now() - start}ms^0`);
    });
    client.once('error', err => {
        Log(LogTypes.Error, `^3Can't connect to redis, ${err.message}^0`);
    });
    await client.connect();
}

setTimeout(async () => {
    try {
        await ConnectToRedis();
    } catch (err) { }
});


global.exports('RedisGet', async (key, callback) => {
    try {
        const data = await client.get(key);
        return callback ? callback(data) : data;
    } catch (err) {
        Log(LogTypes.Error, "Redis error while getting data: " + err.message);
    }
});

global.exports('RedisSet', async (key, value, callback) => {
    try {
        const result = await client.set(key, value);
        return callback ? callback(result) : result;
    } catch (err) {
        Log(LogTypes.Error, "Redis error while setting data: " + err.message);
    }
});

global.exports('RedisDel', async (key, callback) => {
    try {
        const result = await client.del(key);
        return callback ? callback(result) : result;
    } catch (err) {
        Log(LogTypes.Error, "Redis error while deleting data: " + err.message);
    }
});

global.exports('RedisExists', async (key, callback) => {
    try {
        const result = await client.exists(key);
        return callback ? callback(result) : result;
    } catch (err) {
        Log(LogTypes.Error, "Redis error while checking if data exists: " + err.message);
    }
});

global.exports('RedisExpire', async (key, seconds, callback) => {
    try {
        const result = await client.expire(key, seconds);
        return callback ? callback(result) : result;
    } catch (err) {
        Log(LogTypes.Error, "Redis error while setting expire time: " + err.message);
    }
});

global.exports('RedisUpdate', async (key, value, newData, callback) => {
    try {
        const result = await client.update(key, value, newData);
        return callback ? callback(result) : result;
    } catch (err) {
        Log(LogTypes.Error, "Redis error while updating data: " + err.message);
    }
});

global.exports('RedisFlush', async (callback) => {
    try {
        const result = await client.flush();
        return callback ? callback(result) : result;
    } catch (err) {
        Log(LogTypes.Error, "Redis error while flushing data: " + err.message);
    }
});

global.exports('RedisKeys', async (pattern, callback) => {
    try {
        const data = await client.keys(pattern);
        return callback ? callback(data) : data;
    } catch (err) {
        Log(LogTypes.Error, "Redis error while getting keys: " + err.message);
    }
});

global.exports('RedisMGet', async (keys, callback) => {
    try {
        const data = await client.mget(keys);
        return callback ? callback(data) : data;
    } catch (err) {
        Log(LogTypes.Error, "Redis error while getting multiple keys: " + err.message);
    }
});

global.exports("CloseRedis", () => {
    client.quit();
});

global.exports("OpenRedis", () => {
    client.connect();
});

global.exports("ReloadRedis", () => {
    client.quit();
    client.connect();
});