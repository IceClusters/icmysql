# ICE_MYSQL

### CFG
You can specify several databases to be able to query the desired database simply with the identifier.
The minimum number of databases to specify is one.
The number that accompanies "mysqlCredentials_" is the identifier of the database and has to go in ascending order, for example: mysqlCredentials_1, mysqlCredentials_2, mysqlCredentials_3, mysqlCredentials_4. 
If not specified in this order the script will not find any database.
```cfg
set mysqlCredentials_1 "host=127.0.0.1; user=root; password=; dbName=ice_server; port=3306"
set mysqlCredentials_2 "host=127.0.0.1; user=root; password=; dbName=ice_server_2; port=3306"
```

### EXPORT FUNCTION
```lua
exports["ice_mysql"]:MakeQuery(db_id, query);
```
##### PARAMS
db_id = the identifier of the database, is the number that is in the server.cfg credentials. (optional) Default db_id is 1.
query = is the query that you want to execute in the db


### CODE EXAMPLES
##### SELECT
```lua
Citizen.CreateThread(function()
    local result = exports["ice_mysql"]:MakeQuery(1, "SELECT * FROM players WHERE ID=2")
    print(json.encode(result))
end)

-- or without db_id

Citizen.CreateThread(function()
    local result = exports["ice_mysql"]:MakeQuery("SELECT * FROM players WHERE ID=2")
    print(json.encode(result))
end)
```

##### UPDATE
```lua
Citizen.CreateThread(function()
    exports["ice_mysql"]:MakeQuery(1, "UPDATE players SET ID=4 WHERE ID=5")
end)
```

### Example Code
