using Microsoft.Extensions.Configuration;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Models;

    public interface IResearchService : IQueriable<Research>
    {

    }

    public class ResearchService : Queriable<Research>, IResearchService
    {
        public ResearchService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }
    }
}