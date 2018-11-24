
namespace Foodmaps.MySQL.Services.Utilities.Questionnaire
{
    using System.Linq;
    using System.Net;
    using Database;
    using Models;
    using Models.RequestModels;
    using Foodmaps.Services.Questionnaire;
    using System.Collections.Generic;
    using Foodmaps.Models.ViewModels;
    using System;

    public class QuestionnaireUtility : IQuestionnaireUtility
    {
        private IAnswerService answerService;
        private IQuestionnaireService questionnaireService;
        private IPatientService patientService;
        public const string UTILITY_NAME = "QuestionnaireUtility | ";
        public QuestionnaireUtility(IAnswerService answerService, IQuestionnaireService questionnaireService, IPatientService patientService)
        {
            this.questionnaireService = questionnaireService;
            this.answerService = answerService;
            this.patientService = patientService;
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

        public HttpStatusCode GetCompletedByPatient(int id, int userId, out IEnumerable<Questionnaire> questionnaires)
        {
            questionnaires = null;

            // Checks if patient is associated with userId
            var p = patientService.GetPatientsByUserId(userId);
            if (p == null || p.Length <= 0)
                return HttpStatusCode.NotAcceptable;

            questionnaires = questionnaireService.GetCompletedQuestionnaires(id, userId);
            if (questionnaires == null || questionnaires.Count() <= 0)
                return HttpStatusCode.NotFound;

            return HttpStatusCode.OK;

        }

        public HttpStatusCode GetData(string guid, int userId, out IEnumerable<QuestionnaireDataViewModel> data)
        {
            data = null;
            if (!Guid.TryParse(guid, out Guid result) || userId <= 0)
                return HttpStatusCode.BadRequest;
                

            data = questionnaireService.GetData(guid, userId);

            return HttpStatusCode.OK;
        }

        public HttpStatusCode GetByGuid(string guid, out Questionnaire questionnaire)
        {
            questionnaire = null;
            if (!Guid.TryParse(guid, out Guid result))
                return HttpStatusCode.BadRequest;

            questionnaire = questionnaireService.GetByGuid(guid);
            if (questionnaire == null)
                return HttpStatusCode.NotFound;

            return HttpStatusCode.OK;
        }
    }
}
