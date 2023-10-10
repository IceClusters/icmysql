fx_version 'cerulean'
game 'gta5'

author 'DanielGP'
description 'Script that manage all connections and querys to the database.'
version '1.0.0'
is_release 'yes'

client_scripts {
    'debug.lua'
}

server_scripts {
    'config.js',
    'src/server/main.lua',
    'dist/build.js'
}

ui_page 'src/debug/index.html'
files {
    'src/debug/*.html',
    'src/debug/js/*.js',
    'src/debug/styles/*.css',
    'src/debug/assets/*.*'
}