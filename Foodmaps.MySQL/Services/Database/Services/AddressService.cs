using Microsoft.Extensions.Configuration;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Models;

    public interface IAddressService : IQueriable<Address>
    {

    }

    public class AddressService : Queriable<Address>, IAddressService
    {
        public AddressService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }
    }
}