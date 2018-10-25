using Microsoft.Extensions.Configuration;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Dapper;
    using Models;
    using System.Linq;

    public interface IAuthenticationService : IQueriable<Authentication>
    {
        Authentication GetByPasswordToken(string token);
    }

    public class AuthenticationService : Queriable<Authentication>, IAuthenticationService
    {
        public AuthenticationService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }

        public Authentication GetByPasswordToken(string token)
        {
            using (var con = Connection)
            {
                var auth = con.Query<Authentication>(QueryFromConfig("GetByPasswordToken"),
                    new
                    {
                        PasswordToken = token
                    }).FirstOrDefault();

                return auth;
            }
        }
    }
}
