RegisterNetEvent("ice_mysql:getDebugInfo")
AddEventHandler("ice_mysql:getDebugInfo", function(data, isDebugMode)
    if not isDebugMode then return print("Debug mode is disabled, please type: set mysqlDebugUI 1    in server.cfg") end
    SendNUIMessage({
        action = "open"
    })
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "updateData",
        data = data
    })
end)

RegisterNUICallback("close", function()
    SetNuiFocus(false, false)
end)

RegisterCommand("mysql", function()
    TriggerServerEvent("ice_mysql:getQueryLogs")
end)