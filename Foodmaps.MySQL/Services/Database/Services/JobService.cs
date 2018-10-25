using Microsoft.Extensions.Configuration;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Models;

    public interface IJobService : IQueriable<Job>
    {

    }

    public class JobService : Queriable<Job>, IJobService
    {
        public JobService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }
    }
}