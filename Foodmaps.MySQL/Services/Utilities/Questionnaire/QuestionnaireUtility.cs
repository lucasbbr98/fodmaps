
namespace Foodmaps.MySQL.Services.Utilities.Questionnaire
{
    using System.Linq;
    using System.Net;
    using Database;
    using Models.RequestModels;
    using Foodmaps.Services.Questionnaire;

    public class QuestionnaireUtility : IQuestionnaireUtility
    {
        private IAnswerService answerService;
        private IQuestionnaireService questionnaireService;
        public const string UTILITY_NAME = "QuestionnaireUtility | ";
        public QuestionnaireUtility(IAnswerService answerService, IQuestionnaireService questionnaireService)
        {
            this.questionnaireService = questionnaireService;
            this.answerService = answerService;
        }

        public HttpStatusCode SaveQuestionnaireAnswers(QuestionnaireAnswersModel model)
        {
            const string METHOD_IDENTIFIER = UTILITY_NAME + "SaveQuestionnaireAnswers";

            // Validates Input Data
            var validator = new QuestionnaireAnswersModelValidator();
            var errorMsgs = validator.Validate(model);
            if (errorMsgs.Any())
                return HttpStatusCode.BadRequest;

            // Checks questionnaire exists
            var q = questionnaireService.GetByGuid(model.Guid);
            if(q == null)
                return HttpStatusCode.NotFound;
            
            // Checks if it has been already answered
            if (q.Completed == 1)
                return HttpStatusCode.Conflict;

            // Records all answers
            foreach(var a in model.Answers)
            {
                a.QuestionnaireId = q.Id;
                a.CreatedBy = METHOD_IDENTIFIER;
                answerService.Insert(a);
            }

            // Sets as completed
            q.Completed = 1;
            if (!questionnaireService.Update(q))
                return HttpStatusCode.InternalServerError;

            return HttpStatusCode.OK;
        }
    }
}
