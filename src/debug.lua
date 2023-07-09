RegisterNetEvent("ice_mysql:getDebugInfo")
AddEventHandler("ice_mysql:getDebugInfo", function(data)
    SendNUIMessage({
        action = "updateData",
        data = data
    })
end)

RegisterCommand("mysql", function()
    TriggerServerEvent("ice_mysql:getQueryLogs")
    SendNUIMessage({
        action = "open"
    })
    SetNuiFocus(true, true)
end)

Citizen.CreateThread(function()
    
end)