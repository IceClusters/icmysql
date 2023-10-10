Citizen.CreateThread(function()
    -- To check if the script is compiled or not to avoid people asking for support with a non-compiled version
    local exist = LoadResourceFile(GetCurrentResourceName(), "dist/metabuild.js") ~= nil
    if not exist then
        print("^0[^3WARN^0] ^1You are using a non-compiled version of ICMySQL. The script will not work, please download the latest release: ^5https://github.com/IceClusters/icmysql/releases/latest^0")
        return
    end
end)