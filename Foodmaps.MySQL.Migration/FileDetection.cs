using Dapper;
using Foodmaps.MySQL;
using System;
using System.IO;
using System.Linq;

namespace Agrega.MySQL.Migration
{
    public interface IFileDetection
    {
        void Start(string dir);
    }

    public class FileDetection : IFileDetection
    {
        private IConnectionOptions connection;

        public FileDetection(IConnectionOptions connection)
        {
            this.connection = connection;
        }

        public void Start(string baseDirectory)
        {
            var files = Directory.GetFiles(baseDirectory, "*.sql", SearchOption.AllDirectories).OrderBy(t => t).ToArray();

            foreach(var file in files)
            {
                Console.WriteLine("Executing: " + file);
                try
                {
                    using (var con = connection.Connection)
                    {
                        var retVal = con.ExecuteScalar<long>(File.ReadAllText(file));
                        Console.WriteLine("Return Value: " + retVal);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Exception: " + ex.Message);
                    Console.WriteLine("\r\nStack Trace: " + ex.ToString());
                }
                Console.WriteLine("Moving on...");
            }
        }
    }
}
