RegisterNetEvent("ice_mysql:client:openDebugUI")
AddEventHandler("ice_mysql:client:openDebugUI", function()
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
        TriggerServerEvent("ice_mysql:server:getquerycache")
    elseif data == "resources" then
        TriggerServerEvent("ice_mysql:server:getresources")
    elseif data == "logs" then
        TriggerServerEvent("ice_mysql:server:getlogs")
    elseif data == "backup" then
        TriggerServerEvent("ice_mysql:server:getbackup")
    elseif data == "dbs" then
        TriggerServerEvent("ice_mysql:server:getdbs")
    elseif data == "queries" then 
        TriggerServerEvent("ice_mysql:server:getQueries")
    end
end)

RegisterNetEvent("ice_mysql:client:getdbs")
AddEventHandler("ice_mysql:client:getdbs", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "dbs",
        data = data
    })
end)

RegisterNetEvent("ice_mysql:client:getQueries")
AddEventHandler("ice_mysql:client:getQueries", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "queries",
        data = data
    })
end)

RegisterNetEvent("ice_mysql:client:getquerycache")
AddEventHandler("ice_mysql:client:getquerycache", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "cache",
        data = data
    })
end)

RegisterNetEvent("ice_mysql:client:getResources")
AddEventHandler("ice_mysql:client:getResources", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "resources",
        data = data
    })
end)

RegisterNetEvent("ice_mysql:client:getlogs")
AddEventHandler("ice_mysql:client:getlogs", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "logs",
        data = data
    })
end)

RegisterNetEvent("ice_mysql:client:getbackup")
AddEventHandler("ice_mysql:client:getbackup", function(data)
    SendNUIMessage({
        action = "loadData",
        info = "backup",
        data = data
    })
end)