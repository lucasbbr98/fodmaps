using System.Net;

namespace Foodmaps.Services.Questionnaire
{
    using Foodmaps.Models.ViewModels;
    using Models;
    using Models.RequestModels;
    using System.Collections.Generic;

    public interface IQuestionnaireUtility
    {
        HttpStatusCode SaveQuestionnaireAnswers(QuestionnaireAnswersModel model);
        HttpStatusCode SaveResearchAnswers(ResearchAnswersModel model);
        HttpStatusCode GetCompletedByPatient(int id, int userId, out IEnumerable<Questionnaire> questionnaires);
        HttpStatusCode GetResearchData(string guid, int userId, out IEnumerable<QuestionnaireDataViewModel> data);
        HttpStatusCode GetData(string guid, int userId, out IEnumerable<QuestionnaireDataViewModel> data);
        HttpStatusCode GetByGuid(string guid, out Questionnaire questionnaire);
    }

}
