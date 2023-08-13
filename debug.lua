RegisterNetEvent("ice_mysql:openDebugUI")
AddEventHandler("ice_mysql:openDebugUI", function()
    SendNUIMessage({
        action = "open"
    })
    SetNuiFocus(true, true)
end)

RegisterNUICallback("closeDebugUI", function()
    SetNuiFocus(false, false)
end)