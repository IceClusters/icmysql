# ICE_MYSQL
## [DISCORD](https://discord.gg/3DhEgXAX2U)

### CFG
You can specify several databases to be able to query the desired database simply with the identifier.
The minimum number of databases to specify is one.
The number that accompanies "mysqlCredentials_" is the identifier of the database and has to go in ascending order, for example: mysqlCredentials_1, mysqlCredentials_2, mysqlCredentials_3, mysqlCredentials_4. 
If not specified in this order the script will not find any database.
```cfg
set mysqlCredentials_1 "host=127.0.0.1; user=root; password=; dbName=ice_server; port=3306"
set mysqlCredentials_2 "host=127.0.0.1; user=root; password=; dbName=ice_server_2; port=3306"
```


### BENCHMARK
#### Internal benchmark
```
Low: 0.0783ms | Avg: 0.1029032ms | Total: 1029.073ms (10000 queries)
```

#### Round-trip-time for exports
```
Low: 0.1207ms | Avg: 0.1751822ms | Total: 1751.822ms (10000 queries)
```
**Ice_mysql** completes 10,000 queries in approximately 1751.822 ms, while **ox_mysql** takes around 2589.8800 ms to perform the same number of queries. This represents a **performance improvement of 32%**, meaning that **ice_mysql** is significantly faster compared to 'ox_mysql'."

The performance data for **ox_mysql** has been obtained from its official documentation, while the performance of **ice_mysql** has been independently tested. It is important to note that the results for **ice_mysql** are based on our own measurements, and although we have taken every effort to ensure accuracy, we cannot guarantee these results. We have relied on the results obtained and the documentation of **ox_mysql** to make a comparison.

### DEBUG MODE
Ice_mysql has an integrated system to be able to debug all the queries made by a script, and all the queries received by a database, all this information is grouped in a panel that includes 2 pages, the first is to search for a script and be able to see all the queries made and more information, the second page is to see a list of all the databases used by the scripts, information, and all the queries made to that database. To activate this system you simply have to write ```set mysqlDebugUI 1``` in the server.cfg, once the debug mode is activated you can write the command /mysql which will open the panel.
![](https://media.discordapp.net/attachments/939266646571356161/1127656692386107482/image.png?width=1363&height=499)
![](https://media.discordapp.net/attachments/939266646571356161/1127928821199425546/image.png?width=1078&height=396)
![](https://media.discordapp.net/attachments/939266646571356161/1127929537074823299/image.png?width=417&height=317)

### EXPORT FUNCTION
```lua
exports["ice_mysql"]:MakeQuery(db_id, query);
```
##### PARAMS
db_id = the identifier of the database, is the number that is in the server.cfg credentials. (optional) Default db_id is 1.
query = is the query that you want to execute in the db


### CODE EXAMPLES
#### SYNC FUNCTIONS
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


#### ASYNC FUNCTIONS
##### SELECT(Sync)
```lua
Citizen.CreateThread(function()
    exports["ice_mysql"]:AsyncMakeQuery(1, "SELECT * FROM players WHERE ID=2", function(result)
		print(json.encode(result))
	end)
end)

-- or without db_id

Citizen.CreateThread(function()
	exports["ice_mysql"]:AsyncMakeQuery("SELECT * FROM players WHERE ID=2", function(result)
		print(json.encode(result))
	end)
end)
```

##### UPDATE(Sync)
```lua
Citizen.CreateThread(function()
	exports["ice_mysql"]:AsyncMakeQuery(1, "UPDATE players SET ID=4 WHERE ID=5", function(result)
		print("Update data: "..json.encode(result))
	end)
end)
```
