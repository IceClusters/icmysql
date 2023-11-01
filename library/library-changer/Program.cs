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
                    }
                }
            }
            else
            {
                Console.WriteLine("You need to specify the path of the resource folder.");
            }
        }

        static void HandleManifetst(string path)
        {
            string content = File.ReadAllText(path);
            content = content.Replace("@oxmysql/lib/MySQL", "@icmysql/library/MySQL");
            content = content.Replace("@mysql-async/lib/MySQL", "@icmysql/library/MySQL");
            content = content.Replace("@ghmattimysql/lib/MySQL", "@icmysql/library/MySQL");
            content = content.Replace("oxmysql", "icmysql");
            content = content.Replace("mysql-async", "icmysql");
            content = content.Replace("ghmattimysql", "icmysql");
            if (content.Contains("icmysql"))
            {
                string directoryName = Path.GetDirectoryName(path);
                string[] parts = directoryName.Split(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
                string resourceName = parts[parts.Length - 1];
                Console.WriteLine("Resource manifest of " + resourceName + " has been updated to use icmysql.");
                File.WriteAllText(path, content);
            }
        }
    }
}