using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace library_changer
{
    public static class Functions
    {

        public static class Queries
        {
            public static string Query = "MySQL.Query";
            public static string AwaitQuery = "MySQL.AwaitQuery";
            public static string Select = "MySQL.Select";
            public static string AwaitSelect = "MySQL.AwaitSelect";
            public static string Insert = "MySQL.Insert";
            public static string AwaitInsert = "MySQL.AwaitInsert";
            public static string Update = "MySQL.Update";
            public static string AwaitUpdate = "MySQL.AwaitUpdate";
            public static string Delete = "MySQL.Delete";
            public static string AwaitDelete = "MySQL.AwaitDelete";
            public static string Transaction = "MySQL.Transaction";
            public static string AwaitTransaction = "MySQL.AwaitTransaction";
            public static string Unique = "MySQL.Unique";
            public static string AwaitUnique = "MySQL.AwaitUnique";
            public static string Single = "MySQL.Single";
            public static string AwaitSingle = "MySQL.AwaitSingle";
            public static string MongoInsert = "Mongo.MongoInsert";
            public static string MongoFind = "Mongo.MongoFind";
            public static string MongoUpdate = "Mongo.MongoUpdate";
            public static string MongoCount = "Mongo.MongoCount";
            public static string MongoDelete = "Mongo.MongoDelete";
            public static class Exports
            {
                public static string Query = "exports['ice_mysql']:Query";
                public static string AwaitQuery = "exports['ice_mysql']:AwaitQuery";
                public static string Select = "exports['ice_mysql']:Select";
                public static string AwaitSelect = "exports['ice_mysql']:AwaitSelect";
                public static string Insert = "exports['ice_mysql']:Insert";
                public static string AwaitInsert = "exports['ice_mysql']:AwaitInsert";
                public static string Update = "exports['ice_mysql']:Update";
                public static string AwaitUpdate = "exports['ice_mysql']:AwaitUpdate";
                public static string Delete = "exports['ice_mysql']:Delete";
                public static string AwaitDelete = "exports['ice_mysql']:AwaitDelete";
                public static string Transaction = "exports['ice_mysql']:Transaction";
                public static string AwaitTransaction = "exports['ice_mysql']:AwaitTransaction";
                public static string Unique = "exports['ice_mysql']:Unique";
                public static string AwaitUnique = "exports['ice_mysql']:AwaitUnique";
                public static string Single = "exports['ice_mysql']:Single";
                public static string AwaitSingle = "exports['ice_mysql']:AwaitSingle";
                public static string MongoInsert = "exports['ice_mysql']:MongoInsert";
                public static string MongoFind = "exports['ice_mysql']:MongoFind";
                public static string MongoUpdate = "exports['ice_mysql']:MongoUpdate";
                public static string MongoCount = "exports['ice_mysql']:MongoCount";
                public static string MongoDelete = "exports['ice_mysql']:MongoDelete";
            }
        }
    }
}