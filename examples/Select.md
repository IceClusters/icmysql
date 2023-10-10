# Select
The insert function is to insert data in the specified table of the database.

## Params
- Database ID (OPTIONAL) is to specify for what database is the query to. By default it take DB#1 you can change the default DB in the config.js.
- Query(*) the query to execute.
- Values(OPTIONAL) the values that will be replaced in the query, these are ?, @, :, etc.
- Function(OPTIONAL) is the function that will be executed when the query is finished.
- Cache(OPTIONAL) is to specify if the query want to use the cache system, by default is activated this only may be disabled if there're problems with the cache system.

## Return
If you've specified a function it will return the result of the query in the function, if not it will return the result of the query.
In this case it will return the match data.

## Functions
```lua
exports["icmysql"]:Select(database, query, values, function, cache)
```
```lua
exports["icmysql"]:AwaitSelect(database, query, values, function, cache)
```
```lua
MySQL.Select(database, query, values, function, cache)
```
```lua
MySQL.AwaitSelect(database, query, values, function, cache)
```

## Use
### Awaitable
#### LUA
```lua
local result = MySQL.AwaitSelect(1, "SELECT name FROM players WHERE id=@id", {
    ["@id"] = 3
})
```
#### JS
```js
const result = await MySQL.AwaitSelect(1, "SELECT name FROM players WHERE id=@id", [
    ["@id"] = 3
])
```
#### C#
```cs
var result = await MySQL.AwaitSelect(1, "SELECT name FROM players WHERE id=@id", new Dictionary<string, object>() {
    ["@id"] = 3
})
```

### Callback
- Callback will return the same as the awaitable function but in the callback function.
- If the callback is not provided it will return the same as the awaitable function.
- If you want to make the query to execute in the main thread you have to specify a simple function like this: `() => {}` to do anything depending on the language.
#### LUA
```lua
MySQL.Select(1, "SELECT name FROM players WHERE id=@id", {
    ["@id"] = 3
}, function(result)
    print(result)
end)
```
#### JS
```js
await MySQL.Select(1, "SELECT name FROM players WHERE id=@id", [
    ["@id"] = 3
], (result) => {
    console.log(result)
})
```
#### C#
```cs
MySQL.Select(1, "SELECT name FROM players WHERE id=@id", new Dictionary<string, object>() {
    ["@id"] = 3
}, (result) => {
    Console.WriteLine(result)
})
```