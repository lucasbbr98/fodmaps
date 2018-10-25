using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

namespace Foodmaps.MySQL
{
    public interface IOptions
    {
        string ConnectionString { get;  }
    }

    public class Options : IOptions
    {
        private IConfigurationRoot configuration;

        public string ConnectionString => configuration["SQL:System:ConnectionString"];

        public Options(IConfigurationRoot configuration)
        {
            this.configuration = configuration;
        }
    }

    public interface IConnectionOptions
    {
        IDbConnection Connection { get; }
    }

    public class ConnectionOptions : IConnectionOptions
    {
        private IOptions options;

        public ConnectionOptions(IOptions options)
        {
            this.options = options;
        }

        public IDbConnection Connection => new MySqlConnection(options.ConnectionString);
    }

    public static class Loader
    {
        public static void NoticeMeSenpai()
        {

        }
    }
}
