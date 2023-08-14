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
    if data == "query" then
        TriggerServerEvent("ice_mysql:server:getquerycache")
    elseif data == "resources" then
        TriggerServerEvent("ice_mysql:server:getresources")
    elseif data == "errors" then
        TriggerServerEvent("ice_mysql:server:geterrors")
    elseif data == "backup" then
        TriggerServerEvent("ice_mysql:server:getbackup")
    end
end)

RegisterNetEvent("ice_mysql:client:getquerycache")
AddEventHandler("ice_mysql:client:getquerycache", function(data)

end)

RegisterNetEvent("ice_mysql:client:getresources")
AddEventHandler("ice_mysql:client:getresources", function(data)

end)

RegisterNetEvent("ice_mysql:client:geterrors")
AddEventHandler("ice_mysql:client:geterrors", function(data)

end)

RegisterNetEvent("ice_mysql:client:getbackup")
AddEventHandler("ice_mysql:client:getbackup", function(data)

end)