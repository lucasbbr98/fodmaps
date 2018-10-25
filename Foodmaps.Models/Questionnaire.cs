using Foodmaps.Models.RequestModels;
using System;

namespace Foodmaps.Models
{
    public class Questionnaire : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PatientId { get; set; }
        public string Guid { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public int Completed { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ObsoletedOn { get; set; }
        public string ObsoletedBy { get; set; }

        public Questionnaire() { }

        public Questionnaire(CreateQuestionnaireModel m, int userId, string createdBy)
        {
            this.UserId = userId;
            this.Name = m.Name;
            this.PatientId = m.PatientId;
            this.Type = m.Type;
            this.Guid = System.Guid.NewGuid().ToString();
            this.CreatedBy = createdBy;
            this.Completed = 0;
        }
        public override string ToString()
        {
            return "questionnaires";
        }
    }
}
