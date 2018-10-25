using Microsoft.Extensions.Configuration;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Dapper;
    using Models;
    using System.Linq;

    public interface IQuestionnaireService : IQueriable<Questionnaire>
    {
        Questionnaire GetByGuid(string guid);
        int GetResearchesCountByUserId(int userId);
        Questionnaire[] GetResearchesByUserId(int userId);
        Questionnaire GetPendingQuestionnaire(int patientId);
    }

    public class QuestionnaireService : Queriable<Questionnaire>, IQuestionnaireService
    {
        public QuestionnaireService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }

        public int GetResearchesCountByUserId(int userId)
        {
            using (var con = Connection)
            {
                var count = con.Query<int>(QueryFromConfig("GetResearchesCountByUserId"),
                    new
                    {
                        UserId = userId
                    }).FirstOrDefault();
                return count;
            }
        }

        public Questionnaire GetPendingQuestionnaire(int patientId)
        {
            using (var con = Connection)
            {
                var q = con.Query<Questionnaire>(QueryFromConfig("GetPendingQuestionnaireByPatientId"),
                    new
                    {
                        PatientId = patientId
                    }).SingleOrDefault();
                return q;
            }
        }

        public Questionnaire[] GetResearchesByUserId(int userId)
        {
            using (var con = Connection)
            {
                var quests = con.Query<Questionnaire>(QueryFromConfig("GetResearchesByUserId"),
                    new
                    {
                        UserId = userId
                    }).ToArray();
                return quests;
            }
        }

        public Questionnaire GetByGuid(string guid)
        {
            using (var con = Connection)
            {
                var q = con.Query<Questionnaire>(QueryFromConfig("GetByGuid"),
                    new
                    {
                        Guid = guid
                    }).SingleOrDefault();
                return q;
            }
        }
    }
}