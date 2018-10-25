using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using System;

namespace Agrega.MySQL.Migration
{
    using Foodmaps.MySQL;
    using Foodmaps.Setup;

    public class Program
    {
        private IFileDetection detection;
        public Program(IFileDetection detection)
        {
            this.detection = detection;
        }

        public void Start()
        {
            this.detection.Start(AppContext.BaseDirectory);
        }

        static void Main(string[] args)
        {
            Loader.NoticeMeSenpai();

            var fp = new PhysicalFileProvider(AppContext.BaseDirectory);

            var config = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddXmlFile(fp, "SqlQueries.xml", false, true)
                .Build();

            new FoodmapsSetup()
                .Configure(c =>
                {
                    c.For<IConfigurationRoot>().Use(x => config);
                })
                .Container.GetInstance<Program>().Start();

            Console.ReadKey();
        }
    }
}
