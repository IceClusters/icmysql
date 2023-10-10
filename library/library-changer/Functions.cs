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
                public static string Query = "exports['icmysql']:Query";
                public static string AwaitQuery = "exports['icmysql']:AwaitQuery";
                public static string Select = "exports['icmysql']:Select";
                public static string AwaitSelect = "exports['icmysql']:AwaitSelect";
                public static string Insert = "exports['icmysql']:Insert";
                public static string AwaitInsert = "exports['icmysql']:AwaitInsert";
                public static string Update = "exports['icmysql']:Update";
                public static string AwaitUpdate = "exports['icmysql']:AwaitUpdate";
                public static string Delete = "exports['icmysql']:Delete";
                public static string AwaitDelete = "exports['icmysql']:AwaitDelete";
                public static string Transaction = "exports['icmysql']:Transaction";
                public static string AwaitTransaction = "exports['icmysql']:AwaitTransaction";
                public static string Unique = "exports['icmysql']:Unique";
                public static string AwaitUnique = "exports['icmysql']:AwaitUnique";
                public static string Single = "exports['icmysql']:Single";
                public static string AwaitSingle = "exports['icmysql']:AwaitSingle";
                public static string MongoInsert = "exports['icmysql']:MongoInsert";
                public static string MongoFind = "exports['icmysql']:MongoFind";
                public static string MongoUpdate = "exports['icmysql']:MongoUpdate";
                public static string MongoCount = "exports['icmysql']:MongoCount";
                public static string MongoDelete = "exports['icmysql']:MongoDelete";
            }
        }
    }
}