using System.Net;


namespace Foodmaps.Services.User
{
    using Foodmaps.Models;
    using Models.RequestModels;
    using System.Collections.Generic;

    public interface IUserUtility
    {
        HttpStatusCode CreatePatient(CreatePatientModel model, int userId);
        HttpStatusCode GetPatientsCount(int userId, out int count);
        HttpStatusCode GetPatients(int userId, out Patient[] patients);
        HttpStatusCode CreateQuestionnaire(CreateQuestionnaireModel model, int userId);
        HttpStatusCode GetPendingQuestionnaire(int patientId, out Questionnaire questionnaire);
        HttpStatusCode GetResearchesCount(int userId, out int count);
        HttpStatusCode GetResearches(int userId, out IEnumerable<Questionnaire> questionnaires);
    }
}
