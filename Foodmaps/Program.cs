using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using StructureMap.AspNetCore;

namespace Foodmaps
{
    public class Program
    {
        public static void Main(string[] args)
        {
            MySQL.Loader.NoticeMeSenpai();
            BuildWebHost(args).Run();
        }


        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStructureMap()
                .UseKestrel() //Comment this line out to host anywhere but IIS
                //.CaptureStartupErrors(true)
                //.UseSetting("detailedErrors", "true")
                .UseStartup<Startup>()
                .UseIISIntegration()
                .Build();
    }
}
