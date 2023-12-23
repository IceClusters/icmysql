RegisterNetEvent("icmysql:client:openDebugUI")
AddEventHandler("icmysql:client:openDebugUI", function()
    SendNUIMessage({
        action = "open"
    })
    SetNuiFocus(true, true)
end)

RegisterNUICallback("closeDebugUI", function()
    SetNuiFocus(false, false)
end)

RegisterNUICallback("loadData", function(data)
    data = data.load
    if data == "cache" then
        TriggerServerEvent("icmysql:server:getquerycache")
    elseif data == "resources" then
        TriggerServerEvent("icmysql:server:getresources")
    elseif data == "logs" then
        TriggerServerEvent("icmysql:server:getlogs")
    elseif data == "backup" then
        TriggerServerEvent("icmysql:server:getbackup")
    elseif data == "dbs" then
        TriggerServerEvent("icmysql:server:getdbs")
    elseif data == "queries" then 
        TriggerServerEvent("icmysql:server:getQueries")
    end
end)

RegisterNetEvent("icmysql:client:getdbs")
AddEventHandler("icmysql:client:getdbs", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "dbs",
        data = data
    })
end)

RegisterNetEvent("icmysql:client:getQueries")
AddEventHandler("icmysql:client:getQueries", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "queries",
        data = data
    })
end)

RegisterNetEvent("icmysql:client:getquerycache")
AddEventHandler("icmysql:client:getquerycache", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "cache",
        data = data
    })
end)

RegisterNetEvent("icmysql:client:getResources")
AddEventHandler("icmysql:client:getResources", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "resources",
        data = data
    })
end)

RegisterNetEvent("icmysql:client:getlogs")
AddEventHandler("icmysql:client:getlogs", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "logs",
        data = data
    })
end)

RegisterNetEvent("icmysql:client:getbackup")
AddEventHandler("icmysql:client:getbackup", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "backup",
        data = data
    })
end)

RegisterNetEvent("icmysql:client:setInterceptor")
AddEventHandler("icmysql:client:setInterceptor", function(data)
    SendNUIMessage({
        action = "setInterceptor",
        data = data
    })
end)

RegisterNetEvent("icmysql:client:getQueryData")
AddEventHandler("icmysql:client:getQueryData", function(queryID, data)
    SendNUIMessage({
        action = "getQueryData",
        queryID = queryID,
        data = data
    })
end)

RegisterNUICallback("triggerServerEvent", function(data)
    TriggerServerEvent(data.event, data.data)
end)