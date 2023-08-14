using library_changer;
using System;
using System.IO;
using System.Text.RegularExpressions;

namespace LibChanger
{
    class Program
    {
        public static String[] ignoreFiles = new string[]
        {
            "node_modules",
            ".dll",
            ".exe"
        };

        public static string[] handledExtensions = new string[]
        {
            ".lua", ".js", ".cs"
        };

        public static string[] ignoreExtensions = new string[]
        {
            "csproj"
        };

        static void Main(string[] args)
        {
            if (args.Length > 0)
            {
                bool isRooted = Path.IsPathRooted(args[0]);
                if (!isRooted)
                {
                    Console.WriteLine("You have inserted a bad path");
                    return;
                }
                Console.WriteLine("¿Have you maded a resources backup? (Y/N): ");
                char respuesta = Console.ReadKey().KeyChar;
                bool canContinue = false;
                if (respuesta == 'Y' || respuesta == 'y')
                {
                    canContinue = true;
                    Console.WriteLine("\nConverting functions...");
                }
                else if (respuesta == 'N' || respuesta == 'n')
                {
                    Console.WriteLine("\nPlease first make a backup of your resources folder and then try this tool.");
                }
                if (!canContinue) return;
                IEnumerable<string> Files = Directory.EnumerateFiles(args[0], "*", SearchOption.AllDirectories);
                foreach (string file in Files)
                {
                    bool ignore = false;
                    foreach (string keyword in ignoreFiles)
                    {
                        if (file.Contains(keyword))
                        {
                            ignore = true;
                            break;
                        }
                    }
                    bool handled = false;
                    foreach (string extension in handledExtensions)
                    {
                        if (file.Contains(extension)) { handled = true; break; }
                    }
                    foreach (string extension in ignoreExtensions)
                    {
                        if (file.Contains(extension))
                        {
                            ignore = true;
                            break;
                        }
                    }
                    if (handled && !ignore)
                    {
                        if (file.Contains("fxmanifest.lua"))
                            HandleManifetst(file);
                        else
                            HandleFile(file);
                    }
                }
            }
            else
            {
                Console.WriteLine("You need to specify the path of the resource folder.");
            }
        }

