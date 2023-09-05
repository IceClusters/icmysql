local DBDriver = class("icmysql", vRP.DBDriver)

-- STATIC

local function blob2string(blob)
  local data = {}
  for index,byte in ipairs(blob) do
    table.insert(data, string.char(byte))
  end

  return table.concat(data)
end

-- METHODS

function DBDriver:onInit(cfg)
  self.queries = {}
  self.API = exports["icmysql"]
  return self.API ~= nil
end

function DBDriver:onPrepare(name, query)
  self.queries[name] = query
end

function DBDriver:onQuery(name, params, mode)
  local query = self.queries[name]

  local r = async()

  if mode == "execute" then
    self.API:Raw(query, params, function (affectedRows)
      r(affectedRows or 0)
    end)
  elseif mode == "scalar" then
    self.API:Scalar(query, params, function (result)
      r(result)
    end)
  else
    self.API:Query(query, params, function (result)
      -- last insert id backwards compatibility
      if query:find(";.-SELECT.+LAST_INSERT_ID%(%)") then
        r({ { id = result[1].insertId } }, result[1].affectedRows)
      end
  
      for _,row in pairs(result) do
        for k,v in pairs(row) do
          if type(v) == "table" then
            row[k] = blob2string(v)
          end
        end
      end
  
      r(result, #result)
    end)
  end

  return r:wait()
end

async(function()
  vRP:registerDBDriver(DBDriver)
end)
