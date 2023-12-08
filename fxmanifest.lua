fx_version 'cerulean'
game 'common'

author 'Ice Cluster'
description 'Advanced database system for FiveM with MySQL, ORM, Mongo and Redis support.'
version '3.0.0'

client_scripts {
    'debug.lua'
}

server_scripts {
    'config.js',
    'server/main.lua',
    'dist/build.js'
}

ui_page 'debug/index.html'
files {
    'debug/*.html',
    'debug/js/*.js',
    'debug/styles/*.css',
    'debug/assets/*.*'
}

convar_category 'IcMySQL' {
	'IcMySQL Configuration',
	{
		{ 'Connection String', 'mysql_connection_string', 'CV_STRING', 'mysql://user:password@localhost/database' },
		{ 'Debug', 'mysql_debug', 'CV_BOOL', 'false' }
	}
}

provide 'ghmattimysql'
provide 'mysql-async'
provide 'oxmysql'