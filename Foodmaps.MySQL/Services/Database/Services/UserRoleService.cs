using Microsoft.Extensions.Configuration;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Models;

    public interface IUserRoleService : IQueriable<UserRole>
    {

    }

    public class UserRoleService : Queriable<UserRole>, IUserRoleService
    {
        public UserRoleService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }
    }
}