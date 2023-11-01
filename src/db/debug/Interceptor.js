const { CheckPermission } = require("./Debug.js")
let interceptor = false;
let queue = [];
let interceptorSuscribers = [];

function SetInterceptor(value) {
    interceptor = typeof value === "boolean" ? value : false;
}

function ForwardQuery(queryId, result) {
    if(!interceptor || !queue[queryId]) return;
    queue[queryId].canfollow = true;
    queue[queryId].result = result;
}

function DropQuery(queryId) {
    if(!interceptor || !queue[queryId]) return;
    queue[queryId].canfollow = -1;
    queue[queryId].result = null;
}

async function Middleware(result, data) {
    if(!interceptor) return result;
    const randomId = Math.floor(Math.random() * 100000);
    const queryId = `${data.time}-${randomId}`;
    queue[queryId] = { result: result, data: data, canfollow: false };
    for(let i = 0; i < interceptorSuscribers.length; i++) {
        TriggerClientEvent("icmysql:client:getQueryData", interceptorSuscribers[i], queryId, data);
    }
    
    while(queue[queryId].canfollow === false) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    result = queue[queryId].result;
    delete queue[queryId];
    return result;
}

RegisterNetEvent("icmysql:server:forwardQuery");
AddEventHandler("icmysql:server:forwardQuery", async function (queryID, result) {
    const src = source;
    if (!CheckPermission(src)) return;
    if(!queryID) return;
    ForwardQuery(queryID, result);
});

RegisterNetEvent("icmysql:server:dropQuery");
AddEventHandler("icmysql:server:dropQuery", async function (queryID) {
    const src = source;
    if (!CheckPermission(src)) return;
    if(!queryID) return;
    DropQuery(queryID);
});

RegisterNetEvent("icmysql:server:setInterceptor");
AddEventHandler("icmysql:server:setInterceptor", async function (value) {
    const src = source;
    if (!CheckPermission(src)) return;
    SetInterceptor(value);
});

RegisterNetEvent("icmysql:server:subscribeInterceptor");
AddEventHandler("icmysql:server:subscribeInterceptor", async function () {
    const src = source;
    if (!CheckPermission(src)) return;
    interceptorSuscribers.push(src);
});

RegisterNetEvent("icmysql:server:unsubscribeInterceptor");
AddEventHandler("icmysql:server:unsubscribeInterceptor", async function () {
    const src = source;
    if (!CheckPermission(src)) return;
    const index = interceptorSuscribers.indexOf(src);
    if(index > -1) {
        interceptorSuscribers.splice(index, 1);
    }
});

module.exports = { Middleware }