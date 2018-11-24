using System.Linq;
using System.Net;
using Foodmaps.Services.User;

namespace Foodmaps.MySQL.Services.Utilities.User
{
    using Models;
    using Models.RequestModels;
    using Database;
    using System.Collections.Generic;

    public class UserUtility:IUserUtility
    {
        private IUserService userService;
        private IPatientService patientService;
        private IQuestionnaireService questService;
        public const string UTILITY_NAME = "UserUtility | ";
        public UserUtility(IUserService userService, IPatientService patientService, IQuestionnaireService questService)
        {
            this.userService = userService;
            this.patientService = patientService;
            this.questService = questService;
        }

        public HttpStatusCode CreatePatient(CreatePatientModel model, int userId)
        {
            const string METHOD_IDENTIFIER = UTILITY_NAME + "CreatePatient";

            // Validates Input Data
            var validator = new CreatePatientModelValidator();
            var errorMsgs = validator.Validate(model);
            if (errorMsgs.Any())
                return HttpStatusCode.BadRequest;

            // Inserts Patient on Database
            var patient = new Patient(model, userId, METHOD_IDENTIFIER);
            if (!patientService.Insert(patient))
                return HttpStatusCode.InternalServerError;

            return HttpStatusCode.OK;
        }

        public HttpStatusCode GetPatientsCount(int userId, out int count)
        {
            count = patientService.GetPatientsCountByUserId(userId);

            return HttpStatusCode.OK;
        }

        public HttpStatusCode GetPatients(int userId, out Patient[] patients)
        {
            patients = patientService.GetPatientsByUserId(userId);

            return HttpStatusCode.OK;
        }

        public HttpStatusCode CreateQuestionnaire(CreateQuestionnaireModel model, int userId)
        {
            const string METHOD_IDENTIFIER = UTILITY_NAME + "CreateQuestionnaire";

            // Validates Input Data
            var validator = new CreateQuestionnaireModelValidator();
            var errorMsgs = validator.Validate(model);
            if (errorMsgs.Any())
            {
                return HttpStatusCode.BadRequest;
            }

            //Creates new questionnaire
            var questionnaire = new Questionnaire(model, userId, METHOD_IDENTIFIER);
            questionnaire.Id = questService.InsertGetId(questionnaire);
            if (questionnaire.Id > 0)
            {
                return HttpStatusCode.OK;
            }

            return HttpStatusCode.InternalServerError;
        }

        public HttpStatusCode GetPendingQuestionnaire(int patientId, out Questionnaire q)
        {
            q = questService.GetPendingQuestionnaire(patientId);

            return HttpStatusCode.OK;
        }

        public HttpStatusCode GetResearchesCount(int userId, out int count)
        {
            count = questService.GetResearchesCountByUserId(userId);

            return HttpStatusCode.OK;
        }

        public HttpStatusCode GetResearches(int userId, out IEnumerable<Questionnaire> questionnaires)
        {
            questionnaires = questService.GetResearchesByUserId(userId);

            return HttpStatusCode.OK;
        }
    }
}
