using System.Net;

namespace Foodmaps.Services.Questionnaire
{
    using Models.RequestModels;

    public interface IQuestionnaireUtility
    {
        HttpStatusCode SaveQuestionnaireAnswers(QuestionnaireAnswersModel model);
    }

}
