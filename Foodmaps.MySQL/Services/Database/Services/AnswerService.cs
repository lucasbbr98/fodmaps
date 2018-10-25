using Microsoft.Extensions.Configuration;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Models;

    public interface IAnswerService : IQueriable<Answer>{}

    public class AnswerService : Queriable<Answer>, IAnswerService
    {
        public AnswerService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }
    }
}