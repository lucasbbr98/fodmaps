using Microsoft.Extensions.Configuration;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Dapper;
    using Foodmaps.Models.ViewModels;
    using Models;
    using System.Collections.Generic;
    using System.Linq;

    public interface IQuestionnaireService : IQueriable<Questionnaire>
    {
        int GetResearchesCountByUserId(int userId);
        Questionnaire GetByGuid(string guid);
        Questionnaire GetPendingQuestionnaire(int patientId);
        IEnumerable<Questionnaire> GetResearchesByUserId(int userId);
        IEnumerable<Questionnaire> GetCompletedQuestionnaires(int patientId, int userId);
        IEnumerable<QuestionnaireDataViewModel> GetData(string guid, int userId);
        IEnumerable<QuestionnaireDataViewModel> GetResearchData(string guid, int userId);
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

        public IEnumerable<Questionnaire> GetResearchesByUserId(int userId)
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

        public IEnumerable<Questionnaire> GetCompletedQuestionnaires(int patientId, int userId)
        {
            using (var con = Connection)
            {
                var quests = con.Query<Questionnaire>(QueryFromConfig("GetCompletedQuestionnaires"),
                    new
                    {
                        UserId = userId,
                        PatientId = patientId
                    }).ToArray();
                return quests;
            }
        }

        public IEnumerable<QuestionnaireDataViewModel> GetData(string guid, int userId)
        {
            using (var con = Connection)
            {
                var items = con.Query<Questionnaire, Answer, Patient, Food, QuestionnaireDataViewModel>(
                    QueryFromConfig("GetData"),
                    (q, a, p, f) => new QuestionnaireDataViewModel(q, a, p, f),
                    new
                    {
                        Guid = guid,
                        UserId = userId
                    },
                    splitOn: "Split1,Split2,Split3"
                ).ToArray();

                return items;
            }
        }

        public IEnumerable<QuestionnaireDataViewModel> GetResearchData(string guid, int userId)
        {
            using (var con = Connection)
            {
                var items = con.Query<Questionnaire, Answer, Research, Food, QuestionnaireDataViewModel>(
                    QueryFromConfig("GetResearchData"),
                    (q, a, r, f) => new QuestionnaireDataViewModel(q, a, r, f),
                    new
                    {
                        Guid = guid,
                        UserId = userId
                    },
                    splitOn: "Split1,Split2,Split3"
                ).ToArray();

                return items;
            }
        }
    }
}