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

        public static string[] ignoreResources = new string[]
        {
            "icmysql"
        };

        static void Main(string[] args)
        {
            if (args.Length > 0)
            {
                ParseResourcesFolder(args[0]);
            }
            else
            {
                string currentPath = Environment.CurrentDirectory;
                bool resourceFolderFound = false;
                try
                {
                    while (!resourceFolderFound)
                    {
                        string[] directories = Directory.GetDirectories(currentPath);
                        foreach (string directory in directories)
                        {
                            string[] parts = directory.Split(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
                            string folderName = parts[parts.Length - 1];
                            if (folderName == "resources")
                            {
                                resourceFolderFound = true;
                                Console.WriteLine("Resource folder found at " + directory);
                                ParseResourcesFolder(directory);
                                break;
                            }
                        }
                        if (!resourceFolderFound)
                        {
                            currentPath = Path.GetDirectoryName(currentPath);
                        }
                    }
                } catch(Exception err)
                {
                    Console.WriteLine("Couldn't find resources folder. Please insert the path manually by passing the path as a param to the exe, example: library-changer.exe C:\\FiveM\\Servers\\MyServer\\resources");
                }
            }
        }

        static void ParseResourcesFolder(string path)
        {
            bool isRooted = Path.IsPathRooted(path);
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
            IEnumerable<string> Files = Directory.EnumerateFiles(path, "*", SearchOption.AllDirectories);
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
                foreach (string resource in ignoreResources)
                {
                    if (file.Contains(resource))
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