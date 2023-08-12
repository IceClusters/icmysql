# Insert
The insert function is to insert data in the specified table of the database.

## Params
- Database ID (OPTIONAL) is to specify for what database is the query to. By default it take DB#1 you can change the default DB in the config.js.
- Query(*) the query to execute.
- Values(OPTIONAL) the values that will be replaced in the query, these are ?, @, :, etc.
- Function(OPTIONAL) is the function that will be executed when the query is finished.
- Cache(OPTIONAL) is to specify if the query want to use the cache system, by default is activated this only may be disabled if there're problems with the cache system.

## Return
If you've specified a function it will return the result of the query in the function, if not it will return the result of the query.
In this case it will return the insert id of the query.

## Functions
```lua
exports["ice_mysql"]:Insert(database, query, values, function, cache)
```
```lua
exports["ice_mysql"]:AwaitInsert(database, query, values, function, cache)
```
```lua
MySQL.Insert(database, query, values, function, cache)
```
```lua
MySQL.AwaitInsert(database, query, values, function, cache)
```

## Use
### Awaitable
#### LUA
```lua
local result = MySQL.AwaitInsert(1, "INSERT INTO `players` (`name`, `age`) VALUES (@name, @age)", {
    ["@name"] = "John",
    ["@age"] = 18
})
```
#### JS
```js
const result = await MySQL.AwaitInsert(1, "INSERT INTO `players` (`name`, `age`) VALUES (@name, @age)", [
    ["@name"] = "John",
    ["@age"] = 18
])
```
#### C#
```cs
var result = await MySQL.AwaitInsert(1, "INSERT INTO `players` (`name`, `age`) VALUES (@name, @age)", new Dictionary<string, object>() {
    ["@name"] = "John",
    ["@age"] = 18
})
```

### Callback
- Callback will return the same as the awaitable function but in the callback function.
- If the callback is not provided it will return the same as the awaitable function.
- If you want to make the query to execute in the main thread you have to specify a simple function like this: `() => {}` to do anything depending on the language.
#### LUA
```lua
MySQL.Insert(1, "INSERT INTO `players` (`name`, `age`) VALUES (@name, @age)", {
    ["@name"] = "John",
    ["@age"] = 18
}, function(result)
    print(result)
end)
```
#### JS
```js
await MySQL.Insert(1, "INSERT INTO `players` (`name`, `age`) VALUES (@name, @age)", [
    ["@name"] = "John",
    ["@age"] = 18
], (result) => {
    console.log(result)
})
```
#### C#
```cs
MySQL.Insert(1, "INSERT INTO `players` (`name`, `age`) VALUES (@name, @age)", new Dictionary<string, object>() {
    ["@name"] = "John",
    ["@age"] = 18
}, (result) => {
    Console.WriteLine(result)
})
```