        static void HandleFile(string path)
        {
            if (path.Contains("oxmysql") || path.Contains("ice_mysql") || path.Contains("mysql-async") || path.Contains("ghmattimysql")) return;
            string content = File.ReadAllText(path);
            Console.WriteLine(path);
            if (content.Contains("oxmysql") || content.Contains("ghmattimysql") || content.Contains("mysql-async") || content.Contains("MySQL") || content.Contains("mongo"))
            {
                var replacements = new (string pattern, string replacement)[]
                {
                    ("MySQL.insert.await|MySQL.Sync.insert|exports.oxmysql.insert_async|exports.oxmysql:insert_async|exports\\['oxmysql'\\].insert_async|exports\\['oxmysql'\\]:insert_async|exports\\[\"oxmysql\"\\].insert_async|exports\\[\"oxmysql\"\\]:insert_async", Functions.Queries.Exports.AwaitInsert),
                    ("MySQL.insert|MySQL.insert|exports.oxmysql.insert|exports.oxmysql:insert|exports\\['oxmysql'\\].insert|exports\\['oxmysql'\\]:insert|exports\\[\"oxmysql\"\\].insert|exports\\[\"oxmysql\"\\]:insert", Functions.Queries.Exports.Insert),
                    ("MySQL.prepare.await|MySQL.Sync.prepare|exports.oxmysql.prepare_async|exports.oxmysql:prepare_async|exports\\['oxmysql'\\].prepare_async|exports\\['oxmysql'\\]:prepare_async|exports\\[\"oxmysql\"\\].prepare_async|exports\\[\"oxmysql\"\\]:prepare_async", Functions.Queries.Exports.AwaitSelect),
                    ("MySQL.prepare|exports.oxmysql.prepare|exports.oxmysql:prepare|exports\\['oxmysql'\\].prepare|exports\\['oxmysql'\\]:prepare|exports\\[\"oxmysql\"\\].prepare|exports\\[\"oxmysql\"\\]:prepare", Functions.Queries.Exports.Select),
                    ("MySQL.query.await|MySQL.Sync.fetchAll|exports.oxmysql.query_async|exports.oxmysql:query_async|exports\\['oxmysql'\\].query_async|exports\\['oxmysql'\\]:query_async|exports\\[\"oxmysql\"\\].query_async|exports\\[\"oxmysql\"\\]:query_async", Functions.Queries.Exports.AwaitQuery),
                    ("MySQL.query|MySQL.Async.fetchAll|exports.oxmysql.query|exports.oxmysql:query|exports\\['oxmysql'\\].query|exports\\['oxmysql'\\]:query|exports\\[\"oxmysql\"\\].query|exports\\[\"oxmysql\"\\]:query", Functions.Queries.Exports.Query),
                    ("MySQL.update.await|MySQL.Sync.execute|exports.oxmysql.update_async|exports.oxmysql:update_async|exports\\['oxmysql'\\].update_async|exports\\['oxmysql'\\]:update_async|exports\\[\"oxmysql\"\\].update_async|exports\\[\"oxmysql\"\\]:update_async", Functions.Queries.Exports.AwaitUpdate),
                    ("MySQL.update|MySQL.Async.execute|exports.oxmysql.update|exports.oxmysql:update|exports\\['oxmysql'\\].update|exports\\['oxmysql'\\]:update|exports\\[\"oxmysql\"\\].update|exports\\[\"oxmysql\"\\]:update", Functions.Queries.Exports.Update),
                    ("MySQL.insert.await|MySQL.Sync.insert|exports.oxmysql.insert_async|exports.oxmysql:insert_async|exports\\['oxmysql'\\].insert_async|exports\\['oxmysql'\\]:insert_async|exports\\[\"oxmysql\"\\].insert_async|exports\\[\"oxmysql\"\\]:insert_async", Functions.Queries.Exports.AwaitInsert),
                    ("MySQL.insert|MySQL.Async.insert|exports.oxmysql.insert|exports.oxmysql:insert|exports\\['oxmysql'\\].insert|exports\\['oxmysql'\\]:insert|exports\\[\"oxmysql\"\\].insert|exports\\[\"oxmysql\"\\]:insert", Functions.Queries.Exports.Insert),
                    ("MySQL.scalar.await|MySQL.Sync.fetchScalar|exports.oxmysql.scalar_async|exports.oxmysql:scalar_async|exports\\['oxmysql'\\].scalar_async|exports\\['oxmysql'\\]:scalar_async|exports\\[\"oxmysql\"\\].scalar_async|exports\\[\"oxmysql\"\\]:scalar_async", Functions.Queries.Exports.AwaitUnique),
                    ("MySQL.scalar|MySQL.fetchScalar|exports.oxmysql.scalar|exports.oxmysql:scalar|exports\\['oxmysql'\\].scalar|exports\\['oxmysql'\\]:scalar|exports\\[\"oxmysql\"\\].scalar|exports\\[\"oxmysql\"\\]:scalar", Functions.Queries.Exports.Unique),
                    ("MySQL.transaction.await|MySQL.Sync.transaction|exports.oxmysql.transaction_async|exports.oxmysql:transaction_async|exports\\['oxmysql'\\].transaction_async|exports\\['oxmysql'\\]:transaction_async|exports\\[\"oxmysql\"\\].transaction_async|exports\\[\"oxmysql\"\\]:transaction_async", Functions.Queries.Exports.AwaitTransaction),
                    ("MySQL.transaction|MySQL.Async.transaction|exports.oxmysql.transaction|exports.oxmysql:transaction|exports\\['oxmysql'\\].transaction|exports\\['oxmysql'\\]:transaction|exports\\[\"oxmysql\"\\].transaction|exports\\[\"oxmysql\"\\]:transaction", Functions.Queries.Exports.Transaction),
                    ("MySQL.single.await|exports.oxmysql.single_async|exports.oxmysql:single_async|exports\\['oxmysql'\\].single_async|exports\\['oxmysql'\\]:single_async|exports\\[\"oxmysql\"\\].single_async|exports\\[\"oxmysql\"\\]:single_async", Functions.Queries.Exports.AwaitSingle),
                    ("MySQL.single|exports.oxmysql.single|exports.oxmysql:single|exports\\['oxmysql'\\].single|exports\\['oxmysql'\\]:single|exports\\[\"oxmysql\"\\].single|exports\\[\"oxmysql\"\\]:single", Functions.Queries.Exports.Single),
                    ("MySQL.rawExecute.await|exports.oxmysql.rawExecute_async|exports.oxmysql:rawExecute_async|exports\\['oxmysql'\\].rawExecute_async|exports\\['oxmysql'\\]:rawExecute_async|exports\\[\"oxmysql\"\\].rawExecute_async|exports\\[\"oxmysql\"\\]:rawExecute_async", Functions.Queries.Exports.AwaitQuery),
                    ("MySQL.rawExecute|exports.oxmysql.rawExecute|exports.oxmysql:rawExecute|exports\\['oxmysql'\\].rawExecute|exports\\['oxmysql'\\]:rawExecute|exports\\[\"oxmysql\"\\].rawExecute|exports\\[\"oxmysql\"\\]:rawExecute", Functions.Queries.Exports.Query),
                    ("exports.mongodb.insert|exports.mongodb.insertOne", Functions.Queries.MongoInsert),
                    ("exports.mongodb.find|exports.mongodb.findOne", Functions.Queries.MongoFind),
                    ("exports.mongodb.update|exports.mongodb.updateOne", Functions.Queries.MongoUpdate),
                    ("exports.mongodb.count|exports.mongodb.countOne", Functions.Queries.MongoCount),
                    ("exports.mongodb.delete|exports.mongodb.deleteOne", Functions.Queries.MongoDelete),
                };

                foreach (var (pattern, replacement) in replacements)
                {
                    content = Regex.Replace(content, pattern, replacement);
                }
                File.WriteAllText(path, content);
            }
        }

        static void HandleManifetst(string path)
        {
            string content = File.ReadAllText(path);
            content = content.Replace("@oxmysql/lib/MySQL", "@ice_mysql/library/MySQL");
            content = content.Replace("@mysql-async/lib/MySQL", "@ice_mysql/library/MySQL");
            content = content.Replace("@ghmattimysql/lib/MySQL", "@ice_mysql/library/MySQL");
            if (content.Contains("ice_mysql"))
            {
                string directoryName = Path.GetDirectoryName(path);
                string[] parts = directoryName.Split(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
                string resourceName = parts[parts.Length - 1];
                Console.WriteLine("Resource manifest of " + resourceName + " has been updated to use ice_mysql.");
                File.WriteAllText(path, content);
            }
        }
    }
}