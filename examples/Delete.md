# Delete
The insert function is to insert data in the specified table of the database.

## Params
- Database ID (OPTIONAL) is to specify for what database is the query to. By default it take DB#1 you can change the default DB in the config.js.
- Query(*) the query to execute.
- Values(OPTIONAL) the values that will be replaced in the query, these are ?, @, :, etc.
- Function(OPTIONAL) is the function that will be executed when the query is finished.
- Cache(OPTIONAL) is to specify if the query want to use the cache system, by default is activated this only may be disabled if there're problems with the cache system.

## Return
If you've specified a function it will return the result of the query in the function, if not it will return the result of the query.

## Functions
```lua
exports["icmysql"]:Delete(database, query, values, function, cache)
```
```lua
exports["icmysql"]:AwaitDelete(database, query, values, function, cache)
```
```lua
MySQL.Delete(database, query, values, function, cache)
```
```lua
MySQL.AwaitDelete(database, query, values, function, cache)
```

## Use
### Awaitable
#### LUA
```lua
local result = MySQL.AwaitDelete(1, "DELETE FROM players WHERE name=@name", {
    ["@name"] = "Daniel"
})
```
#### JS
```js
const result = await MySQL.AwaitDelete(1, "DELETE FROM players WHERE name=@name", [
    ["@name"] = "Daniel",
])
```
#### C#
```cs
var result = await MySQL.AwaitDelete(1, "DELETE FROM players WHERE name=@name", new Dictionary<string, object>() {
    ["@name"] = "Daniel",
})
```

### Callback
- Callback will return the same as the awaitable function but in the callback function.
- If the callback is not provided it will return the same as the awaitable function.
- If you want to make the query to execute in the main thread you have to specify a simple function like this: `() => {}` to do anything depending on the language.
#### LUA
```lua
MySQL.Delete(1, "DELETE FROM players WHERE name=@name", {
    ["@name"] = "Daniel",
}, function(result)
    print(result)
end)
```
#### JS
```js
await MySQL.Delete(1, "DELETE FROM players WHERE name=@name", [
    ["@name"] = "Daniel",
], (result) => {
    console.log(result)
})
```
#### C#
```cs
MySQL.Delete(1, "DELETE FROM players WHERE name=@name", new Dictionary<string, object>() {
    ["@name"] = "Daniel",
}, (result) => {
    Console.WriteLine(result)
})
```