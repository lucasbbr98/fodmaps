using Microsoft.Extensions.Configuration;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Models;

    public interface IFatalErrorService : IQueriable<FatalError>
    {

    }

    public class FatalErrorService : Queriable<FatalError>, IFatalErrorService
    {
        public FatalErrorService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }
    }
}