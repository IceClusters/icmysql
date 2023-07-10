fx_version 'cerulean'
game 'gta5'

author 'DanielGP'
description 'Script that manage all connections and querys to the database.'
version '1.0.0'

shared_script 'config.js'
server_script 'src/server.js'
client_script 'src/debug.lua'

files {
    'ui/js/*.js',
    'ui/index.html',
    'ui/assets/css/*.css',
    'ui/assets/js/*.js',
    'ui/assets/plugins/global/*.css',
    'ui/assets/plugins/global/*.js',
    'ui/assets/*.css',
}

ui_page 'ui/index.html'