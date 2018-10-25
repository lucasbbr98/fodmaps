using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Models;

    public interface IUserService : IQueriable<User>
    {
        KeyValuePair<User, Authentication>? GetUser(string email);
        User GetByEmail(string email);
    }

    public class UserService : Queriable<User>, IUserService
    {
        public UserService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }

        public KeyValuePair<User, Authentication>? GetUser(string email)
        {
            using (var con = Connection)
            {
                var items = con.Query<User, Authentication, KeyValuePair<User, Authentication>>(
                        QueryFromConfig("GetUser"),
                        (u, a) => new KeyValuePair<User, Authentication>(u, a),
                        new
                        {
                            Email = email
                        },
                        splitOn: "Split"
                    ).ToArray();

                if (items == null || items.Length <= 0)
                    return null;

                return items[0];
            }
        }

        public User GetByEmail(string email)
        {
            using (var con = Connection)
            {
                var user = con.Query<User>(QueryFromConfig("GetByEmail"),
                    new
                    {
                        Email = email
                    }).FirstOrDefault();

                return user;
            }
        }
    }
}
