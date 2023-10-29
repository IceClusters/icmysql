fx_version 'cerulean'
games {'gta5'}

author 'Ice Cluster'
description 'Advanced database system for FiveM'
version '1.0.0'

client_scripts {
    'debug.lua'
}

server_scripts {
    'config.js',
    'src/server/main.lua',
    'dist/build.js'
}

ui_page 'debug/index.html'
files {
    'debug/*.html',
    'debug/js/*.js',
    'debug/styles/*.css',
    'debug/assets/*.*'
}
