using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Models;

    public interface IRoleService : IQueriable<Role>
    {
        IEnumerable<Role> UserRoles(int userId);
    }

    public class RoleService : Queriable<Role>, IRoleService
    {
        public RoleService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }


        public IEnumerable<Role> UserRoles(int userId)
        {
            using (var con = Connection)
            {
                return con.Query<Role>(QueryFromConfig("UserRoles"), new
                {
                    UserId = userId
                });
            }
        }
    }
}
