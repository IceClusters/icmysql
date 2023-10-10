fx_version "adamant"
games {"gta5"}

description "vRP icmysql db driver bridge"

dependencies{
  "vrp",
  "icmysql"
}

-- server scripts
server_scripts{ 
  "@vrp/lib/utils.lua",
  "init.lua"
}
